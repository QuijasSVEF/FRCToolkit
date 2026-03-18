import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';
import VideoEmbed from '../components/VideoEmbed';

export default function MechanicalContent() {
  return (
    <div className="space-y-8">
      <section id="workspace-setup">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Workspace Setup</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          A well-organized workspace makes build season dramatically more productive and safer.
          WPILib recommends building a control system test board early, independent of the final
          robot chassis, so electrical and software teams can work in parallel.
        </p>
        <CollapsibleSection title="Essential Workshop Equipment" defaultOpen>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { cat: 'Power Tools', items: 'Drill press, band saw, jigsaw, angle grinder, impact driver' },
              { cat: 'Hand Tools', items: 'Wrenches, hex keys, pliers, wire strippers, crimpers, files, deburring tools' },
              { cat: 'Measurement', items: 'Calipers, tape measure, squares, levels, digital scale' },
              { cat: 'Fasteners Station', items: 'Organized bins of bolts, nuts, washers, standoffs, rivets, Loctite' },
              { cat: 'Electronics Bench', items: 'Multimeter, soldering station, heat shrink, wire, connectors, crimps' },
              { cat: 'Safety Equipment', items: 'Safety glasses (many), first aid kit, fire extinguisher, SDS binder' },
              { cat: 'Computing', items: 'Laptop/desktop for CAD, programming, driver station, and radio config' },
              { cat: 'Testing Area', items: 'Space to drive robot (minimum 8x16ft), spare field elements if possible' },
            ].map((item) => (
              <div key={item.cat} className="bg-steel-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-steel-800">{item.cat}</p>
                <p className="text-xs text-steel-500 mt-1">{item.items}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </section>

      <section id="drivetrain-options">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Drivetrain Options</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The drivetrain is the foundation of your robot. Choose based on your team's capability
          and available test time. For new teams, a kit-style 6-wheel (West Coast) drive is the
          standard recommendation.
        </p>
        <DataTable
          caption="Drivetrain Comparison"
          columns={[
            { key: 'type', header: 'Type', width: '20%' },
            { key: 'pros', header: 'Strengths' },
            { key: 'cons', header: 'Challenges' },
            { key: 'best', header: 'Best For' },
          ]}
          rows={[
            { type: '6-Wheel (WCD)', pros: 'Simple, reliable, strong pushing power, kit available', cons: 'No lateral movement, turning requires clearance', best: 'New teams, reliability-focused teams' },
            { type: 'Mecanum', pros: 'Omnidirectional movement, moderate complexity', cons: 'Lower traction, can be pushed around, heavier', best: 'Teams needing maneuverability with moderate experience' },
            { type: 'Swerve', pros: 'Full holonomic motion with high traction, very agile', cons: 'Complex, expensive, requires strong programming', best: 'Experienced teams with strong programming capacity' },
            { type: 'Tank Treads', pros: 'High traction, good for rough terrain games', cons: 'Heavy, maintenance-heavy, lower speed', best: 'Specific game situations requiring extreme traction' },
          ]}
        />
        <InfoBox variant="tip" title="New Team Recommendation">
          Start with a KitBot or 6-wheel drive base. Master it, compete with it, and consider
          more complex drivetrains in future seasons once your team has a solid programming and
          mechanical foundation.
        </InfoBox>
      </section>

      <section id="mechanisms">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Mechanisms & Actuators</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Beyond the drivetrain, game mechanisms manipulate game pieces. Common mechanism types
          include intakes (rollers, compliant wheels), elevators (cascading, continuous), arms
          (pivoting, multi-joint), and shooters (flywheels, catapults).
        </p>
        <CollapsibleSection title="Actuator Types and Rules" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <strong>Motors:</strong> FRC has a legal motor list each season. The inspection checklist
              enforces motor legality and propulsion motor count constraints. Check the game manual before buying.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <strong>Pneumatic Cylinders:</strong> Good for binary actions (open/close, extend/retract).
              Require a compressor, storage tank, and regulated pressure system with safety components.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <strong>Linear Actuators:</strong> Provide precise positioning but are slower than pneumatics.
              Useful for controlled, slow-speed operations.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <strong>Servos:</strong> Small, precise positioning for light-duty mechanisms like sensor
              mounts, camera gimbals, or small game piece manipulators.
            </li>
          </ul>
        </CollapsibleSection>
      </section>

      <section id="kitbot">
        <h2 className="text-xl font-bold text-steel-900 mb-4">KitBot Build Guide</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The KitBot is FIRST's reference robot design that uses Kit of Parts components. It provides
          a proven path to get a drivable robot quickly. KitBot instructions sequence parallel
          workstreams (drive base, mechanisms, bumpers, electronics and wiring) before integration.
        </p>
        <VideoEmbed video={{
          title: '2026 FRC KitBot Build Walkthrough',
          url: 'https://www.youtube.com/watch?v=d3it7-qxCkg',
          embedUrl: 'https://www.youtube.com/embed/d3it7-qxCkg',
          description: 'Official step-by-step 2026 KitBot build with Dee & Brian'
        }} />
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'KitBot Build Instructions (PDF)', url: 'https://firstfrc.blob.core.windows.net/frc2026/KitBot/2026-kitbot-build-instructions.pdf', type: 'pdf', description: 'Step-by-step assembly guide' }} />
          <ResourceCard resource={{ title: 'Kit of Parts Info', url: 'https://www.firstinspires.org/resources/library/frc/kit-of-parts', type: 'link', description: 'What comes in the Kit of Parts' }} />
          <ResourceCard resource={{ title: 'KitBot Resources', url: 'https://www.firstinspires.org/resources/library/frc/kitbot', type: 'link', description: 'Additional KitBot documentation' }} />
        </div>
      </section>

      <section id="cad-tools">
        <h2 className="text-xl font-bold text-steel-900 mb-4">CAD & Design Tools</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          CAD (Computer-Aided Design) is essential for designing and documenting robot mechanisms
          before fabrication. Most FRC teams use one of these tools:
        </p>
        <DataTable
          caption="Popular FRC CAD Tools"
          columns={[
            { key: 'tool', header: 'Tool', width: '25%' },
            { key: 'cost', header: 'Cost for Teams' },
            { key: 'notes', header: 'Notes' },
          ]}
          rows={[
            { tool: 'Onshape', cost: 'Free for education', notes: 'Cloud-based, collaboration-friendly, popular in FRC. Good for teams with mixed OS.' },
            { tool: 'SolidWorks', cost: 'Free via FRC sponsorship', notes: 'Industry standard. Requires installation. Steeper learning curve.' },
            { tool: 'Fusion 360', cost: 'Free for education', notes: 'Good for CAD + CAM workflows. Cloud features. Popular alternative.' },
            { tool: 'Inventor', cost: 'Free for education', notes: 'Autodesk alternative to SolidWorks. Used by some teams.' },
          ]}
        />
      </section>

      <section id="fabrication">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Fabrication Techniques</h2>
        <CollapsibleSection title="Common FRC Fabrication Methods" defaultOpen>
          <div className="space-y-3">
            {[
              { name: 'Aluminum Extrusion Assembly', desc: 'Cut, drill, and bolt aluminum extrusions (1x1, 1x2 box tube). The backbone of most FRC robots.' },
              { name: '3D Printing', desc: 'PLA/PETG for prototypes and brackets. Use adequate infill (50%+) and wall count for structural parts.' },
              { name: 'CNC Routing/Milling', desc: 'Precision flat parts from aluminum or polycarbonate plates. Requires CAM programming.' },
              { name: 'Sheet Metal', desc: 'Bending and cutting sheet aluminum or polycarbonate for guards, chutes, and structural panels.' },
              { name: 'Laser Cutting', desc: 'Fast, precise cutting of flat materials. Many teams use external services like SendCutSend.' },
              { name: 'Riveting', desc: 'Pop rivets are fast, permanent, and don\'t require access to both sides. Common for sheet metal assembly.' },
            ].map((item) => (
              <div key={item.name} className="bg-steel-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-steel-800">{item.name}</p>
                <p className="text-xs text-steel-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Everybot 2026 Resources', url: 'https://www.118everybot.org/2026-frc-resources', type: 'link', description: 'Team 118 Everybot build documentation for teams of all levels' }} />
          <ResourceCard resource={{ title: 'FIRST Technical Resources', url: 'https://www.firstinspires.org/resources/library/frc/technical-resources', type: 'link', description: 'Official wiring, pneumatics, and design videos' }} />
        </div>
      </section>
    </div>
  );
}
