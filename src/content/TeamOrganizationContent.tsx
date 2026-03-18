import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';
import VideoEmbed from '../components/VideoEmbed';
import CodeBlock from '../components/CodeBlock';

export default function TeamOrganizationContent() {
  return (
    <div className="space-y-8">
      <div className="mb-4">
        <VideoEmbed video={{
          title: 'Goal Setting for FRC Teams - Mike Corsetto (1678 Citrus Circuits)',
          url: 'https://www.youtube.com/watch?v=TyBWSDEIuXI',
          embedUrl: 'https://www.youtube.com/embed/TyBWSDEIuXI',
          description: 'How to set effective goals for your FRC team, from a veteran mentor'
        }} />
      </div>

      <section id="org-structure">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Organizational Structure</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST's team organization guide splits teams into two big groups: <strong>Robot</strong> and{' '}
          <strong>Logistics</strong>. The robot side handles design, mechanical, electrical, and
          programming. The logistics side covers business, communications, outreach, strategy, and
          media. Both sides are equally important for team success and award submissions.
        </p>
        <InfoBox variant="info" title="Student-Led Model">
          Students should own decisions, documentation, and execution. Mentors own safety gates,
          compliance gates, and technical review. Your job is coaching, not doing.
        </InfoBox>
      </section>

      <section id="subteams">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Subteam Breakdown</h2>
        <DataTable
          caption="Typical FRC Team Subteams"
          columns={[
            { key: 'subteam', header: 'Subteam', width: '20%' },
            { key: 'focus', header: 'Focus Areas' },
            { key: 'skills', header: 'Key Skills to Develop' },
          ]}
          rows={[
            { subteam: 'Mechanical', focus: 'Drivetrain, mechanisms, structure, bumpers, fabrication', skills: 'CAD, machining, assembly, 3D printing' },
            { subteam: 'Electrical', focus: 'Wiring, power distribution, motor controllers, sensors', skills: 'Crimping, soldering, circuit reading, CAN wiring' },
            { subteam: 'Programming', focus: 'Robot code, autonomous, vision, driver controls', skills: 'Java/C++/Python, WPILib, Git, testing' },
            { subteam: 'Strategy', focus: 'Game analysis, scouting, match strategy, alliance selection', skills: 'Data analysis, communication, game theory' },
            { subteam: 'Business', focus: 'Fundraising, sponsorships, budget, grants, media', skills: 'Writing, presentations, financial tracking' },
            { subteam: 'Outreach', focus: 'Community engagement, demos, mentoring younger teams', skills: 'Public speaking, event planning, documentation' },
            { subteam: 'Media/AV', focus: 'Photography, video, social media, branding', skills: 'Video editing, graphic design, social media' },
          ]}
        />
      </section>

      <section id="student-leadership">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Student Leadership</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Effective teams develop student leadership capacity. Common student leadership roles include
          a team captain (or co-captains), subteam leads, a student safety captain, and project managers.
        </p>
        <CollapsibleSection title="Tips for Developing Student Leaders" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Let students run meetings and design reviews -- step back and observe
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Pair experienced students with newcomers for knowledge transfer
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Give subteam leads real decision-making authority with clear boundaries
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Encourage failure as a learning tool -- let students make recoverable mistakes
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Run retrospectives where students identify improvements themselves
            </li>
          </ul>
        </CollapsibleSection>

        <div className="mt-6">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Meeting Agenda Template</h3>
          <CodeBlock language="Meeting Agenda Template" code={`TEAM MEETING AGENDA
==================
Date: [DATE]    |    Time: [START] - [END]
Location: [ROOM/WORKSHOP]

1. OPENING & ANNOUNCEMENTS (5 min)
   - Attendance check
   - Upcoming dates and deadlines

2. SUBTEAM STATUS UPDATES (15 min)
   - Mechanical:
   - Electrical:
   - Programming:
   - Business/Outreach:
   - Strategy:

3. BLOCKERS & HELP NEEDED (10 min)
   - Cross-subteam dependencies
   - Resource or material needs

4. UPCOMING DEADLINES (5 min)
   - This week:
   - Next week:
   - Competition prep milestones:

5. ACTION ITEMS (5 min)
   - [WHO] will [WHAT] by [WHEN]

6. CLOSING (5 min)
   - Next meeting date/time
   - Cleanup assignments`} />
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Weekly Practice Schedule Template</h3>
          <CodeBlock language="Weekly Schedule Template" code={`WEEKLY TEAM SCHEDULE
====================

MONDAY    | 4:00-6:00 PM | Mechanical Build Session
          |              | Electrical wiring/testing
          |              |
TUESDAY   | 4:00-6:00 PM | Programming Session
          |              | CAD design reviews
          |              |
WEDNESDAY | 4:00-6:00 PM | Full Team Build Session
          |              | All subteams active
          |              |
THURSDAY  | 4:00-6:00 PM | Driver Practice (if robot ready)
          |              | Strategy & scouting prep
          |              |
FRIDAY    | 4:00-5:30 PM | Business/Outreach Meeting
          |              | Award writing sessions
          |              |
SATURDAY  | 9:00 AM-2:00 PM | Extended Build Session
          |              | Integration testing
          |              | Team lunch

Notes:
- Adjust times based on school schedule
- During build season, add 1-2 extra sessions/week
- Always start with safety briefing
- End each session with cleanup (15 min)`} />
        </div>
      </section>

      <section id="mentor-roles">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Mentor Roles & Responsibilities</h2>
        <DataTable
          caption="Common Mentor Roles"
          columns={[
            { key: 'role', header: 'Role', width: '25%' },
            { key: 'responsibilities', header: 'Responsibilities' },
          ]}
          rows={[
            { role: 'Lead Coach (LC1 & LC2)', responsibilities: 'Team registration, YPP compliance, FIRST Dashboard management, primary point of contact with FIRST' },
            { role: 'Technical Mentors', responsibilities: 'Guide mechanical, electrical, and programming work; teach skills; review designs; enforce safety' },
            { role: 'Safety Mentor', responsibilities: 'Workshop safety systems, PPE compliance, safety training, emergency preparedness' },
            { role: 'Business Mentor', responsibilities: 'Fundraising guidance, sponsor relations, budget oversight, grant applications' },
            { role: 'Admin/Travel Mentor', responsibilities: 'Travel logistics, permission forms, meal planning, hotel coordination, chaperone management' },
          ]}
        />
      </section>

      <section id="team-culture">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Building Team Culture</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Strong team culture doesn't happen by accident. It's built through consistent norms,
          shared rituals, and deliberate investment in how the team works together.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Norms & Agreements', desc: 'Establish shared expectations early. What happens when someone is late? How do we handle disagreements? Write it down.' },
            { title: 'Regular Retros', desc: 'Run brief retrospectives after build sessions and events. What went well? What should change? Students identify improvements.' },
            { title: 'Inclusion', desc: 'Actively ensure every student has meaningful work. Rotate tasks. Don\'t let the same 3 students do everything.' },
            { title: 'Celebration', desc: 'Celebrate progress, not just wins. Recognize effort, learning, and teamwork alongside competition results.' },
          ].map((item) => (
            <div key={item.title} className="bg-steel-50 rounded-lg p-4">
              <h4 className="font-semibold text-steel-800 text-sm">{item.title}</h4>
              <p className="text-sm text-steel-600 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="gracious-professionalism">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Gracious Professionalism</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Gracious Professionalism is a FIRST core value: doing high-quality work while treating
          others with respect and kindness. Coopertition means cooperating even while competing --
          lending parts to other teams, helping opponents fix their robot, sharing knowledge freely.
        </p>
        <InfoBox variant="success" title="In Practice">
          At events, this means helping other teams with mechanical or programming issues in the pits,
          sharing spare parts, congratulating opponents, and treating volunteers and event staff with
          genuine respect. These behaviors are observed by award judges.
        </InfoBox>
      </section>

      <section id="parent-communication">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Parent & Volunteer Management</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Parent engagement is one of the biggest factors in team sustainability. Teams with strong
          parent support have more reliable funding, better travel logistics, and more consistent
          volunteer coverage.
        </p>

        <CollapsibleSection title="Parent Orientation Checklist" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Run a parent orientation meeting at the start of the season explaining what FRC is',
              'Clearly communicate the time commitment: build sessions, weekend events, travel',
              'Explain travel expectations and costs (hotels, meals, transportation)',
              'Set up a parent communication channel (email list, GroupMe, Remind app, or similar)',
              'Share the season calendar with all competition dates and deadlines',
              'Explain the fundraising model and how parents can contribute',
              'Invite parents to visit the workshop and see what students are building',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <div className="mt-4" />

        <CollapsibleSection title="Volunteer Roles for Parents">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { role: 'Travel Coordinator', desc: 'Book hotels, coordinate bus/carpool, manage travel forms and waivers' },
              { role: 'Food Coordinator', desc: 'Organize meals for build sessions and events, manage dietary needs' },
              { role: 'Fundraising Committee', desc: 'Plan and execute fundraising events, corporate sponsor outreach' },
              { role: 'Pit Crew Parents', desc: 'Help with pit setup, teardown, and logistics at competition events' },
              { role: 'Event Chaperones', desc: 'Supervise students at events, ensure safety and team rules are followed' },
              { role: 'Communications Lead', desc: 'Manage parent email list, social media, newsletter updates' },
            ].map((item) => (
              <div key={item.role} className="bg-steel-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-steel-800">{item.role}</p>
                <p className="text-xs text-steel-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <InfoBox variant="success" title="Booster Organizations">
          Many teams form a parent booster organization (501(c)(3) or similar) to handle fundraising,
          tax-deductible donations, and team logistics. This separates team finances from the school
          and gives parents a formal structure for contributing. Parent buy-in is critical -- the more
          parents understand and support FRC, the more sustainable your team becomes.
        </InfoBox>
      </section>

      <div className="grid gap-2">
        <ResourceCard resource={{ title: 'How To: Organize a Team (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/team-org.pdf', type: 'pdf', description: 'Official FIRST team org guide' }} />
        <ResourceCard resource={{ title: 'Team Management Resources', url: 'https://www.firstinspires.org/resources/library/frc/team-management-resources', type: 'link', description: 'Leadership, mental health, and operations' }} />
      </div>
    </div>
  );
}
