import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';
import CodeBlock from '../components/CodeBlock';

export default function ElectricalContent() {
  return (
    <div className="space-y-8">
      <section id="control-system">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Control System Overview</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The FRC control system centers on the roboRIO, an embedded controller that runs team code,
          controls hardware, and communicates with the driver station and field systems. The complete
          system includes power distribution, motor controllers, sensors, a radio, and the driver
          station laptop.
        </p>
        <div className="bg-white rounded-lg border border-steel-200 p-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Core Control System Components</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: 'roboRIO 2.0', desc: 'Main robot controller. Runs team code. Connects to motor controllers, sensors, and radio.' },
              { name: 'Power Distribution Hub (PDH) or PDP', desc: 'Distributes battery power to all devices with individual circuit protection.' },
              { name: 'VH-109 Robot Radio', desc: 'Wireless bridge connecting robot to driver station through field network.' },
              { name: 'Motor Controllers', desc: 'SPARK MAX, SPARK Flex, Talon FX, Victor SPX, etc. Control motor speed and direction.' },
              { name: '120A Main Breaker', desc: 'Primary overcurrent protection. Also serves as main power switch.' },
              { name: 'Robot Battery', desc: '12V 18Ah SLA battery. Single battery allowed on robot.' },
              { name: 'Pneumatics Hub (optional)', desc: 'Controls compressor and pneumatic solenoid valves if using pneumatics.' },
              { name: 'Driver Station Laptop', desc: 'Runs NI FRC Game Tools. Connects to radio wirelessly at events.' },
            ].map((item) => (
              <div key={item.name} className="bg-steel-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-steel-800">{item.name}</p>
                <p className="text-xs text-steel-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="power-distribution">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Power Distribution</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          A typical FRC power architecture flows from the battery through the main breaker to the
          power distribution board, which then provides protected branch circuits to every device
          on the robot. Wire sizing and breaker selection are inspection-critical.
        </p>
        <DataTable
          caption="Branch Circuit Protection & Wire Sizing (from 2026 Game Manual)"
          columns={[
            { key: 'protection', header: 'Circuit Protection', width: '25%' },
            { key: 'wire', header: 'Min Wire Size' },
            { key: 'use', header: 'Typical Use' },
          ]}
          rows={[
            { protection: '40A breaker/fuse', wire: '4 mm\u00B2 (12 AWG)', use: 'High-power motors (drive motors, large mechanisms)' },
            { protection: '30A breaker/fuse', wire: '2.5 mm\u00B2 (14 AWG)', use: 'Medium motors, compressor' },
            { protection: '20A breaker/fuse', wire: '1 mm\u00B2 (18 AWG)', use: 'Smaller motors, motor controllers with lower draw' },
            { protection: 'Main 120A breaker', wire: '16 mm\u00B2 (6 AWG)', use: 'Battery to main breaker to PD board' },
          ]}
        />
        <InfoBox variant="warning" title="Inspection Critical">
          These wire sizing and protection rules are checked at robot inspection. Undersized wires
          cause brownouts and resets under load. Incorrect breaker sizing fails inspection.
        </InfoBox>
      </section>

      <section id="wiring-diagram">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Wiring Diagram Walkthrough</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          This reference layout shows the typical power and data paths on an FRC robot.
          WPILib's Zero-to-Robot guide recommends building this on a test board first,
          before integrating onto the robot frame.
        </p>
        <CodeBlock language="Power Distribution (Reference Layout)" code={`POWER PATH (typical FRC robot)
==============================

[12V SLA Battery]
    |
    | (fully insulated terminals, secure mount)
    v
[120A Main Breaker]
    |
    | (6 AWG / 16mm\u00B2 minimum conductors)
    v
[Power Distribution Hub (PDH) or PDP]
    |
    |-- 40A --> Motor Controller (drive motor 1)
    |-- 40A --> Motor Controller (drive motor 2)
    |-- 40A --> Motor Controller (drive motor 3)
    |-- 40A --> Motor Controller (drive motor 4)
    |-- 30A --> Motor Controller (mechanism motor)
    |-- 30A --> Compressor / Pneumatics Hub
    |-- 20A --> Motor Controller (small motor)
    |-- Protected --> roboRIO (dedicated protected port)
    |-- Protected --> Radio power (per radio wiring rules)
    |

CONTROL & NETWORK
=================

[Driver Station Laptop]
    --ethernet--> [Field AP / Practice AP]
    ~~wireless~~
[VH-109 Robot Radio]
    |
    | ethernet
    v
[roboRIO 2.0]

CAN BUS
=======
roboRIO CAN_H/CAN_L --> Motor Controller 1 --> MC 2 --> MC 3 --> ... --> PDH (termination)

Note: CAN bus starts at roboRIO and ends at PD device
      Both endpoints have built-in 120\u03A9 termination resistors`} />
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Zero to Robot: Wiring', url: 'https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-1/basic-robot-wiring.html', type: 'link', description: 'Step-by-step wiring guide with photos' }} />
          <ResourceCard resource={{ title: 'REV PDH Wiring Guide', url: 'https://docs.revrobotics.com/ion-control/pdh/gs/wiring', type: 'link', description: 'Power Distribution Hub wiring' }} />
        </div>
      </section>

      <section id="motor-controllers">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Motor Controllers Comparison</h2>
        <DataTable
          caption="FRC Motor Controller Comparison"
          columns={[
            { key: 'controller', header: 'Controller', width: '18%' },
            { key: 'motors', header: 'Motor Type' },
            { key: 'interfaces', header: 'Interfaces' },
            { key: 'specs', header: 'Key Specs' },
            { key: 'notes', header: 'Mentor Notes' },
          ]}
          rows={[
            { controller: 'SPARK MAX', motors: 'Brushed & Brushless', interfaces: 'CAN, PWM, USB', specs: '5.5-24V input, 60A continuous, 100A surge', notes: 'Plan airflow for heat. Keep firmware up to date.' },
            { controller: 'SPARK Flex', motors: 'Brushless (dockable) & Brushed', interfaces: 'CAN, PWM, USB', specs: '6-24V input, 60A continuous, 100A surge', notes: 'Dockable form factor. Treat connector security as inspection item.' },
            { controller: 'Victor SPX', motors: 'Brushed DC', interfaces: 'CAN, PWM', specs: 'Brushed DC control', notes: 'Legacy hardware, still common. Standardize firmware across season.' },
            { controller: 'Talon SRX', motors: 'Brushed DC', interfaces: 'CAN, PWM', specs: 'Speed controller with brake/coast', notes: 'Older hardware. Validate compatibility with current rules.' },
            { controller: 'Talon FX (Falcon/Kraken)', motors: 'Integrated Brushless', interfaces: 'CAN (integrated)', specs: 'Integrated in motor. Encoder built-in.', notes: 'Reduces external wiring. CAN health is critical. Plan CAN spares.' },
          ]}
        />
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'SPARK MAX Overview', url: 'https://docs.revrobotics.com/brushless/spark-max/overview', type: 'link' }} />
          <ResourceCard resource={{ title: 'SPARK Flex Overview', url: 'https://docs.revrobotics.com/brushless/spark-flex/overview', type: 'link' }} />
          <ResourceCard resource={{ title: 'CTRE Product Documentation', url: 'https://store.ctr-electronics.com/products/kraken-x60', type: 'link' }} />
        </div>
      </section>

      <section id="can-bus">
        <h2 className="text-xl font-bold text-steel-900 mb-4">CAN Bus Wiring</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          CAN (Controller Area Network) is the primary data bus for FRC robots. It connects the
          roboRIO to motor controllers, power distribution, and other CAN devices in a daisy-chain
          topology.
        </p>
        <CollapsibleSection title="CAN Bus Best Practices" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Start the CAN bus at the roboRIO CAN terminals',
              'Daisy-chain through each device (CAN_H to CAN_H, CAN_L to CAN_L)',
              'End the bus at the power distribution device (built-in 120\u03A9 termination)',
              'Use twisted pair wire for CAN connections when possible',
              'Keep CAN wires away from high-current motor wires to reduce noise',
              'Assign unique CAN device IDs to every device before wiring',
              'Use secure connectors -- loose CAN connections cause intermittent failures',
              'Monitor CAN bus utilization in software; keep below 70%',
              'The game manual allows a USB-to-CAN adapter (CANivore) for additional CAN buses',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'WPILib CAN Wiring Basics', url: 'https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/can-wiring-basics.html', type: 'link', description: 'Official CAN wiring guide' }} />
        </div>
      </section>

      <section id="radio-setup">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Radio Configuration</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The VH-109 wireless bridge connects the robot to the driver station. It must be mounted
          with visible LEDs and powered according to specific rules. WPILib provides a radio
          programming guide, and Vivid-Hosting documents wiring requirements.
        </p>
        <InfoBox variant="warning" title="Radio Power Warning">
          Vivid-Hosting documentation warns against unsafe power combinations that can damage the
          radio power module or downstream devices. Follow the official wiring guide exactly.
        </InfoBox>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Radio Programming Guide', url: 'https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-3/radio-programming.html', type: 'link', description: 'VH-109 setup instructions' }} />
          <ResourceCard resource={{ title: 'Radio Wiring Guide', url: 'https://frc-radio.vivid-hosting.net/overview/wiring-your-radio', type: 'link', description: 'Vivid-Hosting official wiring docs' }} />
          <ResourceCard resource={{ title: 'Radio Firmware Releases', url: 'https://frc-radio.vivid-hosting.net/overview/firmware-releases', type: 'link', description: 'Latest firmware and release notes' }} />
        </div>
      </section>

      <section id="batteries">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Battery Management</h2>
        <DataTable
          caption="Common FRC Legal Batteries"
          columns={[
            { key: 'model', header: 'Model', width: '25%' },
            { key: 'voltage', header: 'Voltage' },
            { key: 'capacity', header: 'Capacity' },
            { key: 'notes', header: 'Notes' },
          ]}
          rows={[
            { model: 'MK ES17-12', voltage: '12V', capacity: '18Ah', notes: 'Common FRC battery. Follow insulation and mounting rules.' },
            { model: 'EnerSys NP18-12', voltage: '12V', capacity: '~17.2Ah', notes: 'Listed by FIRST as example legal battery.' },
            { model: 'Power Sonic PS-12180', voltage: '12V', capacity: '18Ah', notes: 'Reliable alternative. Check charge practices.' },
            { model: 'Universal UB12180', voltage: '12V', capacity: '18Ah', notes: 'Verify terminal type matches team cables.' },
          ]}
        />
        <CollapsibleSection title="Battery Best Practices">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Own 4-6 batteries and rotate them through matches',
              'Label each battery with an ID number and track charge cycles',
              'Use a battery beak or similar tool to test internal resistance before events',
              'Charge at 6A max average as required by FIRST rules',
              'Set up a dedicated charging station with physical separation from the robot',
              'Use Anderson SB connectors on all chargers (required by rules)',
              'Store batteries upright in a cool, dry location',
              'Retire batteries showing voltage drop, swelling, or damage',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'WPILib Battery Guide', url: 'https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/robot-battery.html', type: 'link', description: 'Robot battery best practices' }} />
          <ResourceCard resource={{ title: 'MK ES17-12 Datasheet', url: 'https://www.mkbattery.com/application/files/6817/5105/7491/ES17-12.pdf', type: 'pdf', description: 'Battery specifications' }} />
        </div>
      </section>
    </div>
  );
}
