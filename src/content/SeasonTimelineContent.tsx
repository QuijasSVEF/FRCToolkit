import InfoBox from '../components/InfoBox';
import ResourceCard from '../components/ResourceCard';

const timelineItems = [
  {
    id: 'offseason',
    period: 'May - August',
    title: 'Off-Season',
    color: 'bg-steel-500',
    items: [
      'Attend off-season competitions and outreach events',
      'Conduct end-of-season retrospective with the whole team',
      'Recruit incoming freshmen and new mentors',
      'Train students on new skills (welding, CAD, programming)',
      'Prototype mechanisms with no game constraints',
      'Attend FIRST Championship watch parties or send team to observe',
      'Begin sponsor thank-you letters and retention outreach',
      'Evaluate and repair/replace tools and equipment',
    ],
  },
  {
    id: 'preseason',
    period: 'September - December',
    title: 'Preseason',
    color: 'bg-brand-500',
    items: [
      'Run structured training curriculum for all subteams',
      'Complete Youth Protection Training and Screening renewals',
      'Finalize budget and fundraising goals',
      'Submit grant applications (many deadlines fall Sept-Nov)',
      'Start award narrative drafts (Impact Award, engineering notebook)',
      'Build or refurbish a practice drivetrain',
      'Practice programming with last year\'s robot or a test platform',
      'Set up version control, CI, and development environments',
      'Attend fall workshops, scrimmages, or mentor meetups',
      'Register for competition events through FIRST Dashboard',
    ],
  },
  {
    id: 'kickoff',
    period: 'Early January',
    title: 'Kickoff',
    color: 'bg-success-500',
    items: [
      'Watch the Kickoff broadcast as a team',
      'Read the full game manual carefully as a group',
      'Analyze scoring and ranking systems',
      'Identify key game mechanisms and strategic priorities',
      'Begin brainstorming and concept generation',
      'Define robot requirements and constraints',
      'Receive and inventory Kit of Parts',
      'Start prototyping within hours of Kickoff',
    ],
  },
  {
    id: 'build-season',
    period: 'January - February',
    title: 'Build Season',
    color: 'bg-warning-500',
    items: [
      'Run design reviews before committing to fabrication',
      'Build drivetrain first (KitBot or custom)',
      'Parallelize: drivetrain, mechanisms, bumpers, electronics in parallel workstreams',
      'Wire the control system on a test board before robot integration',
      'Develop autonomous routines using simulation early',
      'Conduct regular design reviews and milestone checkpoints',
      'Complete electrical integration and CAN bus testing',
      'Run driver practice sessions on a field-sized area',
      'Complete inspection readiness checks against the official checklist',
      'Bag/ship robot or prepare for transport (rules vary by season)',
    ],
  },
  {
    id: 'competition-season',
    period: 'March - April',
    title: 'Competition Season',
    color: 'bg-danger-500',
    items: [
      'Pack pit supplies, spare parts, tools, batteries, chargers',
      'Arrive early to set up pit and pass robot inspection',
      'Run practice matches to tune autonomous and driver controls',
      'Scout other teams during qualification matches',
      'Build pick list for alliance selection based on scouting data',
      'Present for awards (judged interviews happen at events)',
      'Debrief after each match: what worked, what failed',
      'Make repairs and improvements between matches',
      'Qualify for district championship or FIRST Championship',
    ],
  },
  {
    id: 'championship',
    period: 'Late April',
    title: 'Championship',
    color: 'bg-brand-700',
    items: [
      'Travel logistics: buses, hotels, meals, waivers, chaperones',
      'Compete at the highest level against qualified teams worldwide',
      'Network with other teams, sponsors, and FIRST leadership',
      'Celebrate the season regardless of match outcomes',
      'Begin planning for next season based on lessons learned',
    ],
  },
];

export default function SeasonTimelineContent() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-steel-900 mb-4">FRC Season Timeline</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The FRC season follows a predictable annual cycle. Understanding this timeline is critical
          for planning fundraising, training, and build activities. The 2026 season Kickoff was on
          January 10, 2026, with events running through April and Championship in late April.
        </p>
        <InfoBox variant="tip" title="Key Mentor Insight">
          The most successful teams treat the off-season and preseason as the real foundation.
          By Kickoff, students should already have skills, the team should have funding, and
          award drafts should be underway. Build season is for executing a plan, not starting from scratch.
        </InfoBox>
      </div>

      <div className="relative">
        <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-steel-200" />

        {timelineItems.map((phase) => (
          <div key={phase.id} id={phase.id} className="relative pl-12 pb-10 last:pb-0">
            <div className={`absolute left-2.5 top-1 w-4 h-4 rounded-full ${phase.color} ring-4 ring-white`} />
            <div className="bg-white rounded-xl border border-steel-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className={`badge ${phase.color} text-white`}>{phase.period}</span>
                <h3 className="font-bold text-steel-900">{phase.title}</h3>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-steel-600">
                    <span className="w-1.5 h-1.5 bg-steel-300 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <ResourceCard resource={{ title: 'FRC Season Materials', url: 'https://www.firstinspires.org/resources/library/frc/season-materials', type: 'link', description: 'Official calendars and season docs' }} />
        <ResourceCard resource={{ title: 'FRC Events List 2026', url: 'https://frc-events.firstinspires.org/2026/Events/EventList', type: 'link', description: 'Find events near you' }} />
        <ResourceCard resource={{ title: 'FRC Mentor Guide', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/frc_mentor_guide.pdf', type: 'pdf', description: 'Season calendar and mentor expectations' }} />
      </div>
    </div>
  );
}
