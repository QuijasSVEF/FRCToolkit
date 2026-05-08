import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';
import VideoEmbed from '../components/VideoEmbed';
import QuizBlock from '../components/QuizBlock';

export default function MechanicalContent() {
  return (
    <div className="space-y-8">
      <section id="workspace-setup">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Workspace Setup</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          A well-organized workspace makes build season dramatically more productive and safer.
          Plan your shop layout for parallel workstreams: mechanical assembly, electronics,
          programming, and a clear driving area for testing.
        </p>
        <CollapsibleSection title="Essential Workshop Equipment" defaultOpen>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { cat: 'Power Tools', items: 'Drill press, band saw, jigsaw, angle grinder, impact driver, belt sander' },
              { cat: 'Hand Tools', items: 'Wrenches (SAE & metric), hex keys, pliers, wire strippers, crimpers, files, deburring' },
              { cat: 'Measurement', items: 'Digital calipers, tape measure, combination squares, levels, digital scale' },
              { cat: 'Fasteners Station', items: 'Organized bins of 10-32, 1/4-20 bolts, nylock nuts, washers, standoffs, rivets, Loctite' },
              { cat: 'Electronics Bench', items: 'Multimeter, soldering station, heat shrink, wire (12-18 AWG), Anderson connectors' },
              { cat: 'Safety Equipment', items: 'Safety glasses (one per student), hearing protection, first aid kit, fire extinguisher' },
              { cat: 'Computing', items: 'Laptops for CAD and programming, dedicated driver station laptop, spare USB cables' },
              { cat: 'Testing Area', items: 'Clear space (min 12x24ft preferred), carpet sample matching field, spare batteries' },
            ].map((item) => (
              <div key={item.cat} className="bg-steel-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-steel-800">{item.cat}</p>
                <p className="text-xs text-steel-500 mt-1">{item.items}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>
        <VideoEmbed video={{
          title: 'Intro to Spectrum Shop - Team 3847',
          url: 'https://www.youtube.com/watch?v=6wS4OakvGf0',
          embedUrl: 'https://www.youtube.com/embed/6wS4OakvGf0',
          description: 'Tour of a well-organized FRC team workshop'
        }} />
      </section>

      <section id="drivetrain-options">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Drivetrain Options</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The drivetrain is the foundation of your robot. For new teams, a kit-style 6-wheel drive
          (West Coast Drive) is the standard recommendation. Swerve is increasingly accessible
          with pre-made modules but still requires strong programming.
        </p>
        <DataTable
          caption="Drivetrain Comparison"
          columns={[
            { key: 'type', header: 'Type', width: '18%' },
            { key: 'pros', header: 'Strengths' },
            { key: 'cons', header: 'Challenges' },
            { key: 'cost', header: 'Cost', width: '12%' },
          ]}
          rows={[
            { type: '6-Wheel (WCD)', pros: 'Simple, reliable, strong pushing power, KitBot available', cons: 'No lateral movement, needs dropped center wheel', cost: '$500-800' },
            { type: 'Mecanum', pros: 'Omnidirectional, moderate complexity, cheaper than swerve', cons: 'Lower traction, easily pushed around', cost: '$600-900' },
            { type: 'Swerve', pros: 'Full holonomic with high traction, most competitive', cons: 'Complex, expensive, requires advanced programming', cost: '$1500-2500' },
            { type: 'Tank Treads', pros: 'Maximum traction, good on rough terrain', cons: 'Very heavy, maintenance-intensive', cost: '$800-1200' },
          ]}
        />

        <CollapsibleSection title="Swerve Module Options">
          <DataTable
            caption="Popular Swerve Modules"
            columns={[
              { key: 'module', header: 'Module', width: '22%' },
              { key: 'motors', header: 'Motors' },
              { key: 'notes', header: 'Notes' },
            ]}
            rows={[
              { module: 'SDS MK4i', motors: 'NEO/Falcon/Kraken', notes: 'Most popular, well-documented, multiple gear ratios, inverted design' },
              { module: 'WCP SwerveX', motors: 'NEO/Falcon/Kraken', notes: 'Compact, high quality, newer design' },
              { module: 'REV MAXSwerve', motors: 'NEO only', notes: 'Integrated with REV ecosystem, plug-and-play' },
              { module: 'Thrifty Swerve', motors: 'NEO/Falcon', notes: 'Budget-friendly option for transitioning teams' },
            ]}
          />
        </CollapsibleSection>

        <InfoBox variant="tip" title="New Team Recommendation">
          Start with the KitBot or a 6-wheel West Coast Drive. Master it, compete with it,
          and consider swerve in your second or third season.
        </InfoBox>

        <VideoEmbed video={{
          title: 'Exploration of FRC Kit Drivetrain - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=WP8MMmHlwTM',
          embedUrl: 'https://www.youtube.com/embed/WP8MMmHlwTM',
          description: 'Deep dive into the FRC kit drivetrain components and assembly'
        }} />
      </section>

      <section id="mechanisms">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Mechanisms & Actuators</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Most FRC game tasks involve: acquiring game pieces, transporting them, and scoring them.
          Understanding common mechanism archetypes helps you quickly prototype solutions.
        </p>

        <CollapsibleSection title="Common Mechanism Types" defaultOpen>
          <div className="space-y-3">
            {[
              { name: 'Intakes (Over-the-Bumper)', desc: 'Compliant wheels/rollers reaching over bumpers to grab pieces. Most common style. Use compression for grip.' },
              { name: 'Elevators', desc: 'Linear motion for lifting. Cascading (2-3 stage) or continuous. Use counterbalancing for control.' },
              { name: 'Pivot Arms', desc: 'Rotating arms for positioning. Single or multi-joint. Need careful gear reduction and absolute encoders.' },
              { name: 'Shooters/Launchers', desc: 'Flywheels (single or double) for launching. Require spin-up time and consistent speed.' },
              { name: 'Climbers', desc: 'Hooks, telescoping tubes, or winches for end-game. Must support full robot weight.' },
              { name: 'Indexers/Storage', desc: 'Conveyors or belts that stage game pieces. Beam breaks detect piece position.' },
            ].map((item) => (
              <div key={item.name} className="bg-steel-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-steel-800">{item.name}</p>
                <p className="text-xs text-steel-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Motor Selection Guide">
          <DataTable
            caption="Common FRC Motors"
            columns={[
              { key: 'motor', header: 'Motor', width: '18%' },
              { key: 'power', header: 'Power', width: '12%' },
              { key: 'use', header: 'Typical Use Cases' },
            ]}
            rows={[
              { motor: 'NEO (REV)', power: '406W', use: 'Drivetrains, elevators, arms. Brushless, built-in encoder.' },
              { motor: 'NEO 550', power: '279W', use: 'Intakes, indexers, small mechanisms. Compact.' },
              { motor: 'NEO Vortex', power: '493W', use: 'High-performance drivetrain/mechanisms. Requires SPARK Flex.' },
              { motor: 'Falcon 500', power: '478W', use: 'Drivetrains, shooters. Integrated controller (Talon FX).' },
              { motor: 'Kraken X60', power: '595W', use: 'Highest power option. Integrated Talon FX.' },
            ]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Mechanical Advantage & Gearing">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Gear ratio = driven/driving teeth. 50:10 (5:1) multiplies torque 5x, divides speed by 5.',
              'Drivetrains: typically 5:1 to 8:1 reduction depending on speed goals.',
              'Mechanisms: calculate required torque, choose ratio keeping motor in efficient range.',
              'Efficiency losses: ~85-90% per gear stage, ~95% for belt/chain.',
              'Use JVN Design Calculator or ReCalc (reca.lc) to simulate configurations.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'Mechanical Advantage - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=zBjgw0548e0',
          embedUrl: 'https://www.youtube.com/embed/zBjgw0548e0',
          description: 'Understanding gear ratios and mechanical advantage for FRC'
        }} />

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'ReCalc (reca.lc)', url: 'https://www.reca.lc/', type: 'tool', description: 'Modern web-based mechanism calculator for FRC' }} />
        </div>
      </section>

      <section id="kitbot">
        <h2 className="text-xl font-bold text-steel-900 mb-4">KitBot & Everybot</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The KitBot is FIRST's reference robot using Kit of Parts components. Team 118's Everybot
          is an alternative that includes game mechanisms and is competitive at regionals.
        </p>
        <CollapsibleSection title="KitBot Build Strategy" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Day 1-2: Assemble the drive chassis</li>
            <li>Day 2-3: Wire control system (roboRIO, PDP, motor controllers, radio)</li>
            <li>Day 3: Flash firmware, configure devices, deploy basic drive code</li>
            <li>Day 3-4: Build bumpers in parallel</li>
            <li>Day 4-5: First driving! Validate the platform</li>
            <li>Day 5+: Add game-specific mechanisms to the proven base</li>
          </ol>
        </CollapsibleSection>

        <InfoBox variant="info" title="Everybot Alternative">
          Team 118's Everybot includes full game mechanisms and is designed to be buildable by any team.
          The documentation is extremely detailed with full build instructions, CAD, and code.
        </InfoBox>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'KitBot Resources', url: 'https://www.firstinspires.org/resources/library/frc/kitbot', type: 'link', description: 'Official KitBot build documentation' }} />
          <ResourceCard resource={{ title: 'Everybot (Team 118)', url: 'https://www.118everybot.org/', type: 'link', description: 'Complete competitive robot design for any team' }} />
        </div>
      </section>

      <section id="cad-tools">
        <h2 className="text-xl font-bold text-steel-900 mb-4">CAD & Design Tools</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          CAD is essential for designing robot mechanisms before fabrication. A complete model
          helps identify interference, verify fit, and plan assembly.
        </p>
        <DataTable
          caption="Popular FRC CAD Tools"
          columns={[
            { key: 'tool', header: 'Tool', width: '20%' },
            { key: 'cost', header: 'Cost', width: '15%' },
            { key: 'notes', header: 'Notes' },
          ]}
          rows={[
            { tool: 'Onshape', cost: 'Free (edu)', notes: 'Cloud-based, real-time collaboration, any OS. Most popular in FRC. MKCad parts library.' },
            { tool: 'SolidWorks', cost: 'Free (FRC)', notes: 'Industry standard. Desktop (Windows). Apply through FIRST for free license.' },
            { tool: 'Fusion 360', cost: 'Free (edu)', notes: 'Good for CAD + CAM (CNC). Cloud features. Popular alternative.' },
          ]}
        />

        <CollapsibleSection title="Onshape FRC Workflow" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Create free education account at onshape.com/edu</li>
            <li>Complete Onshape Learning Center tutorials</li>
            <li>Install MKCad app (FRC parts: motors, gearboxes, extrusions, electronics)</li>
            <li>Learn FeatureScripts: Tube Converter, Shaft Generator, Gusset Generator</li>
            <li>Organize: separate Part Studios per mechanism, main Assembly for full robot</li>
            <li>Use versions and branches for design iterations</li>
          </ol>
        </CollapsibleSection>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'FRC Design Learning Course', url: 'https://www.frcdesign.org/learning-course/', type: 'link', description: 'Complete Onshape CAD course for FRC' }} />
          <ResourceCard resource={{ title: 'Onshape Learning Center', url: 'https://learn.onshape.com/', type: 'link', description: 'Official Onshape tutorials' }} />
        </div>
      </section>

      <section id="fabrication">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Fabrication Techniques</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Know your fabrication capabilities before build season so designs are buildable.
        </p>
        <CollapsibleSection title="Common FRC Fabrication Methods" defaultOpen>
          <div className="space-y-3">
            {[
              { name: 'Aluminum Extrusion Assembly', desc: 'Cut, drill, and bolt aluminum box tube (1x1, 1x2). Backbone of most FRC robots.' },
              { name: '3D Printing (FDM)', desc: 'PETG/Nylon for functional parts. 50%+ infill, 4+ walls for structural parts.' },
              { name: 'CNC Routing/Milling', desc: 'Precision flat parts from aluminum plates. Requires CAM programming.' },
              { name: 'Laser Cutting', desc: 'Fast, precise. Services like SendCutSend offer quick turnaround. Export DXF from CAD.' },
              { name: 'Sheet Metal (Polycarbonate)', desc: 'Easy to cut, drill, bend. Provides visibility into mechanisms.' },
              { name: 'Riveting', desc: 'Pop rivets: fast, permanent, one-side access. Lighter than bolts.' },
            ].map((item) => (
              <div key={item.name} className="bg-steel-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-steel-800">{item.name}</p>
                <p className="text-xs text-steel-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Materials Guide">
          <DataTable
            caption="Common FRC Materials"
            columns={[
              { key: 'material', header: 'Material', width: '22%' },
              { key: 'use', header: 'Common Uses' },
              { key: 'notes', header: 'Notes' },
            ]}
            rows={[
              { material: '6061 Aluminum', use: 'Frame, brackets, plates', notes: 'Most common FRC material. Good strength-to-weight.' },
              { material: 'Polycarbonate', use: 'Guards, funnels, chutes', notes: 'Transparent, impact resistant. Melts if drilled too fast.' },
              { material: 'UHMW/Delrin', use: 'Low-friction surfaces, guides', notes: 'Self-lubricating. Good for sliding surfaces.' },
              { material: '3D Print (PETG)', use: 'Custom brackets, spacers', notes: 'Good strength. Design with proper wall thickness.' },
            ]}
          />
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'Beginner Materials - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=7to-8fJp-30',
          embedUrl: 'https://www.youtube.com/embed/7to-8fJp-30',
          description: 'Understanding materials used in FRC robot construction'
        }} />

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'SendCutSend', url: 'https://sendcutsend.com/', type: 'tool', description: 'Online laser cutting service, popular with FRC teams' }} />
          <ResourceCard resource={{ title: 'McMaster-Carr', url: 'https://www.mcmaster.com/', type: 'tool', description: 'Industrial supply -- hardware, raw materials, everything' }} />
        </div>
      </section>

      <section id="bumper-construction">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Bumper Construction</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Bumpers are required on all FRC robots and are one of the most commonly failed inspection items.
          Start early -- they take longer than expected.
        </p>
        <CollapsibleSection title="Bumper Rules" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Pool noodles (2.5" round) backed by 3/4" plywood, covered in sturdy fabric',
              'Team numbers: minimum 4 inches tall, white on red AND white on blue backgrounds',
              'Must be within specified height range from floor (check game manual)',
              'Must protect full frame perimeter with limited gaps (usually 8" max)',
              'Must attach securely and be removable for inspection',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Common Inspection Failures">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Numbers too small or not legible from distance',
              'Wrong color scheme -- must be WHITE numbers on alliance color',
              'Bumpers mounted too high or too low',
              'Gaps between segments exceed maximum',
              'Pool noodles damaged/compressed',
              'Fabric loose -- catches on field elements',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <InfoBox variant="tip" title="Reversible Bumpers">
          Build reversible bumpers with red on one side and blue on the other. Saves time at events.
        </InfoBox>

        <VideoEmbed video={{
          title: 'Build a Bumper Corner - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=FzBe4kIvTy8',
          embedUrl: 'https://www.youtube.com/embed/FzBe4kIvTy8',
          description: 'Step-by-step guide to constructing proper FRC bumper corners'
        }} />
      </section>

      <section id="maintenance">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Maintenance & Pit Operations</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          A reliable robot wins more matches than a "better" robot that breaks. Build maintenance
          into your team culture from the start.
        </p>

        <CollapsibleSection title="Pre-Match Checklist" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Check all bolts and fasteners -- vibration loosens everything. Use Loctite on critical joints.',
              'Inspect belt/chain tension (1/4" deflection with moderate finger pressure).',
              'Verify all electrical connections -- tug-test Anderson and Wago connectors.',
              'Check battery voltage (12.5V+ for competition). Swap to freshly charged.',
              'Inspect bumpers for damage. Repair tears before queuing.',
              'Run quick function test: drive, intake, score, climb.',
              'Verify correct autonomous routine selection on dashboard.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Competition Pit Supplies">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { cat: 'Tools', items: 'Hex keys, wrenches, pliers, wire strippers, zip ties, electrical tape' },
              { cat: 'Fasteners', items: 'Spare bolts (10-32, 1/4-20), nuts, washers, rivets' },
              { cat: 'Electrical', items: 'Spare wire, connectors, fuses, motor controllers' },
              { cat: 'Mechanical', items: 'Spare motors, wheels, belts, chains, bearings' },
              { cat: 'Batteries', items: '4-6 batteries, charger, battery beak tester' },
              { cat: 'Misc', items: 'Loctite (blue), super glue, duct tape, pool noodles' },
            ].map((item) => (
              <div key={item.cat} className="bg-steel-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-steel-800">{item.cat}</p>
                <p className="text-xs text-steel-500 mt-1">{item.items}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'Maintenance and Triage - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=TsYSL9athTk',
          embedUrl: 'https://www.youtube.com/embed/TsYSL9athTk',
          description: 'How to maintain and troubleshoot your robot during competition'
        }} />
      </section>

      <section id="mechanical-quiz">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Knowledge Check</h2>
        <QuizBlock
          sectionId="mechanical"
          questions={[
            {
              question: 'What drivetrain type is recommended for a first-year FRC team?',
              options: ['Swerve drive', '6-wheel West Coast Drive / KitBot', 'Mecanum drive', 'Tank treads'],
              correctIndex: 1,
              explanation: 'A 6-wheel WCD or KitBot is simple, reliable, and well-documented for new teams.',
            },
            {
              question: 'What is the purpose of gear reduction in FRC?',
              options: ['Makes the robot lighter', 'Trades speed for torque to match mechanism needs', 'Reduces battery usage', 'Makes wiring simpler'],
              correctIndex: 1,
              explanation: 'Gear ratios match motor output to mechanism requirements -- high reduction for torque, low for speed.',
            },
            {
              question: 'Which CAD platform is cloud-based and most popular in FRC?',
              options: ['SolidWorks', 'AutoCAD', 'Onshape', 'SketchUp'],
              correctIndex: 2,
              explanation: 'Onshape is cloud-based, free for education, runs on any OS, and has the MKCad parts library.',
            },
          ]}
        />
      </section>
    </div>
  );
}
