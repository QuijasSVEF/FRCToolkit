import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';
import VideoEmbed from '../components/VideoEmbed';

export default function FirstCompetitionContent() {
  return (
    <div className="space-y-8">
      <section id="what-to-expect">
        <h2 className="text-xl font-bold text-steel-900 mb-4">What to Expect</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          An FRC event is a multi-day competition that brings together dozens of teams in a high-energy,
          festival-like atmosphere. Understanding the structure ahead of time will help your team make
          the most of the experience and avoid common first-event mistakes.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          Events typically begin with a load-in and setup day, where teams transport their robot and
          pit supplies into the venue, set up their pit workspace, and go through robot inspection.
          For regional events, load-in is usually Thursday evening or early Friday morning, with
          competition running Friday and Saturday. District events are shorter, often with setup on
          Friday morning and competition running through Saturday.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          Once the event begins, the schedule follows a structured progression: practice matches give
          teams a chance to test their robot on the actual field, followed by qualification matches
          where every team plays a set number of randomly assigned matches to earn a ranking. After
          qualifications, the top eight ranked teams select alliance partners in alliance selection,
          forming three-team alliances that compete in a bracket-style playoff tournament. The event
          concludes with an awards ceremony celebrating excellence in engineering, outreach, and
          community impact.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          The venue is divided into two main areas. The pits area is your team's home base -- a
          designated space where you store, maintain, and repair your robot between matches. The
          field is where matches happen, surrounded by stands full of cheering teams. Expect the
          atmosphere to be loud, exciting, and occasionally overwhelming. Music blasts between
          matches, emcees keep the energy high, and the stands are a sea of team colors and costumes.
        </p>
        <InfoBox variant="tip" title="First-Event Tip">
          Arrive early. The teams that set up their pit first and pass inspection first get the most
          practice match time.
        </InfoBox>
        <div className="mt-6">
          <VideoEmbed video={{
            title: '2026 REBUILT Game Animation',
            url: 'https://www.youtube.com/watch?v=_fybREErgyM',
            embedUrl: 'https://www.youtube.com/embed/_fybREErgyM',
            description: 'Watch the official game animation to understand match structure and scoring'
          }} />
        </div>
      </section>

      <section id="pit-setup">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Pit Setup & Organization</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Your pit is your team's workspace, repair shop, and public face for the entire event. FRC
          pit spaces are typically 10x10 feet, which means every square inch counts. A well-organized
          pit allows your team to make repairs quickly between matches, impress judges who visit, and
          maintain a professional image that reflects well on your sponsors and school.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          Plan your layout before you arrive. Position your robot in the center or toward the back of
          the pit so your drive team can easily roll it out to the field. Keep tools organized on a
          pegboard, in labeled bins, or on a portable tool cart. Designate a charging station for
          batteries away from foot traffic. Leave space near the front for your banner, sponsor logos,
          and a small area where judges and visitors can stand while talking to students.
        </p>

        <DataTable
          columns={[
            { key: 'category', header: 'Category', width: '25%' },
            { key: 'items', header: 'Essential Items' },
          ]}
          rows={[
            { category: 'Tool Kit', items: 'Hex keys (SAE and metric), wrenches, pliers, wire strippers, crimpers, zip ties, electrical tape, Loctite' },
            { category: 'Spare Parts', items: 'Extra motors, motor controllers, wheels, gears, belts, fasteners, bumper materials' },
            { category: 'Batteries', items: '4-6 fully charged batteries, chargers, Battery Beak for testing voltage and internal resistance' },
            { category: 'Electronics Spares', items: 'Extra wires, Anderson connectors, fuses, PWM cables' },
            { category: 'Programming', items: 'Laptop with development environment, USB cables, ethernet cable, spare radio' },
            { category: 'Safety Equipment', items: 'Safety glasses for ALL pit visitors, first aid kit' },
            { category: 'Pit Decor', items: 'Team banner, signage, sponsor logos' },
            { category: 'Sustenance', items: 'Snacks, water bottles, and quick energy food for the team' },
          ]}
          caption="Essential Pit Supplies"
        />

        <div className="mt-4">
          <InfoBox variant="warning" title="Judges Visit Your Pit">
            Keep your pit organized, professional, and ready for questions at any time. Judges evaluate
            your team's engineering process, teamwork, and communication during pit visits, and their
            impressions directly influence award decisions.
          </InfoBox>
        </div>
      </section>

      <section id="robot-inspection">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Robot Inspection</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Before your robot can compete in any matches, it must pass inspection by trained volunteer
          inspectors. The inspection process verifies that your robot complies with all rules in the
          game manual, ensuring safety and fair play for every team on the field.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          Inspection happens in stages. First, your robot is weighed and measured to confirm it meets
          size and weight limits. Inspectors then review your electrical system, checking wiring gauge,
          breaker ratings, battery mounting, and overall wiring quality. They verify your bumpers meet
          height, coverage, and color requirements, and that your team number is displayed at the
          correct size. Pneumatic systems are checked for proper pressure relief and plumbing. Finally,
          inspectors do an overall safety review, looking for sharp edges, pinch points, and anything
          that could be hazardous during a match.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          If your robot fails any part of inspection, don't panic. Inspectors will clearly explain what
          needs to be fixed, and you can return for re-inspection as many times as needed. The goal is
          to help every team get on the field safely.
        </p>

        <div className="bg-white rounded-lg border border-steel-200 p-4 mb-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Common First-Time Inspection Failures</h3>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Bumpers at the wrong height -- must be within the bumper zone specified in the game manual
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Bumper numbers not the correct size or color -- numbers must be at least 4 inches tall, white on blue or red
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Robot exceeds the weight limit -- weigh your robot with bumpers and battery before leaving the shop
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Wiring gauge too small for the circuit -- verify wire gauge matches breaker ratings per the rules
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Loose battery mount -- the battery must be secured so it cannot move during impacts
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Missing or inaccessible main breaker -- the main breaker must be clearly labeled and easy to reach
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Pneumatics relief valve not set correctly -- the working pressure must not exceed the allowed limit
            </li>
          </ul>
        </div>

        <CollapsibleSection title="Pre-Inspection Self-Check" defaultOpen={false}>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Verify robot weight with bumpers and battery is under the limit
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Confirm robot fits within the frame perimeter and starting configuration dimensions
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Check bumper height, coverage, and reversibility (red and blue)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Verify team numbers are at least 4 inches tall on all bumper sides
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Confirm all wiring uses correct gauge for each breaker slot
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Test that the main breaker is accessible and clearly labeled
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Ensure battery is securely mounted and connector is properly insulated
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Check pneumatic system pressure relief valve and working pressure
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Verify no sharp edges or pinch points that could injure a person
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Confirm radio is properly mounted and powered through the correct path
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Test robot E-stop functionality
            </li>
          </ul>
        </CollapsibleSection>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{
            title: '2026 FRC Inspection Checklist',
            url: 'https://firstfrc.blob.core.windows.net/frc2026/Manual/2026FRCInspectionChecklist.pdf',
            type: 'pdf',
            description: 'Official inspection checklist -- review this before your event',
          }} />
        </div>
      </section>

      <section id="match-day-flow">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Match Day Flow</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Once qualification matches begin, your team enters a rhythm of preparation, queuing,
          competing, and post-match analysis. Understanding this flow will help your team stay
          organized and make the most of every match opportunity.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          The match schedule is posted in advance, listing the time and alliance assignments for every
          qualification match. Your team will be randomly assigned to either the red or blue alliance
          alongside two other teams for each match. The drive team -- typically the driver, operator,
          human player, and coach -- should begin preparing and heading to the queue line two to three
          matches before their scheduled match. Queuing volunteers will guide teams from the queue to
          the field.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          Each match has three phases. The autonomous period lasts 15 seconds, during which the robot
          operates entirely on pre-programmed instructions with no driver input. This is followed by
          the teleoperated (teleop) period lasting 2 minutes and 15 seconds, where drivers take
          control and work with their alliance partners to score points. The final portion of teleop
          is the endgame, where teams attempt end-of-match objectives for bonus points. After the
          match, the drive team returns to the pit, debriefs on what happened, and the pit crew
          prepares the robot for the next match.
        </p>
        <InfoBox variant="info" title="Match Cadence">
          At most events, your team plays 8-12 qualification matches spread across 1-2 days. You
          might have 30-60 minutes between matches -- use that time wisely for repairs, battery
          swaps, strategy discussions, and scouting other teams.
        </InfoBox>
      </section>

      <section id="alliance-selection-playoffs">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Alliance Selection & Playoffs</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          After all qualification matches are complete, the competition shifts to alliance selection
          and playoff brackets. This is one of the most exciting and strategic parts of an FRC event.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          The top eight ranked teams after qualifications become alliance captains. Starting with the
          first-ranked team, each captain invites another team to join their alliance. The invited
          team can accept or decline. This process continues in a serpentine order until each alliance
          has three teams. The result is eight alliances of three robots each, which then compete in a
          bracket-style playoff tournament.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          Preparation for alliance selection starts long before it happens. Smart teams maintain a
          pick list -- a ranked list of teams they would want as alliance partners based on scouting
          data, robot capabilities, and match performance. Even if your team is not a captain, being
          a desirable pick means playing well, being reliable, and communicating with potential
          alliance partners throughout the event.
        </p>
        <p className="text-steel-600 leading-relaxed mb-4">
          Playoff matches are played as best-of-three series in a single-elimination bracket. The
          intensity ramps up significantly, and alliance communication becomes critical. Teams that
          coordinate strategy, assign roles clearly, and adapt between matches tend to succeed in
          playoffs.
        </p>
        <InfoBox variant="success">
          Don't be discouraged if you're not picked in your first event. Many successful teams
          weren't picked in their rookie year. Focus on learning and improving -- build a robot
          that works reliably, scout other teams carefully, and demonstrate that you're a team
          others would want to partner with.
        </InfoBox>
      </section>

      <section id="packing-checklist">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Packing Checklist</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Forgetting a critical item at an event can cost your team valuable practice and match time.
          Use this comprehensive checklist to make sure your team is fully prepared before leaving for
          the venue.
        </p>

        <div className="bg-white rounded-lg border border-steel-200 p-4 mb-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Robot & Parts</h3>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Robot (secured for transport)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Bumpers (both red and blue sets)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              4-6 fully charged batteries with chargers and Battery Beak
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Spare motors, motor controllers, and gearboxes
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Spare wheels, treads, belts, chains, and gears
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Extra fasteners (bolts, nuts, rivets, zip ties)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Spare electronics (wires, Anderson connectors, fuses, PWM cables, spare radio)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Pneumatics spares (tubing, fittings, solenoids) if applicable
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-steel-200 p-4 mb-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Pit Supplies</h3>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Complete tool kit (hex keys, wrenches, pliers, screwdrivers, wire strippers, crimpers)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Power strip and extension cords
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Zip ties, electrical tape, duct tape, Loctite, and adhesives
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Safety glasses (enough for every team member and pit visitor)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              First aid kit
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Team banner, signage, and sponsor logos for pit decoration
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Folding table or shelving for organization
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Trash bags and cleaning supplies
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-steel-200 p-4 mb-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Documents</h3>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Printed copy of the game manual and inspection checklist
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Team roster with emergency contacts
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Permission slips and medical forms for all students
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Award submissions and engineering notebook/portfolio
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Scouting sheets or tablets for match scouting
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Robot wiring diagram and code documentation
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-steel-200 p-4 mb-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Personal Items</h3>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Comfortable closed-toe shoes for all team members
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Team shirts or uniforms
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Water bottles and snacks (venue food is expensive)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Phone chargers and portable batteries
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Ear protection (events are loud)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Giveaway buttons, stickers, or pins for trading with other teams
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-steel-200 p-4 mb-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Drive Team</h3>
          <ul className="space-y-2 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Driver station laptop with latest FRC Driver Station software
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Joysticks, controllers, and USB cables (plus spares)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Ethernet cable for connecting to the field
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Match strategy notes and alliance communication plan
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              Safety glasses for all drive team members (required on the field)
            </li>
          </ul>
        </div>

        <div className="grid gap-2">
          <ResourceCard resource={{
            title: '2026 FRC Events List',
            url: 'https://frc-events.firstinspires.org/2026/Events/EventList',
            type: 'link',
            description: 'Find your regional or district event schedule',
          }} />
        </div>
      </section>
    </div>
  );
}
