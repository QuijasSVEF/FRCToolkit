import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import VideoEmbed from '../components/VideoEmbed';
import CollapsibleSection from '../components/CollapsibleSection';

export default function GettingStartedContent() {
  return (
    <div className="space-y-8">
      <section id="what-is-frc">
        <h2 className="text-xl font-bold text-steel-900 mb-4">What is FRC?</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST Robotics Competition (FRC) is a high school robotics program where students design, build,
          and program an industrial-size robot to compete in a new game each season. Teams of students,
          guided by adult mentors, work from January through April to build a robot and compete at regional
          or district events, with the goal of qualifying for the FIRST Championship.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          FRC is more than just building robots. FIRST describes teams as responsible for identity,
          fundraising, outreach, teamwork, and community impact alongside robot performance. The program
          teaches engineering, project management, teamwork, and business skills in a real-world context.
        </p>
        <InfoBox variant="info" title="Core Values">
          FIRST operates on principles of <strong>Gracious Professionalism</strong> (high-quality work,
          respect for others) and <strong>Coopertition</strong> (cooperating while competing). These aren't
          just slogans -- they shape how teams interact at events and are reflected in award criteria.
        </InfoBox>

        <div className="mt-6">
          <VideoEmbed video={{
            title: '2026 REBUILT Game Animation',
            url: 'https://www.youtube.com/watch?v=_fybREErgyM',
            embedUrl: 'https://www.youtube.com/embed/_fybREErgyM',
            description: 'Official 2026 FIRST Robotics Competition REBUILT game animation'
          }} />
        </div>

        <div className="mt-6 grid gap-2">
          <ResourceCard resource={{ title: 'FIRST Official Website', url: 'https://www.firstinspires.org/programs/frc/', type: 'link', description: 'Program overview and registration' }} />
          <ResourceCard resource={{ title: '2026 Game Manual', url: 'https://firstfrc.blob.core.windows.net/frc2026/Manual/2026GameManual.pdf', type: 'pdf', description: 'Complete rules and game description' }} />
        </div>
      </section>

      <section id="starting-a-team">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Starting a Team</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Starting an FRC team requires a school or community organization as a sponsor, at least two
          adult mentors (Lead Coach 1 and Lead Coach 2), and enough students to form a viable team
          (typically 10-25 members, though teams range widely in size).
        </p>

        <CollapsibleSection title="Step 1: Find a Sponsoring Organization" defaultOpen>
          <p className="text-steel-600 text-sm leading-relaxed">
            Teams need a host institution -- usually a school, but community organizations, churches,
            libraries, and makerspaces can also sponsor teams. The sponsor provides meeting space and
            often initial administrative support. Contact your local FIRST Program Delivery Partner
            for guidance on requirements in your area.
          </p>
        </CollapsibleSection>

        <div className="mt-3" />

        <CollapsibleSection title="Step 2: Register Through FIRST">
          <p className="text-steel-600 text-sm leading-relaxed">
            Registration happens through the FIRST Dashboard. You'll need to create accounts for lead
            mentors, complete Youth Protection Training and screening, register the team, and pay
            registration fees. FIRST provides season materials and calendar guidance to help time this correctly.
          </p>
        </CollapsibleSection>

        <div className="mt-3" />

        <CollapsibleSection title="Step 3: Recruit Students and Mentors">
          <p className="text-steel-600 text-sm leading-relaxed mb-3">
            Recruit widely -- FRC needs students interested in engineering, programming, business, media,
            and strategy. Not every student needs to be "technical." Recruit mentors from local industry,
            parent community, and university engineering programs. FIRST recommends having mentors with
            both technical and non-technical backgrounds.
          </p>
        </CollapsibleSection>

        <div className="mt-3" />

        <CollapsibleSection title="Step 4: Secure Funding">
          <p className="text-steel-600 text-sm leading-relaxed">
            FRC teams need a budget for registration, parts, tools, and travel. See the Funding & Grants
            section for detailed guidance. FIRST describes running an FRC team like running a small
            business and provides budgeting templates and fundraising toolkits.
          </p>
        </CollapsibleSection>

        <div className="mt-3" />

        <CollapsibleSection title="Step 5: Set Up Your Workspace">
          <p className="text-steel-600 text-sm leading-relaxed">
            You need a workspace with adequate ventilation, power, lighting, and tool storage. A typical
            FRC workshop has workbenches, a drill press, band saw, hand tools, a computer station for CAD
            and programming, and a testing area sized to drive the robot. Safety equipment (glasses,
            fire extinguisher, first aid) is mandatory.
          </p>
        </CollapsibleSection>

        <div className="mt-6 grid gap-2">
          <ResourceCard resource={{ title: 'FIRST Dashboard', url: 'https://my.firstinspires.org/', type: 'tool', description: 'Team registration and management portal' }} />
          <ResourceCard resource={{ title: 'FRC Season Materials', url: 'https://www.firstinspires.org/resources/library/frc/season-materials', type: 'link', description: 'Official season documents and calendars' }} />
          <ResourceCard resource={{ title: 'Team Grant Opportunities', url: 'https://www.firstinspires.org/programs/team-grant-opportunities', type: 'link', description: 'Grants available for new and existing teams' }} />
        </div>
      </section>

      <section id="registration">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Registration & FIRST Dashboard</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The FIRST Dashboard is your central hub for team management. Through it, you'll handle team
          registration, payment, youth enrollment, mentor screening, event registration, and award submissions.
        </p>

        <InfoBox variant="warning" title="Youth Registration">
          FIRST requires all youth team members to register through FIRST systems (Express Enrollment
          for parts of the US and Canada, or FIRST Dashboard globally). If a student or family cannot
          register electronically, contact your local Program Delivery Partner for alternatives.
        </InfoBox>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Youth Registration Guide', url: 'https://www.firstinspires.org/programs/youth-registration', type: 'link', description: 'Youth registration instructions' }} />
          <ResourceCard resource={{ title: 'Privacy & Consent Policy', url: 'https://www.firstinspires.org/about/privacy-hub', type: 'link', description: 'Privacy and consent guidance' }} />
        </div>
      </section>

      <section id="mentor-role">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Your Role as a Mentor</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST describes mentors as guides who support students through safe, structured learning
          and real engineering processes. The most important mindset shift: you are not here to build
          the robot for students. You're here to help students build the robot themselves.
        </p>

        <div className="bg-white rounded-lg border border-steel-200 p-4 space-y-3">
          <h3 className="font-semibold text-steel-800 text-sm">Key Mentor Responsibilities</h3>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Safety oversight -- lead by example, enforce PPE, manage hazards
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Technical guidance -- teach skills, review designs, help troubleshoot
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Project management coaching -- help students plan, schedule, and prioritize
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Compliance gates -- ensure rules are followed, inspections pass
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Youth protection -- complete required training and screening
            </li>
          </ul>
        </div>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'FRC Mentor Guide (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/frc_mentor_guide.pdf', type: 'pdf', description: 'Official mentor guide with season calendar' }} />
          <ResourceCard resource={{ title: 'Team Management Resources', url: 'https://www.firstinspires.org/resources/library/frc/team-management-resources', type: 'link', description: 'Organizing, leadership, and operations' }} />
        </div>
      </section>

      <section id="first-season-checklist">
        <h2 className="text-xl font-bold text-steel-900 mb-4">First Season Checklist</h2>
        <InfoBox variant="success" title="Track this in your progress sidebar">
          Use the checklist on the right (or below on mobile) to track your completion of each
          topic in this section. Your progress is saved automatically.
        </InfoBox>
        <div className="mt-4 bg-white rounded-lg border border-steel-200 p-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Before Kickoff</h3>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Complete Youth Protection Training and Screening',
              'Register team through FIRST Dashboard',
              'Enroll students through Express Enrollment',
              'Secure workspace and basic tools',
              'Establish budget and begin fundraising',
              'Recruit additional mentors (aim for 3-5 minimum)',
              'Run safety orientation for all team members',
              'Set up team communication (Slack, Discord, or email list)',
              'Start preseason skills training (CAD, programming, mechanical)',
              'Begin award drafts and impact documentation',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-steel-400 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
