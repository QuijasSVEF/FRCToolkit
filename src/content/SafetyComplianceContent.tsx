import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import CollapsibleSection from '../components/CollapsibleSection';

export default function SafetyComplianceContent() {
  return (
    <div className="space-y-8">
      <section id="youth-protection">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Youth Protection Program</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST maintains a Youth Protection Program (YPP) with policies, training, screening
          procedures, and reporting options. Both Youth Protection Training and Youth Protection
          Screening/Clearance are required -- they are separate processes.
        </p>
        <InfoBox variant="warning" title="Required for All Mentors">
          Lead Coach 1 and Lead Coach 2 must complete Youth Protection Screening, which includes
          background checks. This is a recurring requirement. All mentors should complete Youth
          Protection Training regardless of their role.
        </InfoBox>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Youth Protection Program', url: 'https://www.firstinspires.org/programs/youth-protection-program', type: 'link', description: 'Policies, training, and screening info' }} />
          <ResourceCard resource={{ title: 'Youth Protection Training', url: 'https://training.firstinspires.org/courses/youth-protection', type: 'link', description: 'Online training course' }} />
        </div>
      </section>

      <section id="workshop-safety">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Workshop Safety</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST's safety manual frames safety as a shared responsibility. Mentors lead by example
          and provide guidance on safety practices, PPE, hazard reduction, and chemical safety
          data sheets. The safety manual also promotes student safety captains.
        </p>
        <CollapsibleSection title="Workshop Safety Checklist" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Post emergency contact numbers and evacuation routes',
              'Maintain first aid kit in an accessible, marked location',
              'Ensure fire extinguisher is inspected and accessible',
              'Post Safety Data Sheets (SDS) for all chemicals, batteries, adhesives',
              'Label hazardous materials storage areas clearly',
              'Install adequate ventilation for soldering, painting, adhesives',
              'Mark tool-specific safety zones on the floor',
              'Ensure adequate lighting at all workstations',
              'Establish a "buddy system" for power tool use',
              'Create a sign-in/sign-out system for all team members',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </section>

      <section id="ppe-requirements">
        <h2 className="text-xl font-bold text-steel-900 mb-4">PPE Requirements</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The 2026 game manual requires safety glasses in pits and around the field, closed-toe
          and closed-heel shoes, and tied-back long hair for robot work. Event staff hold final
          authority for safety issues.
        </p>
        <div className="bg-white rounded-lg border border-steel-200 p-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Required PPE by Activity</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { activity: 'Pit area & near field', ppe: 'ANSI Z87.1 safety glasses, closed-toe shoes' },
              { activity: 'Power tool operation', ppe: 'Safety glasses, hearing protection, gloves as needed' },
              { activity: 'Soldering & wiring', ppe: 'Safety glasses, fume extraction or ventilation' },
              { activity: 'Battery handling', ppe: 'Safety glasses, chemical-resistant gloves' },
              { activity: 'Grinding/cutting metal', ppe: 'Face shield, safety glasses, leather gloves' },
              { activity: 'Spray painting', ppe: 'Respirator, safety glasses, ventilated area' },
            ].map((item) => (
              <div key={item.activity} className="bg-steel-50 rounded-lg p-3">
                <p className="text-xs font-medium text-steel-800">{item.activity}</p>
                <p className="text-xs text-steel-500 mt-1">{item.ppe}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="battery-safety">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Battery Safety</h2>
        <InfoBox variant="warning" title="High Energy Hazard">
          FRC robot batteries (12V 18Ah SLA) are capable of brief high currents and high-energy
          arcing. Insulation, secure mounting, and safe handling practices are critical.
        </InfoBox>
        <div className="mt-4 space-y-3">
          <CollapsibleSection title="Battery Handling Rules" defaultOpen>
            <ul className="space-y-2 text-sm text-steel-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-danger-500 rounded-full mt-1.5 flex-shrink-0" />
                All battery terminals must be fully insulated when not connected
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-danger-500 rounded-full mt-1.5 flex-shrink-0" />
                Battery must be securely mounted to prevent dislodging during match play
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-danger-500 rounded-full mt-1.5 flex-shrink-0" />
                Only one legal battery allowed on the robot at a time
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-danger-500 rounded-full mt-1.5 flex-shrink-0" />
                Chargers must use matching Anderson SB connectors
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-danger-500 rounded-full mt-1.5 flex-shrink-0" />
                Average charge current limited to 6A per FIRST rules
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-danger-500 rounded-full mt-1.5 flex-shrink-0" />
                Never obstruct battery vents during charging
              </li>
            </ul>
          </CollapsibleSection>
        </div>
      </section>

      <section id="pneumatics-safety">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Pneumatics Safety</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Pneumatic systems store energy under pressure. FIRST guidance requires venting to atmosphere
          and verifying gauges read zero before any work on pneumatic components. The inspection
          checklist specifies stored pressure limits, working pressure limits, vent plug requirements,
          and relief valve settings.
        </p>
        <CollapsibleSection title="Pneumatics Safety Procedures">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Always vent all pressure before working on pneumatic components',
              'Verify both gauges read zero before touching fittings',
              'Use thread sealant (not thread tape) on all NPT connections',
              'Perform a leak test after any pneumatic work',
              'Set relief valve per game manual specifications',
              'If pressure begins exceeding the relief setting, shut down immediately',
              'Inspect all tubing for kinks, abrasion, and secure connections',
              'Keep hands and face away from pressurized fittings during testing',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </section>

      <section id="event-safety">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Event Safety Rules</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          At events, FIRST enforces strict safety requirements. De-energize the robot before any work:
          open the main breaker and unplug the battery. Event staff have final authority on all safety issues.
        </p>
        <InfoBox variant="info" title="De-Energize Before Work">
          FIRST advises opening the main breaker AND unplugging the battery before performing any
          work on the robot. This includes stored energy in pneumatic systems and mechanisms under spring tension.
        </InfoBox>
      </section>

      <div className="grid gap-2">
        <ResourceCard resource={{ title: 'FIRST Safety Manual', url: 'https://www.firstinspires.org/resources/library/safety', type: 'pdf', description: 'Comprehensive safety framework' }} />
        <ResourceCard resource={{ title: '2026 Inspection Checklist', url: 'https://firstfrc.blob.core.windows.net/frc2026/Manual/2026FRCInspectionChecklist.pdf', type: 'pdf', description: 'What inspectors check at events' }} />
        <ResourceCard resource={{ title: 'Pneumatics Manual', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/pneumatics-manual.pdf', type: 'pdf', description: 'Pneumatics rules and best practices' }} />
      </div>
    </div>
  );
}
