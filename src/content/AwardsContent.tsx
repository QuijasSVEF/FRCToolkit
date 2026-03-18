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
          embodies the mission of FIRST. Winning teams advance to Championship and can be inducted
          into the FIRST Hall of Fame.
        </p>
        <CollapsibleSection title="Impact Award Components" defaultOpen>
          <ul className="space-y-3 text-sm text-steel-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <strong>Written Essay:</strong> Describes team history, community outreach, STEM
                advocacy, and sustained impact. Submitted before events through FIRST Dashboard.
                The essay should demonstrate a narrative arc showing growth and sustained commitment.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <strong>Video Submission:</strong> Short video showcasing team impact. Follow
                FIRST guidelines on length and content. The video is optional but strongly recommended.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <strong>Presentation to Judges:</strong> Up to 7 minutes for a student-led presentation,
                followed by up to 5 minutes of judge Q&A. Only 3 pre-college students may present.
                One mentor may attend as a silent observer. Practice extensively.
              </div>
            </li>
          </ul>
        </CollapsibleSection>
        <CollapsibleSection title="What Makes a Strong Impact Award Submission">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Quantify your impact: number of students reached, events hosted, hours of outreach',
              'Show sustainability: how does the team ensure long-term success beyond current members?',
              'Demonstrate community partnerships: sponsors, schools, organizations you work with',
              'Highlight unique programs: what does your team do that others don\'t?',
              'Show growth over multiple years, not just one season',
              'Include student voice and student-driven initiatives',
              'Connect activities to FIRST\'s mission of inspiring young people in STEM',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
        <InfoBox variant="tip" title="Start Early">
          Impact Award preparation should begin in the off-season, not during build season.
          Track outreach activities, community impact numbers, and team history throughout the year.
        </InfoBox>
        <div className="mt-6">
          <VideoEmbed video={{
            title: 'Inventive Outreach and Your Team - Sarah Heimlich',
            url: 'https://www.youtube.com/watch?v=tw8kkre6hK4',
            embedUrl: 'https://www.youtube.com/embed/tw8kkre6hK4',
            description: 'Creative methods to engage team members in outreach activities -- key to Impact Award success'
          }} />
        </div>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'FIRST Impact Award Resources', url: 'https://www.firstinspires.org/resources/library/frc/fia-resources', type: 'link', description: 'Official guidelines, past winners, and submission resources' }} />
          <ResourceCard resource={{ title: 'FIRST Hall of Fame', url: 'https://www.firsthalloffame.org/', type: 'link', description: 'Past Championship Impact Award winners with essays and presentations' }} />
        </div>
      </section>

      <section id="engineering-inspiration">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Engineering Inspiration Award</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The Engineering Inspiration Award celebrates a team's outstanding success in advancing
          respect for and understanding of engineering within a team's school and community. Unlike
          the Impact Award, this award does not require a pre-event submission -- it is judged entirely
          at the event through pit visits and observed team behavior.
        </p>
        <CollapsibleSection title="How to Stand Out for Engineering Inspiration" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Demonstrate genuine enthusiasm for engineering among all team members',
              'Show how your team has inspired non-members to explore STEM fields',
              'Have evidence of school-wide or community-wide STEM impact',
              'Talk about mentoring younger teams (FLL, FTC) or running STEM workshops',
              'Show how your team has attracted diverse participants to engineering',
              'Be prepared to discuss how your outreach goes beyond the robotics program',
              'Keep a portfolio of outreach events, photos, and impact metrics accessible in your pit',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
        <InfoBox variant="info" title="Advancement">
          The Engineering Inspiration Award winner at a Regional or District Championship can earn
          a spot at the FIRST Championship, making it one of the few non-robot-performance awards
          that provides a Championship qualification.
        </InfoBox>
      </section>

      <section id="engineering-awards">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Engineering Awards</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Engineering awards are judged primarily in the pit area and during matches. Judges will
          visit your pit, ask questions, and evaluate your robot and team's engineering process.
        </p>
        <DataTable
          caption="Pit-Judged Engineering Awards"
          columns={[
            { key: 'award', header: 'Award', width: '25%' },
            { key: 'focus', header: 'What Judges Evaluate' },
            { key: 'tips', header: 'Preparation Tips' },
          ]}
          rows={[
            { award: 'Autonomous Award', focus: 'Consistent, reliable autonomous performance across matches', tips: 'Track autonomous success rates. Explain your localization and path planning approach.' },
            { award: 'Industrial Design', focus: 'Form and function, professional appearance, elegant engineering', tips: 'Clean CAD. Show iterative design process. Explain aesthetic choices.' },
            { award: 'Quality Award', focus: 'Craftsmanship, attention to detail, robust construction', tips: 'Show wire management, machining quality, and finish work. Explain QA processes.' },
            { award: 'Innovation in Control', focus: 'Innovative control systems, sensors, software approach', tips: 'Demonstrate novel sensor fusion, custom algorithms, or control innovations.' },
            { award: 'Creativity Award', focus: 'Creative problem-solving, inventive mechanisms', tips: 'Show unique mechanisms or unconventional approaches to game challenges.' },
          ]}
        />
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

      <section id="woodie-flowers">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Woodie Flowers Award</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The Woodie Flowers Award recognizes an outstanding mentor who leads, inspires, and empowers
          using the FIRST mission of transforming culture. Named after Dr. Woodie Flowers, a founding
          board member of FIRST, this award celebrates the exceptional mentors behind successful teams.
        </p>
        <CollapsibleSection title="Nomination Requirements" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Written by students, not other mentors or parents',
              'Submitted through the FIRST Dashboard before the deadline',
              'Should describe how the mentor embodies FIRST values',
              'Include specific examples of how the mentor inspired students',
              'Explain what makes this mentor unique in their approach',
              'Describe the mentor\'s impact beyond just the robotics program',
              'Only one nominee per team per event (Finalist level) and per team per season (Champion level)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
        <InfoBox variant="tip" title="For Students Writing Nominations">
          Focus on specific stories and moments that show your mentor's impact. "Mr. Smith stayed
          late every night" is less powerful than "When our drivetrain broke at 11pm before our first
          event, Mr. Smith calmly guided us through the redesign, making sure we understood every step
          rather than just fixing it himself." Specific, authentic stories resonate with judges.
        </InfoBox>
      </section>

      <section id="deans-list">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Dean's List Award</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The Dean's List Award recognizes outstanding student leaders who demonstrate leadership,
          dedication, and the embodiment of FIRST values. Named after FIRST founder Dean Kamen,
          this is one of the most prestigious individual student awards in FRC.
        </p>
        <CollapsibleSection title="Nomination Details" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Written by a mentor, not by the student or other students',
              'Each team may nominate up to two 10th or 11th grade students per season',
              'Students must be sophomores or juniors (returning the following year)',
              'Submission goes through the FIRST Dashboard before the deadline',
              'Nominees present to judges at their first event for a brief interview',
              'Semifinalists are selected at events; winners announced at Championship',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
        <CollapsibleSection title="What Makes a Strong Dean's List Nominee">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Demonstrated leadership beyond just a title -- how did they make the team better?',
              'Involvement in STEM outreach outside the FRC team',
              'Academic achievement combined with team contributions',
              'Ability to articulate FIRST values and personal growth',
              'Evidence of inspiring and mentoring other students',
              'Community service and involvement beyond robotics',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
        <InfoBox variant="info" title="Dean's List Interviews">
          At events, Dean's List nominees have a brief one-on-one interview with judges. Prepare
          the student to talk about their personal journey in FIRST, what they've learned, and how
          they've given back. Authenticity matters more than polish.
        </InfoBox>
      </section>

      <section id="safety-award">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Safety Award</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The Safety Award, sponsored by UL Solutions, recognizes the team that best demonstrates a
          culture of safety throughout their organization. Safety is not just about wearing PPE -- it's
          about creating an environment where every team member prioritizes safe practices.
        </p>
        <CollapsibleSection title="What UL Safety Advisors Evaluate" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Safety culture: do team members proactively follow safety practices without being reminded?',
              'Safety glasses worn by ALL visitors and team members in the pit at all times',
              'First aid kit readily accessible and stocked',
              'Battery spill kit available near charging station',
              'Safety Data Sheets (SDS) posted for chemicals and adhesives',
              'Robot de-energized properly before any work (main breaker off AND battery disconnected)',
              'Student Safety Captain actively engaged and leading safety efforts',
              'Clean, organized pit with clear paths for robot movement',
              'Proper tool storage and usage practices observed',
              'Team members can articulate safety procedures when asked',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
        <div className="mt-6">
          <VideoEmbed video={{
            title: '2024 Safety Animation Winner - Team 8',
            url: 'https://www.youtube.com/watch?v=liY1Hvhe5Y0',
            embedUrl: 'https://www.youtube.com/embed/liY1Hvhe5Y0',
            description: 'Award-winning safety animation demonstrating FRC safety culture'
          }} />
        </div>
        <InfoBox variant="tip" title="Safety as a Competitive Advantage">
          Teams eligible for any FRC award must demonstrate FIRST Core Values and a culture of
          safety. A strong safety program doesn't just help you win the Safety Award -- it can
          positively influence judges' perception of your team for every other award too.
        </InfoBox>
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
        <ResourceCard resource={{ title: 'FRC Awards', url: 'https://www.firstinspires.org/robotics/frc/awards', type: 'link', description: 'Complete award descriptions and criteria' }} />
        <ResourceCard resource={{ title: 'Submitted Awards Guide', url: 'https://www.firstinspires.org/resources/library/frc/submitted-awards', type: 'link', description: 'Guidelines for Impact, Woodie Flowers, and Dean\'s List submissions' }} />
        <ResourceCard resource={{ title: 'Award Submission Tips', url: 'https://www.firstinspires.org/resources/library/frc/award-tips', type: 'link', description: 'FAQ and best practices for award submissions' }} />
      </div>
    </div>
  );
}
