import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';

export default function StrategyScoutingContent() {
  return (
    <div className="space-y-8">
      <section id="game-analysis">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Game Analysis</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Game analysis starts at Kickoff and continues through competition season. The goal is
          understanding the scoring model, ranking system, and strategic trade-offs to guide both
          robot design and match play decisions.
        </p>
        <CollapsibleSection title="Game Analysis Framework" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Read the game manual scoring section and calculate point values for every action</li>
            <li>Identify ranking point conditions -- these often drive strategic priorities</li>
            <li>Map out the action cycle: pick up game piece, travel, score, return</li>
            <li>Estimate cycle times for different scoring strategies</li>
            <li>Identify which actions are high-value and achievable for your team's capability</li>
            <li>Analyze defense rules and when defense becomes strategically valuable</li>
            <li>Determine endgame scoring requirements and how they affect total match strategy</li>
          </ol>
        </CollapsibleSection>
      </section>

      <section id="scouting-system">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Building a Scouting System</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Scouting collects data about other teams' robots to inform alliance selection and match
          strategy. Combine objective match data with subjective notes on failure modes and
          driver consistency.
        </p>
        <CollapsibleSection title="Scouting Workflow" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Define metrics from the game manual scoring model and match outcomes</li>
            <li>Create a standardized scouting form (paper or digital) with clear fields</li>
            <li>Assign scouts to specific robots in each match (typically 6 scouts per match)</li>
            <li>Collect data during qualification matches consistently</li>
            <li>Combine objective data (points scored, cycles completed) with subjective notes</li>
            <li>Build a pick list ranking teams by role synergy, reliability, and performance</li>
            <li>Rehearse match strategy communication between scouts and drive team</li>
          </ol>
        </CollapsibleSection>

        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {[
            { title: 'Quantitative Data', desc: 'Game pieces scored, cycles per match, auto routine success rate, endgame completion, fouls committed' },
            { title: 'Qualitative Data', desc: 'Driver skill, defensive capability, breakdown frequency, recovery speed, robot stability' },
            { title: 'Pit Scouting', desc: 'Drivetrain type, motor choices, autonomous capabilities, planned improvements, team confidence' },
            { title: 'Super Scouting', desc: 'Broader match observations like defense effectiveness, alliance coordination, and strategic choices' },
          ].map((item) => (
            <div key={item.title} className="bg-steel-50 rounded-lg p-4">
              <h4 className="font-semibold text-steel-800 text-sm">{item.title}</h4>
              <p className="text-xs text-steel-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'The Compass Alliance Scouting Pathway', url: 'https://www.thecompassalliance.org/', type: 'link', description: 'Scouting worksheets and guides' }} />
        </div>
      </section>

      <section id="data-sources">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Data Sources & APIs</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Several data sources supplement your team's scouting with historical and real-time data.
        </p>
        <DataTable
          caption="FRC Data Sources"
          columns={[
            { key: 'source', header: 'Source', width: '25%' },
            { key: 'type', header: 'Data Type' },
            { key: 'access', header: 'Access' },
          ]}
          rows={[
            { source: 'FIRST FRC Events API', type: 'Official event and team data, synced from FMS', access: 'API key required (free for teams)' },
            { source: 'The Blue Alliance', type: 'Community-maintained data, match results, OPR, team history', access: 'Free API with key. Web interface available.' },
            { source: 'Statbotics', type: 'Advanced statistical analysis, EPA ratings, predictions', access: 'Free web interface and API' },
            { source: 'Your Team\'s Scouting', type: 'Real-time match observations, pit data, qualitative notes', access: 'Internal to your team' },
          ]}
        />
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'FIRST FRC Events API', url: 'https://frc-api-docs.firstinspires.org/', type: 'tool', description: 'Official event data API' }} />
          <ResourceCard resource={{ title: 'The Blue Alliance API', url: 'https://www.thebluealliance.com/apidocs', type: 'tool', description: 'Community data API and analysis' }} />
          <ResourceCard resource={{ title: 'Statbotics', url: 'https://www.statbotics.io/', type: 'tool', description: 'Advanced FRC statistics' }} />
        </div>
      </section>

      <section id="match-strategy">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Match Strategy</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Match strategy adapts game analysis to specific match conditions. Before each match,
          the drive team and strategist should review alliance capabilities and opponent data.
        </p>
        <CollapsibleSection title="Pre-Match Strategy Checklist" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Review scouting data for all 6 robots in the match',
              'Identify your alliance\'s strongest scoring capabilities',
              'Assign autonomous starting positions to avoid conflicts',
              'Decide offensive vs defensive role assignments',
              'Identify opponent weaknesses to exploit',
              'Plan endgame coordination timing',
              'Communicate the plan clearly to all alliance partners',
              'Have a backup plan if autonomous fails or a robot breaks down',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </section>

      <section id="alliance-selection">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Alliance Selection</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Alliance selection happens after qualification matches. The top-ranked teams select
          alliance partners for playoffs. Your pick list should be ready before alliance selection begins.
        </p>
        <InfoBox variant="info" title="Pick List Strategy">
          Build your pick list around playoff roles: offensive scorer, defensive bot, and
          flexible support. Prioritize reliability over peak performance -- a robot that works
          every match is more valuable than one that scores high sometimes but breaks down.
        </InfoBox>
      </section>

      <section id="driver-practice">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Driver Practice & Controllers</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Driver skill is one of the highest-impact factors in match performance. Dedicate
          significant time to driver practice on a field-sized area.
        </p>
        <DataTable
          caption="Popular FRC Driver Controllers"
          columns={[
            { key: 'controller', header: 'Controller', width: '25%' },
            { key: 'strengths', header: 'Strengths' },
            { key: 'notes', header: 'FRC Software Notes' },
          ]}
          rows={[
            { controller: 'Logitech F310 (wired)', strengths: 'Low cost, wired reliability, XInput/DirectInput modes', notes: 'WPILib XboxController class works in XInput mode' },
            { controller: 'Xbox Controller (USB-C)', strengths: 'Ergonomic, consistent mapping, wired via USB-C', notes: 'WPILib XboxController class native support' },
            { controller: 'DualShock 4', strengths: 'Comfortable, touchpad for extra inputs', notes: 'WPILib PS4Controller class support' },
            { controller: 'Logitech Extreme 3D Pro', strengths: '12 buttons, 8-way hat, twist rudder', notes: 'WPILib generic Joystick class support' },
          ]}
        />
      </section>
    </div>
  );
}
