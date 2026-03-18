import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';
import VideoEmbed from '../components/VideoEmbed';

export default function AwardsContent() {
  return (
    <div className="space-y-8">
      <section id="award-overview">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Award Categories Overview</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FRC awards recognize excellence across engineering, community impact, teamwork, and
          individual contributions. Awards are presented at each event and at Championship.
          Many awards require advance submissions through the FIRST Dashboard.
        </p>
        <DataTable
          caption="Major FRC Award Categories"
          columns={[
            { key: 'award', header: 'Award', width: '25%' },
            { key: 'criteria', header: 'What Judges Look For' },
            { key: 'submission', header: 'Requires Submission?' },
          ]}
          rows={[
            { award: 'FIRST Impact Award', criteria: 'Community outreach impact, team sustainability, STEM advocacy. The "most prestigious" FRC award.', submission: 'Yes - essay, video, and presentation' },
            { award: 'Engineering Inspiration', criteria: 'Demonstrating outstanding success in advancing STEM education in the community', submission: 'No - judged at event' },
            { award: 'Autonomous Award', criteria: 'Consistent, reliable autonomous robot performance during matches', submission: 'No - judged during matches' },
            { award: 'Industrial Design', criteria: 'Form and function in robot design, professional appearance, elegant engineering', submission: 'No - judged in pits' },
            { award: 'Quality Award', criteria: 'Machine craftsmanship, attention to detail, robustness of construction', submission: 'No - judged in pits' },
            { award: 'Innovation in Control', criteria: 'Innovative control system design, sensor usage, or software approach', submission: 'No - judged in pits' },
            { award: 'Creativity Award', criteria: 'Creative approach to a challenge, inventive problem-solving', submission: 'No - judged in pits' },
            { award: 'Woodie Flowers Award', criteria: 'Outstanding mentor who leads, inspires, and empowers students', submission: 'Yes - student-written nomination' },
            { award: 'Dean\'s List', criteria: 'Outstanding student leader demonstrating FIRST values', submission: 'Yes - mentor-written nomination' },
            { award: 'Safety Award', criteria: 'Excellence in safety culture, awareness, and practices', submission: 'No - observed at event' },
          ]}
        />
      </section>

      <section id="impact-award">
        <h2 className="text-xl font-bold text-steel-900 mb-4">FIRST Impact Award</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The FIRST Impact Award (formerly Chairman's Award) is the most prestigious FRC award.
          It recognizes the team that best represents a model for other teams to emulate and best
          embodies the mission of FIRST. Winning teams advance to Championship.
        </p>
        <CollapsibleSection title="Impact Award Components" defaultOpen>
          <ul className="space-y-3 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <strong>Written Essay:</strong> Describes team history, community outreach, STEM
                advocacy, and sustained impact. Submitted before events through FIRST Dashboard.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <strong>Video Submission:</strong> Short video showcasing team impact. Follow
                FIRST guidelines on length and content.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <strong>Presentation to Judges:</strong> Student-led presentation at the event.
                Practice extensively. Judges will ask questions.
              </div>
            </li>
          </ul>
        </CollapsibleSection>
        <InfoBox variant="tip" title="Start Early">
          Impact Award preparation should begin in the off-season, not during build season.
          Track outreach activities, community impact numbers, and team history throughout the year.
        </InfoBox>
        <div className="mt-6">
          <VideoEmbed video={{
            title: 'FIRST Impact Award Tips & Examples',
            url: 'https://www.youtube.com/watch?v=5fjwCwg-3Hs',
            embedUrl: 'https://www.youtube.com/embed/5fjwCwg-3Hs',
            description: 'Guide to preparing a strong FIRST Impact Award submission'
          }} />
        </div>
      </section>

      <section id="engineering-awards">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Engineering Awards</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Engineering awards are judged primarily in the pit area and during matches. Judges will
          visit your pit, ask questions, and evaluate your robot and team's engineering process.
        </p>
        <CollapsibleSection title="How to Prepare for Pit Judging" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Prepare a clear, concise description of your robot\'s design and key features',
              'Have students ready to explain design decisions and trade-offs',
              'Maintain an engineering notebook or portfolio documenting the design process',
              'Keep your pit organized and professional-looking',
              'Be prepared to demonstrate mechanisms and explain control systems',
              'Practice answering questions about failures and how you solved problems',
              'Have CAD models or technical drawings accessible to show judges',
              'Train multiple students to present -- judges want to see team-wide knowledge',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </section>

      <section id="submission-tips">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Submission Tips & Timeline</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST publishes submission deadlines for each season. Major submitted awards include
          FIRST Impact Award, Woodie Flowers Award, FIRST Leadership Award, and Dean's List.
          Submissions go through the FIRST Dashboard.
        </p>
        <InfoBox variant="warning" title="Deadlines are Firm">
          Award submission deadlines are typically several weeks before your first event.
          Check the FIRST awards page early in the season for exact dates. Late submissions
          are not accepted.
        </InfoBox>
        <div className="bg-white rounded-lg border border-steel-200 p-4 mt-4">
          <h3 className="font-semibold text-steel-800 text-sm mb-3">Award Prep Timeline</h3>
          <div className="space-y-2 text-sm text-steel-600">
            {[
              { when: 'Off-Season', task: 'Track outreach activities. Start Impact Award essay draft. Identify Woodie Flowers and Dean\'s List candidates.' },
              { when: 'Sept - Nov', task: 'Refine essay drafts. Film Impact Award video footage. Write Woodie Flowers and Dean\'s List nominations.' },
              { when: 'Dec - Jan', task: 'Finalize essays. Edit video. Submit through FIRST Dashboard before deadlines.' },
              { when: 'Before Events', task: 'Practice judge presentations. Prepare pit displays and engineering portfolio.' },
            ].map((item) => (
              <div key={item.when} className="flex gap-3">
                <span className="text-xs font-semibold text-brand-600 w-20 flex-shrink-0">{item.when}</span>
                <span>{item.task}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="documentation">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Documentation Best Practices</h2>
        <CollapsibleSection title="Engineering Notebook Tips" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Document the design process, not just the final design',
              'Include sketches, prototyping photos, and test data',
              'Record design decisions with rationale (why this approach over alternatives)',
              'Log failures and how the team iterated to solve them',
              'Include timelines and project management artifacts',
              'Have students write entries -- judges want to see student voice',
              'Keep it organized chronologically or by subsystem',
              'Digital notebooks are fine -- use shared docs with photos and diagrams',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </section>

      <div className="grid gap-2">
        <ResourceCard resource={{ title: 'FRC Awards', url: 'https://www.firstinspires.org/resources/library/frc/awards', type: 'link', description: 'Complete award descriptions and criteria' }} />
      </div>
    </div>
  );
}
