import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';
import CodeBlock from '../components/CodeBlock';
import VideoEmbed from '../components/VideoEmbed';
import QuizBlock from '../components/QuizBlock';

export default function ProgrammingContent() {
  return (
    <div className="space-y-8">
      <section id="languages">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Language Choices</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          WPILib is the official library suite for FRC robot programming and is documented for
          Java, C++, and Python. Additional paths exist for LabVIEW. Most teams choose Java or
          C++ due to the strongest community support and documentation.
        </p>
        <DataTable
          caption="FRC Programming Language Comparison"
          columns={[
            { key: 'lang', header: 'Language', width: '15%' },
            { key: 'pros', header: 'Strengths' },
            { key: 'cons', header: 'Challenges' },
            { key: 'best', header: 'Best For' },
          ]}
          rows={[
            { lang: 'Java', pros: 'Most community examples, strong WPILib support, AP CS alignment', cons: 'Verbose syntax, JVM resource usage', best: 'Most teams, especially those aligned with school curriculum' },
            { lang: 'C++', pros: 'Performance, hardware-level control, industry relevance', cons: 'Steeper learning curve, more complex build system', best: 'Teams with experienced C++ mentors' },
            { lang: 'Python', pros: 'Easier syntax, rapid prototyping, popular teaching language', cons: 'Smaller FRC community, fewer examples', best: 'Teams with Python-experienced mentors' },
            { lang: 'LabVIEW', pros: 'Visual programming, NI native support', cons: 'Less community support, different paradigm', best: 'Teams comfortable with graphical programming' },
          ]}
        />
      </section>

      <section id="wpilib-setup">
        <h2 className="text-xl font-bold text-steel-900 mb-4">WPILib Setup</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          WPILib provides a complete development environment including VS Code with FRC-specific
          extensions, the robot project framework, simulation tools, and deployment utilities.
        </p>
        <CollapsibleSection title="Installation Steps" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Download the WPILib installer from the official WPILib documentation site</li>
            <li>Run the installer -- it includes VS Code, Java/C++ toolchains, and FRC tools</li>
            <li>Install vendor libraries (REVLib, Phoenix, etc.) via the VS Code vendordeps command</li>
            <li>Create a new robot project using the WPILib project creator</li>
            <li>Install NI FRC Game Tools on the driver station laptop (separate download)</li>
            <li>Image the roboRIO using the roboRIO Imaging Tool from NI Game Tools</li>
            <li>Configure the radio using the FRC Radio Configuration Utility</li>
          </ol>
        </CollapsibleSection>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'WPILib Documentation', url: 'https://docs.wpilib.org/', type: 'link', description: 'Complete WPILib docs' }} />
          <ResourceCard resource={{ title: 'NI FRC Game Tools', url: 'https://www.ni.com/en/support/downloads/drivers/download.frc-game-tools.html', type: 'tool', description: 'Driver station and roboRIO imaging' }} />
        </div>
      </section>

      <section id="command-based">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Command-Based Architecture</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          WPILib's command-based framework is the recommended architecture for most teams.
          It organizes code into Subsystems (hardware abstractions) and Commands (actions that
          use subsystems). This maps naturally to how teams think about robot functions.
        </p>
        <InfoBox variant="info" title="Key Concepts">
          <strong>Subsystems</strong> represent physical mechanisms (drivetrain, arm, intake).
          Each subsystem owns its hardware and provides methods to control it.
          <strong>Commands</strong> define actions that use subsystems (drive forward, raise arm).
          The scheduler manages command execution and prevents conflicts.
        </InfoBox>
        <CodeBlock language="Java - Minimal Command-Based Skeleton" code={`// RobotContainer.java - Binds commands to controls
public final class RobotContainer {
  private final Drivetrain drivetrain = new Drivetrain();
  private final CommandXboxController driver =
      new CommandXboxController(0);

  public RobotContainer() {
    drivetrain.setDefaultCommand(
      new RunCommand(
        () -> drivetrain.arcadeDrive(
          -driver.getLeftY(),
          -driver.getRightX()
        ),
        drivetrain
      )
    );
    configureBindings();
  }

  private void configureBindings() {
    // Hold right bumper for slow mode
    driver.rightBumper()
      .whileTrue(new InstantCommand(
        () -> drivetrain.setSpeedScale(0.4)));
    driver.rightBumper()
      .onFalse(new InstantCommand(
        () -> drivetrain.setSpeedScale(1.0)));
  }

  public Command getAutonomousCommand() {
    // Replace with trajectory/path planner command
    return new InstantCommand(
      () -> drivetrain.stop(), drivetrain);
  }
}`} />
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Command-Based Programming', url: 'https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html', type: 'link', description: 'Official command-based framework docs' }} />
        </div>
      </section>

      <section id="drivetrain-code">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Drivetrain Programming</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          WPILib provides kinematics and odometry tooling for differential, mecanum, and swerve
          drivetrains. Start with a differential drive for simplicity, then advance as your team's
          skills grow.
        </p>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Kinematics & Odometry', url: 'https://docs.wpilib.org/en/stable/docs/software/kinematics-and-odometry/intro-and-chassis-speeds.html', type: 'link', description: 'Drivetrain math and tracking' }} />
        </div>
      </section>

      <section id="autonomous">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Autonomous Programming</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Autonomous mode runs for a fixed period at the start of each match with no driver input.
          Teams use trajectory generation and path-following to execute pre-planned routes.
          PathPlanner is a widely used motion profile generator for FRC.
        </p>
        <CollapsibleSection title="Autonomous Development Workflow" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Characterize your drivetrain using WPILib's SysId tool to get feedforward gains</li>
            <li>Set up odometry to track robot position on the field</li>
            <li>Use PathPlanner or WPILib trajectory tools to design autonomous paths</li>
            <li>Test in simulation before deploying to the real robot</li>
            <li>Tune PID controllers on the real robot for path-following accuracy</li>
            <li>Build multiple autonomous routines for different starting positions</li>
            <li>Use an autonomous chooser on the dashboard so drivers can select routines</li>
          </ol>
        </CollapsibleSection>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'WPILib Path Planning', url: 'https://docs.wpilib.org/en/stable/docs/software/pathplanning/index.html', type: 'link', description: 'Trajectory generation and following' }} />
          <ResourceCard resource={{ title: 'System Identification (SysId)', url: 'https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/introduction.html', type: 'link', description: 'Characterize mechanisms for control tuning' }} />
          <ResourceCard resource={{ title: 'PathPlanner', url: 'https://pathplanner.dev/', type: 'tool', description: 'Popular FRC path planning tool' }} />
        </div>
      </section>

      <section id="vision">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Vision & AprilTags</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Vision processing enables field localization and autonomous alignment using AprilTags
          (fiducial markers placed on the field). WPILib provides pose estimator classes, and
          PhotonVision provides a complete pipeline from camera to robot pose.
        </p>
        <div className="grid gap-2">
          <ResourceCard resource={{ title: 'PhotonVision', url: 'https://docs.photonvision.org/', type: 'tool', description: 'Vision processing for FRC' }} />
          <ResourceCard resource={{ title: 'Limelight', url: 'https://docs.limelightvision.io/', type: 'tool', description: 'Plug-and-play vision system' }} />
        </div>
      </section>

      <section id="simulation">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Simulation & Testing</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          WPILib offers physics simulation tooling to model robot motion without the physical robot.
          This enables earlier testing, safer iteration, and programming work during off-season.
          Vendors like REV also provide simulation objects that integrate with WPILib.
        </p>
        <div className="grid gap-2">
          <ResourceCard resource={{ title: 'WPILib Physics Simulation', url: 'https://docs.wpilib.org/en/stable/docs/software/wpilib-tools/robot-simulation/physics-sim.html', type: 'link', description: 'Simulate robot mechanisms' }} />
        </div>
      </section>

      <section id="ci-workflow">
        <h2 className="text-xl font-bold text-steel-900 mb-4">CI/CD Workflow</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Many teams use GitHub Actions with Gradle-based tooling to compile, run tests, and
          enforce code quality on every commit.
        </p>
        <CodeBlock language="YAML - GitHub Actions CI Workflow" code={`name: build-and-test
on:
  pull_request:
  push:
    branches: [ main ]

jobs:
  java:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17
      - name: Build
        run: ./gradlew build
      - name: Test
        run: ./gradlew test`} />

        <VideoEmbed video={{
          title: '0 to Autonomous: FRC Java Programming (Episode 1)',
          url: 'https://www.youtube.com/watch?v=ihO-mw_4Qpo',
          embedUrl: 'https://www.youtube.com/embed/ihO-mw_4Qpo',
          description: 'FRC programming tutorial series by Team 6814 -- from basics to autonomous'
        }} />
      </section>

      <section id="git-basics">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Git & GitHub for Teams</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Version control is essential for FRC teams. All robot code should be in a Git repository.
          GitHub is the most common platform in FRC, and FIRST teams can access GitHub's free
          education tier for additional features.
        </p>

        <CollapsibleSection title="Git Fundamentals" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Repository (repo): A project folder tracked by Git. Contains all code and history.',
              'Commit: A snapshot of changes. Write clear commit messages describing what changed and why.',
              'Branch: A parallel line of development. Use branches for new features or experiments.',
              'Pull Request (PR): A request to merge a branch into main. Use PRs for code review before merging.',
              'Clone: Copy a remote repository to your local machine to start working.',
              'Push/Pull: Push sends local commits to the remote; Pull downloads remote changes.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <div className="mt-4" />

        <CollapsibleSection title="Recommended Team Workflow">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'The main branch is always deployable -- never commit broken code directly to main',
              'Create feature branches for new work (e.g., feature/intake-command, fix/auto-path)',
              'Use pull requests for code review before merging into main',
              'Have at least one other student or mentor review PRs before merging',
              'WPILib projects are Gradle-based -- the .gitignore should exclude build/, .gradle/, and IDE files',
              'Commit early and often -- small commits are easier to review and revert',
              'Tag releases before competitions (e.g., v1.0-regional, v1.1-playoffs)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <InfoBox variant="tip" title="Free for Students">
          GitHub offers free Pro accounts through GitHub Education. Students can access private
          repositories, Copilot, and additional CI/CD minutes at no cost.
        </InfoBox>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'GitHub Education', url: 'https://education.github.com/', type: 'link', description: 'Free GitHub Pro for students and educators' }} />
          <ResourceCard resource={{ title: 'Git Handbook', url: 'https://guides.github.com/introduction/git-handbook/', type: 'link', description: 'GitHub official Git guide' }} />
        </div>
      </section>

      <section id="programming-quiz">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Knowledge Check</h2>
        <QuizBlock
          sectionId="programming"
          questions={[
            {
              question: "WPILib's recommended code architecture for most teams is:",
              options: ['Timed Robot with if/else', 'Command-Based framework', 'Raw motor control', 'Arduino-style loop()'],
              correctIndex: 1,
              explanation: 'The command-based framework organizes code into Subsystems (hardware) and Commands (actions), which maps naturally to robot functions.',
            },
            {
              question: 'What tool does WPILib provide for characterizing mechanisms to get feedforward gains?',
              options: ['PathPlanner', 'SysId', 'PhotonVision', 'AdvantageScope'],
              correctIndex: 1,
              explanation: "WPILib's System Identification (SysId) tool characterizes drivetrain and mechanism behavior to provide feedforward gains for accurate control.",
            },
            {
              question: 'What are AprilTags used for in FRC?',
              options: ['Team identification badges', 'Field localization and autonomous alignment', 'Score tracking', 'Battery monitoring'],
              correctIndex: 1,
              explanation: 'AprilTags are fiducial markers placed on the field that enable vision-based localization and autonomous alignment using cameras.',
            },
          ]}
        />
      </section>
    </div>
  );
}
