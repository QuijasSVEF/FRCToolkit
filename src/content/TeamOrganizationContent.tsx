import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';

export default function TeamOrganizationContent() {
  return (
    <div className="space-y-8">
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

      <div className="grid gap-2">
        <ResourceCard resource={{ title: 'How To: Organize a Team (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/team-org.pdf', type: 'pdf', description: 'Official FIRST team org guide' }} />
        <ResourceCard resource={{ title: 'Team Management Resources', url: 'https://www.firstinspires.org/resources/library/frc/team-management-resources', type: 'link', description: 'Leadership, mental health, and operations' }} />
      </div>
    </div>
  );
}
