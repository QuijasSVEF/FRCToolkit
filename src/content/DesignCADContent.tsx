import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import CollapsibleSection from '../components/CollapsibleSection';
import VideoEmbed from '../components/VideoEmbed';
import QuizBlock from '../components/QuizBlock';

export default function DesignCADContent() {
  return (
    <div className="space-y-8">
      <section id="design-process">
        <h2 className="text-xl font-bold text-steel-900 mb-4">The FRC Design Process</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Robot design in FRC is a time-constrained engineering challenge. You have 6-8 weeks
          to analyze a game, brainstorm, prototype, CAD, fabricate, assemble, and test.
          Teams that follow a structured process consistently produce better robots.
        </p>

        <CollapsibleSection title="Design Process Timeline" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li><strong>Day 1-3: Game Analysis</strong> -- Break down scoring, penalties, and strategy priorities.</li>
            <li><strong>Day 3-5: Concept Generation</strong> -- Brainstorm multiple mechanism ideas. Sketch on whiteboards.</li>
            <li><strong>Day 4-7: Prototyping</strong> -- Build quick physical prototypes of 2-3 promising concepts.</li>
            <li><strong>Day 5-7: Design Decisions</strong> -- Evaluate prototypes (reliability, buildability, performance).</li>
            <li><strong>Day 7-14: Detailed CAD</strong> -- Model the full robot. Check interference, weight, frame perimeter.</li>
            <li><strong>Day 10-14: Design Review</strong> -- Can we build this? Can we fix it at competition?</li>
            <li><strong>Day 14+: Fabrication</strong> -- Generate drawings, create BOM, begin manufacturing.</li>
          </ol>
        </CollapsibleSection>

        <InfoBox variant="tip" title="Parallel Workstreams">
          Start drivetrain fabrication immediately (day 1-3) using a known design while game
          mechanism design is in progress. This gives programming a platform to start early.
        </InfoBox>

        <VideoEmbed video={{
          title: 'Overview of FRC Robots - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=86NCQfrjNr0',
          embedUrl: 'https://www.youtube.com/embed/86NCQfrjNr0',
          description: 'Comprehensive overview of FRC robot systems and design approaches'
        }} />
      </section>

      <section id="onshape-basics">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Onshape Fundamentals</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Onshape is the most popular FRC CAD tool -- cloud-based, free for education, and
          supports real-time collaboration. Despite similarities to other CAD software, its
          fundamentals are different. Do not skip the basics.
        </p>

        <CollapsibleSection title="Getting Started with Onshape" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Create free education account at onshape.com/edu</li>
            <li>Complete Onshape Learning Pathways (Part Modeling, Assemblies)</li>
            <li>Install MKCad app from Onshape App Store (essential FRC parts library)</li>
            <li>Learn key FeatureScripts: Tube Converter, Shaft Generator, Gusset Generator</li>
            <li>Work through FRC Design Learning Course (frcdesign.org) Stage 1 and 2</li>
            <li>Study open-source robot CAD from top teams</li>
          </ol>
        </CollapsibleSection>

        <CollapsibleSection title="Key Onshape Concepts">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Part Studios: Model individual or related parts. Multiple parts can share geometry.',
              'Assemblies: Put parts together using mates (Fastened, Revolute, Slider).',
              'Sketches: 2D profiles extruded into 3D. Fully constrain them (all black, no blue).',
              'Features: Operations that modify geometry (Extrude, Fillet, Boolean, Pattern).',
              'Versions: Snapshots of your design. Create versions before major changes.',
              'Branches: Parallel design experiments. Merge successful ones back to main.',
              'FeatureScripts: Community-created custom features that save enormous time.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'Intro to CAD (Onshape) - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=uEQ7OYWxQ_s',
          embedUrl: 'https://www.youtube.com/embed/uEQ7OYWxQ_s',
          description: 'Getting started with Onshape for FRC robot design'
        }} />

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Onshape Learning Center', url: 'https://learn.onshape.com/', type: 'link', description: 'Official tutorials and learning pathways' }} />
          <ResourceCard resource={{ title: 'FRC Design Learning Course', url: 'https://www.frcdesign.org/learning-course/', type: 'link', description: 'Complete FRC-specific Onshape course from beginner to full robot' }} />
          <ResourceCard resource={{ title: 'MKCad (FRC Parts Library)', url: 'https://appstore.onshape.com/apps/Manufacturers%20Models/2ZT7X5D646R3LM3ZND7LGBTYRZ4SVB6CMPZTA/description', type: 'tool', description: 'Thousands of FRC parts for Onshape' }} />
        </div>
      </section>

      <section id="frc-cad-organization">
        <h2 className="text-xl font-bold text-steel-900 mb-4">FRC CAD Organization</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          How you organize your CAD document matters. A well-organized document lets multiple
          students work simultaneously and makes modifications easy during crunch time.
        </p>

        <CollapsibleSection title="Recommended Document Structure" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'One main document per robot (not separate documents per mechanism)',
              'Separate Part Studios for each assembly: Drivetrain, Intake, Elevator, etc.',
              'Master Sketch: Define frame perimeter, bumper zone, extension limits',
              'Top-level Assembly: Source of truth for interference checks',
              'Use folders: /Drivetrain, /Superstructure, /Intake, /Electrical',
              'Name everything clearly: "Intake Roller Shaft" not "Part 7"',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Design Constraints to Model">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Frame Perimeter: Maximum size when retracted (check game manual)',
              'Extension Limits: Maximum reach beyond frame perimeter',
              'Height Limit: Usually different for starting config vs. during match',
              'Bumper Zone: Required height range for bumpers (typically 2-10")',
              'Weight Limit: Total including bumpers and battery (usually 125 lbs)',
              'Center of Gravity: Keep CG low and centered for stability',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'OnShape FRC Robot Organization - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=ilz_nPLf86U',
          embedUrl: 'https://www.youtube.com/embed/ilz_nPLf86U',
          description: 'How to organize your Onshape document for an FRC robot'
        }} />
      </section>

      <section id="mechanism-design">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Mechanism Design Patterns</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Most FRC mechanisms fall into common archetypes. Understanding these patterns and
          studying successful implementations accelerates your design work.
        </p>

        <CollapsibleSection title="Intakes" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Over-the-bumper: Rollers reaching over bumpers. Most common style.',
              'Slapdown/Deployable: Arm deploys outward then retracts. For wide pieces.',
              'Compression: Compliant wheels squeeze the game piece for grip.',
              'Vectoring: Angled wheels that grab AND center pieces simultaneously.',
              'Key metrics: ground-to-intake time, reliability %, stow speed.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Elevators">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Cascading (2-3 stage): Each stage extends relative to previous. Compact stowed.',
              'Continuous: Single stage extending directly. Simpler but taller starting height.',
              'Rigging: Dyneema rope with proper pulleys. Cascading needs specific patterns.',
              'Counterbalancing: Constant-force springs reduce motor load at position.',
              'Sensors: Absolute encoder for position. Limit switches for homing/safety.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Shooters & Climbers">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Dual flywheel: Two wheels at different speeds for spin control.',
              'Hood adjustment: Adjustable exit angle for different distances.',
              'Climber (Hook + Winch): Deploy hook, then winch robot up. Simple and reliable.',
              'Climber (Telescoping): Extend up, reach bar, retract to lift. Compact stowed.',
              'Ratchet: Prevents back-driving so robot stays up if motor loses power.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'Intakes - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=GoqsxlK5wyc',
          embedUrl: 'https://www.youtube.com/embed/GoqsxlK5wyc',
          description: 'Design principles for FRC intake mechanisms'
        }} />

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Spectrum Design Exploration Playlist', url: 'https://www.youtube.com/playlist?list=PLTocT0DivsNlAUEiq8xINu5YH4VjxNoL-', type: 'video', description: 'Video series exploring various FRC mechanism designs' }} />
        </div>
      </section>

      <section id="prototyping">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Prototyping</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Prototyping validates concepts fast. A 2-hour prototype can save days of CAD and
          fabrication on a design that would not work. Never skip prototyping.
        </p>

        <CollapsibleSection title="Prototyping Best Practices" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Use whatever is fastest: wood, cardboard, 3D prints, spare parts, zip ties.',
              'Focus on: "Does this concept work?" not "Is this beautiful?"',
              'Test with the actual game piece (or close approximation). Dimensions matter.',
              'Time your prototypes: is the action fast enough for competition?',
              'Record video of tests. Review with the whole team to decide.',
              'Test failure modes: misaligned piece? Missed approach?',
              'Iterate rapidly. If v1 fails, modify immediately.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <InfoBox variant="info" title="The Rule of 3 Prototypes">
          Test at least 2-3 different concepts before committing to a design. The first idea
          is rarely the best. Quick prototyping of multiple approaches leads to better final designs.
        </InfoBox>

        <VideoEmbed video={{
          title: 'FRC Prototyping - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=BA210KytrXM',
          embedUrl: 'https://www.youtube.com/embed/BA210KytrXM',
          description: 'How to effectively prototype FRC mechanisms quickly'
        }} />
      </section>

      <section id="engineering-drawings">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Engineering Drawings</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Engineering drawings communicate manufacturing intent. Essential when working with
          sponsors or outsourcing fabrication.
        </p>

        <CollapsibleSection title="Drawing Essentials" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Include all critical dimensions (hole locations, lengths, angles).',
              'Standard views: Front, Top, Right side. Add isometric for complex parts.',
              'Specify material, finish, and quantity on title block.',
              'Sheet metal: show flat pattern with bend lines and angles.',
              '3D prints: note orientation, infill, material requirements.',
              'Add tolerances only where they matter (bearing fits, shaft holes).',
              'Include BOM for assemblies with all parts and hardware.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'Understanding Engineering Drawings - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=NYxRrcumNW0',
          embedUrl: 'https://www.youtube.com/embed/NYxRrcumNW0',
          description: 'How to read and create engineering drawings for FRC'
        }} />
      </section>

      <section id="design-resources">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Design Resources & References</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Studying successful robots from past seasons is one of the best ways to learn FRC design.
        </p>
        <div className="grid gap-2">
          <ResourceCard resource={{ title: 'FRC Design Learning Course', url: 'https://www.frcdesign.org/learning-course/', type: 'link', description: 'Complete Onshape CAD course from zero to full robot' }} />
          <ResourceCard resource={{ title: 'Spectrum Training Curriculum', url: 'https://docs.google.com/document/u/1/d/e/2PACX-1vQk_ghFBN7682QI_17lbBCx8V_RXNomQRR7er-UIzlllsbdpO4RWOQAVnGFZAEypeNm2grS2G9oxFMp/pub', type: 'link', description: 'Team 3847 complete training curriculum' }} />
          <ResourceCard resource={{ title: 'Open Alliance Teams', url: 'https://www.chiefdelphi.com/tag/openalliance', type: 'link', description: 'Teams publicly documenting their design process' }} />
          <ResourceCard resource={{ title: 'CAD Design Challenges', url: 'https://docs.google.com/presentation/d/1Bt7f_LbTL2TUmVcYByCTg-wzmVIhjGJMydKG5Sft95A/', type: 'link', description: 'Practice CAD challenges for off-season skill building' }} />
          <ResourceCard resource={{ title: 'Team 254 Technical Resources', url: 'https://www.team254.com/resources/', type: 'link', description: 'Legendary FRC team documentation' }} />
          <ResourceCard resource={{ title: 'The Blue Alliance', url: 'https://www.thebluealliance.com/', type: 'tool', description: 'Match videos for studying robot performance' }} />
        </div>
      </section>

      <section id="design-quiz">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Knowledge Check</h2>
        <QuizBlock
          sectionId="design-cad"
          questions={[
            {
              question: 'What should you do BEFORE starting detailed CAD on a mechanism?',
              options: ['Order all parts', 'Build a quick prototype to validate the concept', 'Write programming code', 'Make engineering drawings'],
              correctIndex: 1,
              explanation: 'Prototyping validates that a concept works before investing time in detailed CAD.',
            },
            {
              question: 'In Onshape, what is MKCad?',
              options: ['A programming language', 'An FRC parts library with motors, gearboxes, and structural components', 'A simulation tool', 'A file format'],
              correctIndex: 1,
              explanation: 'MKCad provides thousands of pre-modeled FRC parts including motors, gearboxes, and structural components.',
            },
            {
              question: 'When multiple mechanism concepts seem viable, what should you do?',
              options: ['Pick the simplest without testing', 'Prototype 2-3 options and evaluate against criteria', 'Ask Chief Delphi', 'Go with mentor preference'],
              correctIndex: 1,
              explanation: 'Testing multiple prototypes against clear criteria leads to better design decisions.',
            },
          ]}
        />
      </section>
    </div>
  );
}
