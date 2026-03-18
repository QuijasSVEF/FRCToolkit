import ResourceCard from '../components/ResourceCard';
import VideoEmbed from '../components/VideoEmbed';

const officialResources = [
  { title: '2026 Game Manual (PDF)', url: 'https://firstfrc.blob.core.windows.net/frc2026/Manual/2026GameManual.pdf', type: 'pdf' as const, description: 'Complete game rules and specifications' },
  { title: '2026 Inspection Checklist (PDF)', url: 'https://firstfrc.blob.core.windows.net/frc2026/Manual/2026FRCInspectionChecklist.pdf', type: 'pdf' as const, description: 'What inspectors check at events' },
  { title: 'FRC Season Materials', url: 'https://www.firstinspires.org/resources/library/frc/season-materials', type: 'link' as const, description: 'Calendars, documents, season info' },
  { title: 'FRC Events List 2026', url: 'https://frc-events.firstinspires.org/2026/Events/EventList', type: 'link' as const, description: 'All 2026 competition events' },
  { title: 'Kit of Parts', url: 'https://www.firstinspires.org/resources/library/frc/kit-of-parts', type: 'link' as const, description: 'What comes in the KoP' },
  { title: 'KitBot Resources', url: 'https://www.firstinspires.org/resources/library/frc/kitbot', type: 'link' as const, description: 'KitBot build documentation' },
  { title: 'FRC Awards', url: 'https://www.firstinspires.org/resources/library/frc/awards', type: 'link' as const, description: 'Award categories and criteria' },
  { title: 'Youth Protection Program', url: 'https://www.firstinspires.org/programs/youth-protection-program', type: 'link' as const, description: 'YPP policies and training' },
  { title: 'Youth Protection Training', url: 'https://training.firstinspires.org/courses/youth-protection', type: 'link' as const, description: 'Online YPP training course' },
  { title: 'FIRST Safety Manual', url: 'https://www.firstinspires.org/resources/library/safety', type: 'link' as const, description: 'Safety framework and practices' },
  { title: 'Team Grant Opportunities', url: 'https://www.firstinspires.org/programs/team-grant-opportunities', type: 'link' as const, description: 'Available grants for teams' },
  { title: 'Fundraising Toolkit', url: 'https://www.firstinspires.org/resources/library/fundraising-toolkit', type: 'link' as const, description: 'Fundraising resources library' },
  { title: 'Technical Resources', url: 'https://www.firstinspires.org/resources/library/frc/technical-resources', type: 'link' as const, description: 'Official wiring, pneumatics, and design videos' },
];

const mentorResources = [
  { title: 'FRC Mentor Guide (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/frc_mentor_guide.pdf', type: 'pdf' as const, description: 'Season calendar and mentor expectations' },
  { title: 'Team Management Resources', url: 'https://www.firstinspires.org/resources/library/frc/team-management-resources', type: 'link' as const, description: 'Leadership, mental health, operations' },
  { title: 'How To: Organize a Team (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/team-org.pdf', type: 'pdf' as const, description: 'Team structure and organization' },
  { title: 'Sponsor Relations Guide (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/sponsor-relations.pdf', type: 'pdf' as const, description: 'Sponsor outreach and retention' },
  { title: 'Fundraising Guide (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/fundraising-guide.pdf', type: 'pdf' as const, description: 'Fundraising strategies' },
  { title: 'Example Budget (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/example-budget.pdf', type: 'pdf' as const, description: 'Median team budget reference' },
];

const wpilibResources = [
  { title: 'WPILib Documentation', url: 'https://docs.wpilib.org/', type: 'link' as const, description: 'Complete WPILib reference' },
  { title: 'Zero to Robot: Wiring', url: 'https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-1/basic-robot-wiring.html', type: 'link' as const, description: 'Step-by-step wiring guide' },
  { title: 'Radio Programming', url: 'https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-3/radio-programming.html', type: 'link' as const, description: 'VH-109 radio setup' },
  { title: 'CAN Wiring Basics', url: 'https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/can-wiring-basics.html', type: 'link' as const, description: 'CAN bus wiring guide' },
  { title: 'Robot Battery Guide', url: 'https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/robot-battery.html', type: 'link' as const, description: 'Battery management info' },
  { title: 'Command-Based Programming', url: 'https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html', type: 'link' as const, description: 'Command-based framework docs' },
  { title: 'Physics Simulation', url: 'https://docs.wpilib.org/en/stable/docs/software/wpilib-tools/robot-simulation/physics-sim.html', type: 'link' as const, description: 'Robot simulation tools' },
  { title: 'Path Planning', url: 'https://docs.wpilib.org/en/stable/docs/software/pathplanning/index.html', type: 'link' as const, description: 'Trajectory generation and following' },
  { title: 'Kinematics & Odometry', url: 'https://docs.wpilib.org/en/stable/docs/software/kinematics-and-odometry/intro-and-chassis-speeds.html', type: 'link' as const, description: 'Drivetrain math' },
  { title: 'System Identification', url: 'https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/introduction.html', type: 'link' as const, description: 'SysId tool for characterization' },
  { title: 'Wiring Best Practices', url: 'https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/wiring-best-practices.html', type: 'link' as const, description: 'Tips for reliable wiring' },
];

const vendorResources = [
  { title: 'REV SPARK MAX', url: 'https://docs.revrobotics.com/brushless/spark-max/overview', type: 'link' as const, description: 'Motor controller docs' },
  { title: 'REV SPARK Flex', url: 'https://docs.revrobotics.com/brushless/spark-flex/overview', type: 'link' as const, description: 'Dockable motor controller' },
  { title: 'REV PDH Wiring', url: 'https://docs.revrobotics.com/ion-control/pdh/gs/wiring', type: 'link' as const, description: 'Power distribution hub' },
  { title: 'CTRE Kraken X60', url: 'https://store.ctr-electronics.com/products/kraken-x60', type: 'link' as const, description: 'Integrated brushless motor' },
  { title: 'Radio Firmware', url: 'https://frc-radio.vivid-hosting.net/overview/firmware-releases', type: 'link' as const, description: 'VH-109 firmware' },
  { title: 'Radio Wiring', url: 'https://frc-radio.vivid-hosting.net/overview/wiring-your-radio', type: 'link' as const, description: 'Radio wiring guide' },
  { title: 'Pneumatics Manual (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/pneumatics-manual.pdf', type: 'pdf' as const, description: 'Pneumatics rules and practices' },
  { title: 'NI FRC Game Tools', url: 'https://www.ni.com/en/support/downloads/drivers/download.frc-game-tools.html', type: 'tool' as const, description: 'Driver station and roboRIO tools' },
  { title: 'roboRIO 2.0 Specs', url: 'https://www.ni.com/docs/en-US/bundle/roborio-20-specs/page/specs.html', type: 'link' as const, description: 'Controller specifications' },
];

const communityResources = [
  { title: 'Chief Delphi', url: 'https://www.chiefdelphi.com/', type: 'link' as const, description: 'Largest FRC community forum' },
  { title: 'The Compass Alliance', url: 'https://www.thecompassalliance.org/', type: 'link' as const, description: 'Scouting guides and team resources' },
  { title: 'Team 118 Everybot', url: 'https://www.118everybot.org/2026-frc-resources', type: 'link' as const, description: 'Accessible build documentation' },
  { title: 'The Blue Alliance', url: 'https://www.thebluealliance.com/', type: 'tool' as const, description: 'Match data, rankings, and history' },
  { title: 'TBA API Docs', url: 'https://www.thebluealliance.com/apidocs', type: 'tool' as const, description: 'Community data API' },
  { title: 'FRC Events API', url: 'https://frc-api-docs.firstinspires.org/', type: 'tool' as const, description: 'Official event data' },
  { title: 'Statbotics', url: 'https://www.statbotics.io/', type: 'tool' as const, description: 'Advanced FRC statistics' },
  { title: 'PhotonVision Docs', url: 'https://docs.photonvision.org/', type: 'tool' as const, description: 'Vision processing for FRC' },
  { title: 'Limelight Docs', url: 'https://docs.limelightvision.io/', type: 'tool' as const, description: 'Plug-and-play vision system' },
  { title: 'PathPlanner', url: 'https://pathplanner.dev/', type: 'tool' as const, description: 'Autonomous path planning tool' },
  { title: 'Everybot Docs', url: 'https://robonauts-everybot.github.io/Everybot-Docs/fundamentals/electrical-overview/', type: 'link' as const, description: 'Robonauts Everybot wiring and build docs' },
];

const videos = [
  {
    title: '2026 REBUILT Game Animation',
    url: 'https://www.youtube.com/watch?v=_fybREErgyM',
    embedUrl: 'https://www.youtube.com/embed/_fybREErgyM',
    description: 'Official 2026 FIRST Robotics Competition REBUILT game reveal',
  },
  {
    title: '2026 KitBot Build Walkthrough',
    url: 'https://www.youtube.com/watch?v=d3it7-qxCkg',
    embedUrl: 'https://www.youtube.com/embed/d3it7-qxCkg',
    description: 'Official step-by-step 2026 KitBot build with Dee & Brian',
  },
  {
    title: '2026 KitBot Overview',
    url: 'https://www.youtube.com/watch?v=xrBeEziJGJk',
    embedUrl: 'https://www.youtube.com/embed/xrBeEziJGJk',
    description: 'Learn what the KitBot can and cannot do on the field',
  },
  {
    title: 'How to Wire an FRC Robot',
    url: 'https://www.youtube.com/watch?v=lGgIhxYuSHM',
    embedUrl: 'https://www.youtube.com/embed/lGgIhxYuSHM',
    description: 'Official FIRST wiring guide for the FRC control system',
  },
  {
    title: 'Wiring Essentials with April Riddett',
    url: 'https://www.youtube.com/watch?v=BHGSJDqd3J8',
    embedUrl: 'https://www.youtube.com/embed/BHGSJDqd3J8',
    description: 'Practical wiring tips and best practices for FRC robots',
  },
  {
    title: '0 to Autonomous: FRC Java Programming (Episode 1)',
    url: 'https://www.youtube.com/watch?v=ihO-mw_4Qpo',
    embedUrl: 'https://www.youtube.com/embed/ihO-mw_4Qpo',
    description: 'FRC programming tutorial series by Team 6814',
  },
  {
    title: 'How to Wire the Pneumatics',
    url: 'https://www.youtube.com/watch?v=uQEiNiHT9fs',
    embedUrl: 'https://www.youtube.com/embed/uQEiNiHT9fs',
    description: 'Official pneumatics wiring guide using REV Pneumatic Hub',
  },
  {
    title: 'How Do I Keep My Robot Running?',
    url: 'https://www.youtube.com/watch?v=3eB8Eg4zRg0',
    embedUrl: 'https://www.youtube.com/embed/3eB8Eg4zRg0',
    description: 'AndyMark tips and tricks for robot reliability at events',
  },
  {
    title: 'Effective FIRST Strategies 2025 - Karthik Kanagasabapathy',
    url: 'https://www.youtube.com/watch?v=cemXDEzBMhM',
    embedUrl: 'https://www.youtube.com/embed/cemXDEzBMhM',
    description: 'The definitive FRC strategy presentation on design, match planning, and scouting',
  },
  {
    title: 'Goal Setting for FRC Teams - Mike Corsetto (1678)',
    url: 'https://www.youtube.com/watch?v=TyBWSDEIuXI',
    embedUrl: 'https://www.youtube.com/embed/TyBWSDEIuXI',
    description: 'How to set effective team goals from a veteran mentor on Team 1678',
  },
  {
    title: '2025 Safety Animation Winner - Team 1986',
    url: 'https://www.youtube.com/watch?v=N0NpnYW-Z8o',
    embedUrl: 'https://www.youtube.com/embed/N0NpnYW-Z8o',
    description: 'Award-winning safety animation showcasing FRC safety culture',
  },
  {
    title: 'How to Adjust the Pressure Relief Valve',
    url: 'https://www.youtube.com/watch?v=foQlAigAd5c',
    embedUrl: 'https://www.youtube.com/embed/foQlAigAd5c',
    description: 'Official FIRST guide on pneumatic pressure relief valve adjustment',
  },
];

export default function ResourcesContent() {
  return (
    <div className="space-y-10">
      <section id="official-first">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Official FIRST Resources</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          These are the primary official documents and resources from FIRST. Always reference
          these for the most current and authoritative information.
        </p>
        <div className="grid gap-2">
          {officialResources.map((r) => (
            <ResourceCard key={r.url} resource={r} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-steel-900 mb-4">Mentor Operations & Team Organization</h2>
        <div className="grid gap-2">
          {mentorResources.map((r) => (
            <ResourceCard key={r.url} resource={r} />
          ))}
        </div>
      </section>

      <section id="wpilib-docs">
        <h2 className="text-xl font-bold text-steel-900 mb-4">WPILib Documentation</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          WPILib is the official FRC control system library. These resources cover everything
          from wiring to autonomous programming.
        </p>
        <div className="grid gap-2">
          {wpilibResources.map((r) => (
            <ResourceCard key={r.url} resource={r} />
          ))}
        </div>
      </section>

      <section id="vendor-docs">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Vendor Documentation</h2>
        <div className="grid gap-2">
          {vendorResources.map((r) => (
            <ResourceCard key={r.url} resource={r} />
          ))}
        </div>
      </section>

      <section id="community">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Community Resources</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The FRC community produces outstanding resources. These are the most widely used and
          trusted community tools and forums.
        </p>
        <div className="grid gap-2">
          {communityResources.map((r) => (
            <ResourceCard key={r.url} resource={r} />
          ))}
        </div>
      </section>

      <section id="video-library">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Video Library</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Curated videos with high mentor ROI, covering program overview, building, programming,
          and team management.
        </p>
        <div className="space-y-6">
          {videos.map((video) => (
            <VideoEmbed key={video.url} video={video} />
          ))}
        </div>
      </section>

      <section id="tools-software">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Tools & Software</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'WPILib Suite', desc: 'VS Code + FRC tools + build system', url: 'https://docs.wpilib.org/' },
            { name: 'NI FRC Game Tools', desc: 'Driver Station + roboRIO Imaging', url: 'https://www.ni.com/en/support/downloads/drivers/download.frc-game-tools.html' },
            { name: 'REV Hardware Client', desc: 'Configure REV devices', url: 'https://docs.revrobotics.com/rev-hardware-client/' },
            { name: 'Phoenix Tuner X', desc: 'Configure CTRE devices', url: 'https://pro.docs.ctr-electronics.com/en/stable/docs/tuner/index.html' },
            { name: 'Onshape', desc: 'Cloud CAD for teams', url: 'https://www.onshape.com/en/education' },
            { name: 'PathPlanner', desc: 'Autonomous path planning', url: 'https://pathplanner.dev/' },
            { name: 'PhotonVision', desc: 'Vision processing', url: 'https://photonvision.org/' },
            { name: 'AdvantageScope', desc: 'Robot log viewer', url: 'https://github.com/Mechanical-Advantage/AdvantageScope' },
          ].map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-steel-50 rounded-lg p-4 hover:bg-steel-100 transition-colors group"
            >
              <p className="font-semibold text-sm text-steel-800 group-hover:text-brand-600 transition-colors">{tool.name}</p>
              <p className="text-xs text-steel-500 mt-1">{tool.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
