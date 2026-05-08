import { useState } from 'react';
import { GraduationCap, Users, BookOpen, Clock, Target, CheckSquare } from 'lucide-react';
import InfoBox from '../components/InfoBox';
import CollapsibleSection from '../components/CollapsibleSection';
import ResourceCard from '../components/ResourceCard';

type View = 'teacher' | 'student';

interface UnitContent {
  duration: string;
  objectives: string[];
  teacher: {
    overview: string;
    agenda: { time: string; activity: string }[];
    discussionPrompts: string[];
    tips: string[];
  };
  student: {
    overview: string;
    exercises: { title: string; description: string }[];
    deliverables: string[];
    checklist: string[];
  };
}

const units: Record<string, UnitContent> = {
  'unit-1': {
    duration: '2-3 weeks (preseason, Sept-Oct)',
    objectives: [
      'Build team identity, safety culture, and shared vocabulary',
      'Introduce shop tools, PPE, and basic robotics concepts',
      'Establish subteam roles and communication norms',
    ],
    teacher: {
      overview: 'Unit 1 sets the tone for the season. Focus on relationships, safety habits, and helping students feel ownership. Avoid diving into the current game — that comes later. Your goal is a baseline everyone shares.',
      agenda: [
        { time: '0:00-0:15', activity: 'Welcome, introductions, and team history' },
        { time: '0:15-0:45', activity: 'FRC overview — watch a past game reveal & recap video' },
        { time: '0:45-1:15', activity: 'Shop tour, PPE fitting, and safety signatures' },
        { time: '1:15-1:45', activity: 'Subteam interest survey and role explanation' },
        { time: '1:45-2:00', activity: 'Wrap-up, questions, and next-meeting preview' },
      ],
      discussionPrompts: [
        'What does "Gracious Professionalism" mean to you?',
        'Where do you see yourself contributing this season?',
        'What questions do you have about how FRC competitions work?',
      ],
      tips: [
        'Pair new students with returning members for the shop tour',
        'Have YPP-trained mentors sign off safety attendance',
        'Collect emergency contacts and medical waivers during this unit',
      ],
    },
    student: {
      overview: 'Welcome to FRC. This unit introduces you to how the season flows, the subteams you can join, and the safety rules that keep everyone healthy. By the end, you should know where to find things in the shop and who to ask for help.',
      exercises: [
        { title: 'Team Charter', description: 'Write a one-paragraph description of why you want to be on this team and what you hope to learn.' },
        { title: 'Safety Scavenger Hunt', description: 'Locate the eye-wash station, fire extinguisher, first-aid kit, emergency exits, and electrical shutoffs in your shop.' },
        { title: 'Subteam Preview', description: 'Shadow each subteam for 30 minutes and rank your top two preferences.' },
      ],
      deliverables: [
        'Signed safety agreement and PPE checkout form',
        'Completed subteam preference survey',
        'Notes on at least one past FRC game you researched',
      ],
      checklist: [
        'I can explain what FRC is in one sentence',
        'I know where PPE is stored and how to use it',
        'I know the name of my lead mentor and at least 3 teammates',
      ],
    },
  },
  'unit-2': {
    duration: '1 week (Kickoff week, early January)',
    objectives: [
      'Read and interpret the game manual systematically',
      'Run a structured strategic analysis of the new game',
      'Identify priority robot capabilities before designing',
    ],
    teacher: {
      overview: 'Kickoff is the highest-energy week of the season. Your job is to channel that energy into disciplined analysis. Resist the urge to sketch robot concepts on day one. Understand the game first — design comes in Unit 3.',
      agenda: [
        { time: 'Day 1', activity: 'Kickoff broadcast + first read of game manual as a team' },
        { time: 'Day 2', activity: 'Rules deep-dive: scoring, penalties, match flow, field dimensions' },
        { time: 'Day 3', activity: 'Ranking point analysis and strategic archetype brainstorm' },
        { time: 'Day 4', activity: 'Robot capability prioritization (must-have vs. nice-to-have)' },
        { time: 'Day 5', activity: 'Strategy presentation and design constraints handoff' },
      ],
      discussionPrompts: [
        'Which scoring action has the best points-per-second ratio?',
        'What alliance roles exist in this game (primary scorer, defender, support)?',
        'What capability is table-stakes vs. a differentiator?',
      ],
      tips: [
        'Assign pairs of students to each manual section to present back',
        'Use a whiteboard matrix: capability vs. estimated difficulty vs. strategic value',
        'Document rule ambiguities and submit Q&A questions on Day 2',
      ],
    },
    student: {
      overview: 'Kickoff week is about understanding the game before touching the robot. Careful reading now prevents expensive design mistakes later. Take notes, ask questions, and challenge assumptions.',
      exercises: [
        { title: 'Manual Summary', description: 'Summarize your assigned manual section in 10 bullet points and present it to the team.' },
        { title: 'Points-Per-Second Calc', description: 'Calculate max theoretical scoring for each action and rank them.' },
        { title: 'Match Simulation', description: 'Using paper pieces and a taped floor, simulate a match to expose rule edge cases.' },
      ],
      deliverables: [
        'Personal annotated copy of the game manual',
        'Team strategy document with prioritized capabilities',
        'List of 5+ Q&A questions submitted to FIRST',
      ],
      checklist: [
        'I can describe the match flow in 60 seconds',
        'I know the top 3 scoring priorities and why',
        'I know our team\'s chosen strategic archetype',
      ],
    },
  },
  'unit-3': {
    duration: '2 weeks (mid-January)',
    objectives: [
      'Convert strategy into testable mechanism prototypes',
      'Run decision matrices to pick among design options',
      'Produce a locked-in CAD concept before fabrication starts',
    ],
    teacher: {
      overview: 'This unit is where prototypes save weeks of rework. Push students to build rough, fast, ugly prototypes to test ideas — not polished versions. The goal is learning, not aesthetics. End the unit with a committed architecture.',
      agenda: [
        { time: 'Week 1 Day 1-2', activity: 'Mechanism brainstorm — 3 options per capability' },
        { time: 'Week 1 Day 3-5', activity: 'Rapid prototype builds (wood, tape, cardboard OK)' },
        { time: 'Week 2 Day 1-2', activity: 'Prototype testing and decision matrix scoring' },
        { time: 'Week 2 Day 3-4', activity: 'Packaging study: do the mechanisms fit in the frame?' },
        { time: 'Week 2 Day 5', activity: 'Design review and CAD freeze for critical components' },
      ],
      discussionPrompts: [
        'Which prototype performed best, and why?',
        'What failure modes did prototyping expose?',
        'Are we copying a proven design pattern or inventing something new? What does that mean for risk?',
      ],
      tips: [
        'Cap each prototype at 4 hours to force simplicity',
        'Require video evidence of each prototype operating',
        'Use Onshape for CAD so remote mentors can review',
      ],
    },
    student: {
      overview: 'Prototyping beats guessing. A bad prototype that teaches you something is more valuable than a perfect render that sits in CAD. Build fast, break things, measure results.',
      exercises: [
        { title: 'Three Concepts', description: 'For your assigned mechanism, sketch three distinct concepts and identify the trade-offs.' },
        { title: 'Prototype & Measure', description: 'Build the most promising concept in wood or scrap and record measurable results (cycle time, reliability, weight).' },
        { title: 'Decision Matrix', description: 'Score your options on weighted criteria (speed, reliability, cost, build time, strategic fit).' },
      ],
      deliverables: [
        'Sketch sheets with 3+ mechanism options',
        'Working prototype with test video',
        'Completed decision matrix with team sign-off',
      ],
      checklist: [
        'I built a prototype with my own hands this unit',
        'I can explain why we chose our mechanism over alternatives',
        'Our CAD concept is ready for manufacturing handoff',
      ],
    },
  },
  'unit-4': {
    duration: '3 weeks (late January – mid February)',
    objectives: [
      'Manufacture parts to tolerance and assemble subsystems',
      'Run mechanical and electrical integration in parallel',
      'Maintain a practice schedule that protects driver training time',
    ],
    teacher: {
      overview: 'Build season is a project management exercise as much as an engineering one. Track parts, protect the critical path, and keep weekly integration milestones. Hero builds the last weekend before bag/ship cause unprogrammed robots.',
      agenda: [
        { time: 'Week 1', activity: 'Drivetrain complete and driving under manual control' },
        { time: 'Week 2', activity: 'Primary scoring mechanism mounted and actuating' },
        { time: 'Week 3', activity: 'Full integration, bumper build, and electrical cleanup' },
      ],
      discussionPrompts: [
        'What\'s blocking us this week, and whose help do we need?',
        'Is our critical path still realistic, or do we need to cut scope?',
        'When will programming get uninterrupted robot time?',
      ],
      tips: [
        'Hold a 10-minute standup every meeting to expose blockers early',
        'Freeze drivetrain changes by end of Week 1 so programmers can start',
        'Budget 10% time buffer — build season always surprises you',
      ],
    },
    student: {
      overview: 'Execution time. Focus on quality fabrication, clean wiring, and documentation. Every fastener you install, label, or log now saves debug time at competition.',
      exercises: [
        { title: 'Part Fabrication', description: 'Manufacture your assigned parts to drawing tolerance. Document any deviations.' },
        { title: 'Assembly Log', description: 'Keep a photo log of each major assembly step including torque values and wire routing.' },
        { title: 'Integration Test', description: 'Pair with a programmer to run your mechanism under code before the end of your unit.' },
      ],
      deliverables: [
        'Completed parts with inspection tags',
        'Photo documentation of assembly',
        'Signed-off integration test with code',
      ],
      checklist: [
        'My subsystem moves under software command',
        'Fasteners are torqued and threadlocked where required',
        'Wiring is labeled and follows the team standard',
      ],
    },
  },
  'unit-5': {
    duration: 'Parallel with Unit 4, intensifies in Week 3-4',
    objectives: [
      'Stand up drivetrain code and operator controls first',
      'Add mechanism commands and sensor feedback',
      'Validate autonomous routines in simulation and on-robot',
    ],
    teacher: {
      overview: 'Programming cannot wait for a finished robot. Use simulation and bench testing to keep coders productive when the robot is apart. Protect 2+ dedicated drive-practice days before the first competition.',
      agenda: [
        { time: 'Week 1', activity: 'Command-based project scaffolding, controller mapping, drivetrain teleop' },
        { time: 'Week 2', activity: 'Mechanism subsystems and commands, sensor integration' },
        { time: 'Week 3', activity: 'Vision pose estimation, autonomous routines in simulation' },
        { time: 'Week 4', activity: 'On-robot auto tuning, driver practice, match replay debugging' },
      ],
      discussionPrompts: [
        'Which subsystem is riskiest in code — and what\'s our backup plan?',
        'Can a driver do a full match without the robot faulting?',
        'How are we logging so we can debug issues after a match?',
      ],
      tips: [
        'Use Git branches per feature and require PR review',
        'Run simulation every meeting to catch regressions',
        'AdvantageScope + DataLog give you post-match X-ray vision',
      ],
    },
    student: {
      overview: 'Good code is written small, tested early, and version-controlled. Write for the next programmer who reads it. When in doubt, log the value and graph it.',
      exercises: [
        { title: 'Subsystem Skeleton', description: 'Write a command-based subsystem with a default command and at least one parameterized command.' },
        { title: 'Simulation Drive', description: 'Drive your robot in WPILib simulation and verify telemetry in Glass/AdvantageScope.' },
        { title: 'Auto Path', description: 'Build a 2-piece autonomous path in PathPlanner and run it in sim and on-robot.' },
      ],
      deliverables: [
        'Merged pull request for your feature',
        'Simulation video showing your subsystem working',
        'DataLog from at least one full practice match',
      ],
      checklist: [
        'My code is merged to main and reviewed',
        'Telemetry exposes the values I need to debug',
        'Autonomous runs reliably 3 times in a row',
      ],
    },
  },
  'unit-6': {
    duration: 'Event weeks + 1 post-season debrief',
    objectives: [
      'Execute a repeatable competition day routine',
      'Scout effectively and contribute to alliance selection',
      'Reflect on the season and feed lessons into offseason planning',
    ],
    teacher: {
      overview: 'Competition is where preparation pays off. Your job shifts from teaching to coaching — empower student drive team and scouts to make calls. After the event, a structured debrief turns experience into institutional memory.',
      agenda: [
        { time: 'Pre-event', activity: 'Packing checklist, travel logistics, pit assignments' },
        { time: 'Event Day 1', activity: 'Load-in, inspection, practice matches, scouting launch' },
        { time: 'Event Day 2-3', activity: 'Qualification matches, between-match maintenance, strategy meetings' },
        { time: 'Playoffs', activity: 'Alliance selection prep, match strategy briefs' },
        { time: 'Post-event', activity: 'Hot wash debrief within 1 week, document action items' },
      ],
      discussionPrompts: [
        'What went well that we should institutionalize?',
        'What surprised us, and why didn\'t we anticipate it?',
        'What one change would have the biggest impact next event?',
      ],
      tips: [
        'Keep the pit clean — inspectors notice and so do scouts',
        'Rotate roles so everyone experiences drive team and pit crew',
        'Capture the post-season retro within a week while memory is fresh',
      ],
    },
    student: {
      overview: 'At competition, the team is one organism. Know your role, support others, and represent your program with professionalism. After the event, your honest reflection is what makes next year better.',
      exercises: [
        { title: 'Role Card', description: 'Write a one-page description of your event role including handoffs to other roles.' },
        { title: 'Scouting Shift', description: 'Complete at least one scouting shift and verify your data matches official results.' },
        { title: 'Personal Retro', description: 'Journal daily — what did I do, what did I learn, what will I change tomorrow?' },
      ],
      deliverables: [
        'Role card signed off by mentor',
        'Scouting data submitted to team lead',
        'Post-event reflection (1 page minimum)',
      ],
      checklist: [
        'I contributed to at least 3 qualification matches in my role',
        'I submitted accurate scouting data',
        'I identified one personal growth goal for next season',
      ],
    },
  },
};

function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <div className="inline-flex bg-steel-100 rounded-xl p-1 gap-1">
      <button
        onClick={() => onChange('teacher')}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
          view === 'teacher' ? 'bg-white text-brand-700 shadow-sm' : 'text-steel-500 hover:text-steel-700'
        }`}
      >
        <Users className="w-3.5 h-3.5" />
        Teacher Guide
      </button>
      <button
        onClick={() => onChange('student')}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
          view === 'student' ? 'bg-white text-brand-700 shadow-sm' : 'text-steel-500 hover:text-steel-700'
        }`}
      >
        <BookOpen className="w-3.5 h-3.5" />
        Student Guide
      </button>
    </div>
  );
}

function UnitSection({ id, title, content }: { id: string; title: string; content: UnitContent }) {
  const [view, setView] = useState<View>('teacher');
  const active = content[view];

  return (
    <section id={id}>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <h2 className="text-xl font-bold text-steel-900">{title}</h2>
        <ViewToggle view={view} onChange={setView} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-steel-50 rounded-full text-steel-600 font-medium">
          <Clock className="w-3.5 h-3.5" /> {content.duration}
        </span>
      </div>

      <InfoBox variant="info" title={view === 'teacher' ? 'Unit Overview (for coaches)' : 'What you will learn'}>
        {active.overview}
      </InfoBox>

      <div className="mt-5">
        <h3 className="text-sm font-bold text-steel-800 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-brand-600" /> Learning Objectives
        </h3>
        <ul className="space-y-1.5">
          {content.objectives.map((o, i) => (
            <li key={i} className="flex gap-2 text-sm text-steel-600">
              <span className="text-brand-500 font-bold">{i + 1}.</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>

      {view === 'teacher' ? (
        <>
          <div className="mt-5">
            <CollapsibleSection title="Suggested Agenda" defaultOpen>
              <div className="space-y-2">
                {content.teacher.agenda.map((item, i) => (
                  <div key={i} className="flex gap-4 py-2 border-b border-steel-100 last:border-0">
                    <span className="text-xs font-bold text-brand-600 font-mono w-24 flex-shrink-0">{item.time}</span>
                    <span className="text-sm text-steel-700">{item.activity}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          <div className="mt-4">
            <CollapsibleSection title="Discussion Prompts">
              <ul className="space-y-2">
                {content.teacher.discussionPrompts.map((p, i) => (
                  <li key={i} className="text-sm text-steel-700 italic">&ldquo;{p}&rdquo;</li>
                ))}
              </ul>
            </CollapsibleSection>
          </div>

          <div className="mt-4">
            <CollapsibleSection title="Mentor Tips">
              <ul className="space-y-2">
                {content.teacher.tips.map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm text-steel-700">
                    <span className="text-amber-500">-</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          </div>
        </>
      ) : (
        <>
          <div className="mt-5 space-y-3">
            <h3 className="text-sm font-bold text-steel-800">Hands-on Exercises</h3>
            {content.student.exercises.map((ex, i) => (
              <div key={i} className="bg-white border border-steel-200 rounded-xl p-4">
                <p className="font-semibold text-sm text-steel-800">{i + 1}. {ex.title}</p>
                <p className="text-sm text-steel-600 mt-1 leading-relaxed">{ex.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <CollapsibleSection title="Deliverables">
              <ul className="space-y-1.5">
                {content.student.deliverables.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm text-steel-700">
                    <CheckSquare className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          </div>

          <div className="mt-4">
            <CollapsibleSection title="Self-Assessment Checklist">
              <ul className="space-y-1.5">
                {content.student.checklist.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-steel-700">
                    <span className="inline-block w-4 h-4 border-2 border-steel-300 rounded flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          </div>
        </>
      )}
    </section>
  );
}

export default function CoachCurriculumContent() {
  return (
    <div className="space-y-10">
      <section id="preparation">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-steel-900">Preparation & Overview</h2>
        </div>

        <p className="text-steel-600 leading-relaxed mb-4">
          This curriculum path gives new FRC coaches a structured, unit-by-unit plan to teach a
          full season. Each of the six units has paired <strong>Teacher Guides</strong> (with
          agendas, discussion prompts, and mentor tips) and <strong>Student Guides</strong> (with
          exercises, deliverables, and self-assessment checklists). Toggle between the two views
          on each unit below.
        </p>

        <InfoBox variant="tip" title="How to use this curriculum">
          Treat the units as a scaffold, not a script. Move faster or slower based on your team's
          experience, combine units when needed, and borrow agendas for offseason training. New
          coaches should read the Teacher Guide for a unit one week ahead of delivering it.
        </InfoBox>

        <div className="mt-6">
          <h3 className="text-sm font-bold text-steel-800 mb-3">Curriculum Map</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { n: 1, title: 'Preseason Foundations', window: 'Sep-Oct' },
              { n: 2, title: 'Kickoff & Strategy', window: 'Early Jan' },
              { n: 3, title: 'Design & Prototyping', window: 'Mid Jan' },
              { n: 4, title: 'Build & Fabrication', window: 'Late Jan - Feb' },
              { n: 5, title: 'Programming & Integration', window: 'Parallel w/ Unit 4' },
              { n: 6, title: 'Competition & Reflection', window: 'Mar-Apr' },
            ].map((u) => (
              <div key={u.n} className="bg-white border border-steel-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center">{u.n}</span>
                  <span className="text-[11px] text-steel-400 font-medium">{u.window}</span>
                </div>
                <p className="text-sm font-semibold text-steel-800">{u.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold text-steel-800 mb-3">Recommended Companion Resources</h3>
          <div className="grid gap-2">
            <ResourceCard resource={{ title: 'FRC Mentor Guide (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/frc_mentor_guide.pdf', type: 'pdf', description: 'Official FIRST mentor handbook' }} />
            <ResourceCard resource={{ title: 'Spectrum 3847 Training Curriculum', url: 'https://docs.google.com/document/u/1/d/e/2PACX-1vQk_ghFBN7682QI_17lbBCx8V_RXNomQRR7er-UIzlllsbdpO4RWOQAVnGFZAEypeNm2grS2G9oxFMp/pub', type: 'link', description: 'Comprehensive student training curriculum' }} />
            <ResourceCard resource={{ title: 'Team Management Resources', url: 'https://www.firstinspires.org/resources/library/frc/team-management-resources', type: 'link', description: 'FIRST guides for running a team' }} />
          </div>
        </div>
      </section>

      <UnitSection id="unit-1" title="Unit 1: Preseason Foundations" content={units['unit-1']} />
      <UnitSection id="unit-2" title="Unit 2: Kickoff & Strategy" content={units['unit-2']} />
      <UnitSection id="unit-3" title="Unit 3: Design & Prototyping" content={units['unit-3']} />
      <UnitSection id="unit-4" title="Unit 4: Build & Fabrication" content={units['unit-4']} />
      <UnitSection id="unit-5" title="Unit 5: Programming & Integration" content={units['unit-5']} />
      <UnitSection id="unit-6" title="Unit 6: Competition & Reflection" content={units['unit-6']} />
    </div>
  );
}
