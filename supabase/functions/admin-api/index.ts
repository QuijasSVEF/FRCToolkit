import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return errorResponse("Missing authorization header", 401);
    }

    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user: caller }, error: authError } = await anonClient.auth.getUser();
    if (authError || !caller) {
      return errorResponse("Unauthorized", 401);
    }

    const { data: callerProfile } = await anonClient
      .from("profiles")
      .select("role")
      .eq("id", caller.id)
      .maybeSingle();

    if (!callerProfile || callerProfile.role !== "admin") {
      return errorResponse("Forbidden: admin access required", 403);
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/admin-api\/?/, "");

    if (req.method === "GET" && path === "users") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const perPage = parseInt(url.searchParams.get("per_page") || "50");

      const { data: { users }, error } = await adminClient.auth.admin.listUsers({
        page,
        perPage,
      });

      if (error) return errorResponse(error.message, 500);

      const { data: profiles } = await adminClient
        .from("profiles")
        .select("*");

      const { data: progressData } = await adminClient
        .from("section_progress")
        .select("user_id, completed");

      const progressMap: Record<string, { total: number; completed: number }> = {};
      if (progressData) {
        for (const row of progressData) {
          if (!progressMap[row.user_id]) {
            progressMap[row.user_id] = { total: 0, completed: 0 };
          }
          progressMap[row.user_id].total++;
          if (row.completed) progressMap[row.user_id].completed++;
        }
      }

      const profileMap: Record<string, unknown> = {};
      if (profiles) {
        for (const p of profiles) {
          profileMap[p.id] = p;
        }
      }

      const enrichedUsers = users.map((u) => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        profile: profileMap[u.id] || null,
        progress: progressMap[u.id] || { total: 0, completed: 0 },
      }));

      return jsonResponse({ users: enrichedUsers });
    }

    if (req.method === "GET" && path === "analytics") {
      const { data: { users } } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
      const totalUsers = users?.length || 0;

      const { data: allProgress } = await adminClient
        .from("section_progress")
        .select("user_id, section_id, subsection_id, completed, completed_at");

      const { data: allBookmarks } = await adminClient
        .from("bookmarks")
        .select("id, user_id");

      const { data: allNotes } = await adminClient
        .from("notes")
        .select("id, user_id");

      let completedTopics = 0;
      const activeUsers = new Set<string>();
      const sectionCompletions: Record<string, number> = {};
      const dailyCompletions: Record<string, number> = {};

      if (allProgress) {
        for (const row of allProgress) {
          if (row.completed) {
            completedTopics++;
            activeUsers.add(row.user_id);
            sectionCompletions[row.section_id] = (sectionCompletions[row.section_id] || 0) + 1;
            if (row.completed_at) {
              const day = row.completed_at.substring(0, 10);
              dailyCompletions[day] = (dailyCompletions[day] || 0) + 1;
            }
          }
        }
      }

      const recentDays: { date: string; count: number }[] = [];
      const now = new Date();
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().substring(0, 10);
        recentDays.push({ date: key, count: dailyCompletions[key] || 0 });
      }

      const signupsByDay: Record<string, number> = {};
      if (users) {
        for (const u of users) {
          const day = u.created_at.substring(0, 10);
          signupsByDay[day] = (signupsByDay[day] || 0) + 1;
        }
      }

      const recentSignups: { date: string; count: number }[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().substring(0, 10);
        recentSignups.push({ date: key, count: signupsByDay[key] || 0 });
      }

      return jsonResponse({
        totalUsers,
        activeUsers: activeUsers.size,
        completedTopics,
        totalBookmarks: allBookmarks?.length || 0,
        totalNotes: allNotes?.length || 0,
        sectionCompletions,
        dailyCompletions: recentDays,
        dailySignups: recentSignups,
      });
    }

    if (req.method === "POST" && path === "create-user") {
      const { email, password, display_name } = await req.json();
      if (!email || !password) {
        return errorResponse("Email and password are required");
      }

      const { data, error } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { display_name: display_name || email.split("@")[0] },
      });

      if (error) return errorResponse(error.message, 500);
      return jsonResponse({ user: data.user });
    }

    if (req.method === "POST" && path === "reset-password") {
      const { user_id, new_password } = await req.json();
      if (!user_id || !new_password) {
        return errorResponse("user_id and new_password are required");
      }

      const { error } = await adminClient.auth.admin.updateUserById(user_id, {
        password: new_password,
      });

      if (error) return errorResponse(error.message, 500);
      return jsonResponse({ success: true });
    }

    if (req.method === "DELETE" && path.startsWith("user/")) {
      const userId = path.replace("user/", "");
      if (!userId) return errorResponse("User ID is required");

      if (userId === caller.id) {
        return errorResponse("Cannot delete your own account");
      }

      const { error: progressError } = await adminClient
        .from("section_progress")
        .delete()
        .eq("user_id", userId);
      if (progressError) return errorResponse(progressError.message, 500);

      const { error: bookmarkError } = await adminClient
        .from("bookmarks")
        .delete()
        .eq("user_id", userId);
      if (bookmarkError) return errorResponse(bookmarkError.message, 500);

      const { error: notesError } = await adminClient
        .from("notes")
        .delete()
        .eq("user_id", userId);
      if (notesError) return errorResponse(notesError.message, 500);

      const { error: profileError } = await adminClient
        .from("profiles")
        .delete()
        .eq("id", userId);
      if (profileError) return errorResponse(profileError.message, 500);

      const { error } = await adminClient.auth.admin.deleteUser(userId);
      if (error) return errorResponse(error.message, 500);

      return jsonResponse({ success: true });
    }

    if (req.method === "PUT" && path === "update-role") {
      const { user_id, role } = await req.json();
      if (!user_id || !role) {
        return errorResponse("user_id and role are required");
      }

      if (user_id === caller.id) {
        return errorResponse("Cannot change your own role");
      }

      const { error } = await adminClient
        .from("profiles")
        .update({ role, updated_at: new Date().toISOString() })
        .eq("id", user_id);

      if (error) return errorResponse(error.message, 500);
      return jsonResponse({ success: true });
    }

    if (req.method === "GET" && path.startsWith("user-progress/")) {
      const userId = path.replace("user-progress/", "");

      const { data: progress } = await adminClient
        .from("section_progress")
        .select("*")
        .eq("user_id", userId)
        .order("completed_at", { ascending: false });

      const { data: bookmarks } = await adminClient
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId);

      const { data: notes } = await adminClient
        .from("notes")
        .select("*")
        .eq("user_id", userId);

      return jsonResponse({ progress: progress || [], bookmarks: bookmarks || [], notes: notes || [] });
    }

    return errorResponse("Not found", 404);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Internal server error", 500);
  }
});
