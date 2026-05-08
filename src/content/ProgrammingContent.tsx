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
          Java, C++, and Python. Most teams choose Java due to the strongest community support,
          documentation, and alignment with AP Computer Science curriculum.
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
            { lang: 'Java', pros: 'Most community examples, strong WPILib support, AP CS alignment, largest FRC ecosystem', cons: 'Verbose syntax, JVM resource usage', best: 'Most teams, especially those aligned with school curriculum' },
            { lang: 'C++', pros: 'Performance, hardware-level control, industry relevance, real-time guarantees', cons: 'Steeper learning curve, memory management, complex build system', best: 'Teams with experienced C++ mentors' },
            { lang: 'Python', pros: 'Easier syntax, rapid prototyping, popular teaching language', cons: 'Smaller FRC community, fewer examples, RobotPy wrapper', best: 'Teams with Python-experienced mentors' },
            { lang: 'LabVIEW', pros: 'Visual programming, NI native support, graphical debugging', cons: 'Less community support, difficult version control', best: 'Teams comfortable with graphical programming' },
          ]}
        />
        <InfoBox variant="tip" title="Java is the Default Choice">
          If you have no strong preference, start with Java. About 75% of FRC teams use Java,
          meaning you will find the most example code, community help on Chief Delphi, and
          vendor library support.
        </InfoBox>
      </section>

      <section id="wpilib-setup">
        <h2 className="text-xl font-bold text-steel-900 mb-4">WPILib Setup</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          WPILib provides a complete development environment including VS Code with FRC-specific
          extensions, the robot project framework, simulation tools, and deployment utilities.
        </p>
        <CollapsibleSection title="Installation Steps" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Download the WPILib installer from the official WPILib documentation site (new release each January)</li>
            <li>Run the installer -- it includes VS Code, Java/C++ toolchains, and FRC tools</li>
            <li>Install vendor libraries (REVLib, Phoenix 6, etc.) via the VS Code vendordeps command</li>
            <li>Create a new robot project using the WPILib project creator (Command Robot template recommended)</li>
            <li>Install NI FRC Game Tools on the driver station laptop (separate download from NI)</li>
            <li>Image the roboRIO using the roboRIO Imaging Tool from NI Game Tools</li>
            <li>Configure the radio using the FRC Radio Configuration Utility</li>
            <li>Flash motor controller firmware using vendor utilities (REV Hardware Client, Phoenix Tuner X)</li>
          </ol>
        </CollapsibleSection>

        <CollapsibleSection title="VS Code Essential Shortcuts">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Ctrl+Shift+P: Open Command Palette (access all WPILib commands here)',
              'WPILib: Build Robot Code -- compiles your project',
              'WPILib: Deploy Robot Code -- deploys to connected roboRIO',
              'WPILib: Simulate Robot Code -- launches the simulator',
              'WPILib: Create a new project -- scaffolds a new robot project',
              'WPILib: Manage Vendor Libraries -- install/update third-party libs',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'Install FRC Software Tools - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=8YaYxaSuHbM',
          embedUrl: 'https://www.youtube.com/embed/8YaYxaSuHbM',
          description: 'Complete walkthrough of installing all FRC development tools'
        }} />

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'WPILib Documentation', url: 'https://docs.wpilib.org/', type: 'link', description: 'Complete WPILib docs -- the primary reference' }} />
          <ResourceCard resource={{ title: 'NI FRC Game Tools', url: 'https://www.ni.com/en/support/downloads/drivers/download.frc-game-tools.html', type: 'tool', description: 'Driver station and roboRIO imaging' }} />
          <ResourceCard resource={{ title: 'REV Hardware Client', url: 'https://docs.revrobotics.com/rev-hardware-client/', type: 'tool', description: 'Configure and update REV motor controllers' }} />
          <ResourceCard resource={{ title: 'Phoenix Tuner X', url: 'https://pro.docs.ctr-electronics.com/en/stable/docs/tuner/index.html', type: 'tool', description: 'Configure CTRE devices (Falcon, Kraken, CANcoder)' }} />
        </div>
      </section>

      <section id="command-based">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Command-Based Architecture</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          WPILib's command-based framework is the recommended architecture for most teams.
          It organizes code into Subsystems (hardware abstractions) and Commands (actions that
          use subsystems). The scheduler prevents conflicts -- only one command can use a subsystem at a time.
        </p>
        <InfoBox variant="info" title="Key Concepts">
          <strong>Subsystems</strong> represent physical mechanisms (drivetrain, arm, intake).
          Each subsystem owns its hardware and provides methods to control it.
          <strong>Commands</strong> define actions that use subsystems (drive forward, raise arm).
          <strong>Triggers</strong> bind commands to controller buttons, sensor thresholds, or autonomous conditions.
        </InfoBox>

        <CollapsibleSection title="Command Lifecycle" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'initialize() -- Runs once when the command starts. Set up initial state here.',
              'execute() -- Runs repeatedly (every 20ms) while the command is active. Single iteration of your control loop.',
              'isFinished() -- Checked after each execute(). Return true to end the command.',
              'end(interrupted) -- Runs once when the command ends. Stop motors and clean up here.',
              'CAUTION: execute() must be fast (<10ms). Long-running code starves the scheduler.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CodeBlock language="Java - Subsystem Example" code={`public class Drivetrain extends SubsystemBase {
  private final CANSparkMax leftLeader =
      new CANSparkMax(1, MotorType.kBrushless);
  private final CANSparkMax rightLeader =
      new CANSparkMax(2, MotorType.kBrushless);
  private final DifferentialDrive drive =
      new DifferentialDrive(leftLeader, rightLeader);
  private double speedScale = 1.0;

  public Drivetrain() {
    rightLeader.setInverted(true);
    leftLeader.setIdleMode(IdleMode.kBrake);
    rightLeader.setIdleMode(IdleMode.kBrake);
  }

  public void arcadeDrive(double speed, double rotation) {
    drive.arcadeDrive(speed * speedScale, rotation * speedScale);
  }

  public void setSpeedScale(double scale) { speedScale = scale; }
  public void stop() { drive.stopMotor(); }
}`} />

        <CodeBlock language="Java - RobotContainer Bindings" code={`public final class RobotContainer {
  private final Drivetrain drivetrain = new Drivetrain();
  private final Intake intake = new Intake();
  private final CommandXboxController driver =
      new CommandXboxController(0);

  public RobotContainer() {
    drivetrain.setDefaultCommand(
      new RunCommand(
        () -> drivetrain.arcadeDrive(
          -driver.getLeftY(), -driver.getRightX()),
        drivetrain));
    configureBindings();
  }

  private void configureBindings() {
    driver.rightBumper()
      .whileTrue(new InstantCommand(
        () -> drivetrain.setSpeedScale(0.4)));
    driver.rightBumper()
      .onFalse(new InstantCommand(
        () -> drivetrain.setSpeedScale(1.0)));
    driver.leftTrigger(0.3)
      .whileTrue(intake.runCommand());
    driver.a().whileTrue(intake.ejectCommand());
  }

  public Command getAutonomousCommand() {
    return new PathPlannerAuto("TwoNote");
  }
}`} />

        <VideoEmbed video={{
          title: 'Overview of FRC Programming - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=HvFiSyA5-XA',
          embedUrl: 'https://www.youtube.com/embed/HvFiSyA5-XA',
          description: 'Comprehensive overview of FRC programming concepts and command-based architecture'
        }} />

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Command-Based Programming', url: 'https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html', type: 'link', description: 'Official command-based framework docs' }} />
          <ResourceCard resource={{ title: 'Beginner Subsystems and Commands', url: 'https://www.youtube.com/watch?v=vbcuFFr4k40', type: 'video', description: 'Team 3847 beginner guide to subsystems and commands' }} />
        </div>
      </section>

      <section id="drivetrain-code">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Drivetrain Programming</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          The drivetrain is the foundation of your robot code. WPILib provides kinematics and
          odometry for differential, mecanum, and swerve drives.
        </p>

        <DataTable
          caption="Drivetrain Code Approaches"
          columns={[
            { key: 'type', header: 'Drive Type', width: '20%' },
            { key: 'difficulty', header: 'Difficulty', width: '15%' },
            { key: 'description', header: 'Implementation Notes' },
          ]}
          rows={[
            { type: 'Tank Drive', difficulty: 'Beginner', description: 'Left stick controls left wheels, right stick controls right wheels.' },
            { type: 'Arcade Drive', difficulty: 'Beginner', description: 'One stick for forward/back, another for rotation. Most intuitive.' },
            { type: 'Curvature Drive', difficulty: 'Intermediate', description: 'Rotation input controls turning radius. Smoother high-speed driving.' },
            { type: 'Swerve Drive', difficulty: 'Advanced', description: 'Independent wheel angle and speed. Requires kinematics, PID tuning, and CAN management.' },
          ]}
        />

        <CollapsibleSection title="PID Control for Drivetrains">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'P (Proportional): Output proportional to error. Higher P = faster response but more oscillation.',
              'I (Integral): Accumulates error over time. Corrects steady-state error but can cause windup.',
              'D (Derivative): Responds to rate of change. Dampens oscillation but amplifies noise.',
              'F (Feedforward): Pre-calculated output for desired state. Handles gravity, friction, velocity.',
              'Tuning process: Set I,D to 0. Increase P until oscillation, back off 20%. Add D to dampen. Add I only if needed.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Swerve Drive Implementation Checklist">
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Choose swerve modules (SDS MK4i, WCP SwerveX, REV MAXSwerve)</li>
            <li>Set up CAN IDs for drive motors, steering motors, and encoders for each module</li>
            <li>Configure absolute encoders (CANcoder) and find module zero offsets</li>
            <li>Implement SwerveModuleState with PID for steering angle control</li>
            <li>Use WPILib SwerveDriveKinematics with your wheel positions</li>
            <li>Add SwerveDriveOdometry for field-relative position tracking</li>
            <li>Implement field-relative driving using the gyroscope heading</li>
            <li>Add module optimization (SwerveModuleState.optimize) to minimize rotation</li>
            <li>Characterize with SysId and tune feedforward + PID gains</li>
          </ol>
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'Beginner Swerve - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=Lufpp4JW07E',
          embedUrl: 'https://www.youtube.com/embed/Lufpp4JW07E',
          description: 'Introduction to swerve drive concepts and implementation'
        }} />

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Kinematics & Odometry', url: 'https://docs.wpilib.org/en/stable/docs/software/kinematics-and-odometry/intro-and-chassis-speeds.html', type: 'link', description: 'Drivetrain math and tracking' }} />
          <ResourceCard resource={{ title: 'YAGSL (Generic Swerve Library)', url: 'https://yagsl.gitbook.io/yagsl', type: 'tool', description: 'Configuration-driven swerve library for FRC' }} />
        </div>
      </section>

      <section id="motors-sensors">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Motors & Sensors</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Understanding motor controllers and sensors is fundamental to FRC programming.
          Motor controllers translate your software commands into physical motor movement,
          while sensors provide feedback about the robot's state.
        </p>

        <DataTable
          caption="Common FRC Motor Controllers"
          columns={[
            { key: 'controller', header: 'Controller', width: '20%' },
            { key: 'motor', header: 'Compatible Motors' },
            { key: 'features', header: 'Key Features' },
          ]}
          rows={[
            { controller: 'SPARK MAX', motor: 'NEO, NEO 550, brushed', features: 'Built-in encoder, USB/CAN, follower mode' },
            { controller: 'SPARK Flex', motor: 'NEO Vortex, NEO 550', features: 'Improved SPARK MAX with absolute encoder port' },
            { controller: 'Talon FX (integrated)', motor: 'Falcon 500, Kraken X60', features: 'Integrated controller + encoder, Phoenix 6 API, FOC' },
          ]}
        />

        <CollapsibleSection title="Encoders & Position Tracking">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Relative Encoders: Track rotation from startup. Built into NEO/Falcon motors.',
              'Absolute Encoders (CANcoder, Through-bore): Report true angle regardless of power cycle. Essential for swerve.',
              'Units: Always convert raw encoder ticks to meaningful units (meters, degrees) using gear ratios.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Common Sensors">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Gyroscope (NavX, Pigeon 2): Measures heading. Essential for field-relative driving and autonomous.',
              'Limit Switches: Detect mechanism endpoints. Wire to roboRIO DIO or motor controller.',
              'Beam Break Sensors: Detect game pieces passing through a point. Common for intakes.',
              'Time-of-Flight: Precise distance measurement. Detect game pieces in mechanisms.',
              'Color Sensors: Detect game piece color/presence. REV Color Sensor V3.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <VideoEmbed video={{
          title: 'Beginner Motors for FRC - Spectrum 3847',
          url: 'https://www.youtube.com/watch?v=vWKKIhUcTzw',
          embedUrl: 'https://www.youtube.com/embed/vWKKIhUcTzw',
          description: 'Understanding FRC motors, controllers, and how to program them'
        }} />

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'REV SPARK MAX Docs', url: 'https://docs.revrobotics.com/sparkmax/', type: 'link', description: 'Complete REV motor controller documentation' }} />
          <ResourceCard resource={{ title: 'CTRE Phoenix 6 Docs', url: 'https://pro.docs.ctr-electronics.com/', type: 'link', description: 'Falcon 500, Kraken X60, and Pigeon 2 programming' }} />
        </div>
      </section>

      <section id="autonomous">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Autonomous Programming</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Autonomous mode runs for a fixed period at the start of each match with no driver input.
          A strong autonomous can score 2-4 game pieces and provide a significant competitive advantage.
        </p>

        <CollapsibleSection title="Autonomous Development Workflow" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Characterize your drivetrain using SysId to get kS, kV, kA feedforward gains</li>
            <li>Set up odometry (encoder + gyro fusion) to track robot position</li>
            <li>Use PathPlanner to design autonomous paths with a visual editor</li>
            <li>Add event markers to trigger commands at specific points (run intake, shoot)</li>
            <li>Test paths in simulation before deploying to real robot</li>
            <li>Tune PID on the real robot for path-following accuracy</li>
            <li>Build multiple routines for different starting positions</li>
            <li>Use SendableChooser on SmartDashboard to select autonomous routines</li>
            <li>Add vision-based pose correction (AprilTags) to reduce odometry drift</li>
          </ol>
        </CollapsibleSection>

        <CodeBlock language="Java - PathPlanner Auto Builder" code={`// In Drivetrain constructor
AutoBuilder.configure(
    this::getPose,
    this::resetOdometry,
    this::getSpeeds,
    this::driveRobotRelative,
    new PPHolonomicDriveController(
        new PIDConstants(5.0, 0, 0),  // Translation
        new PIDConstants(5.0, 0, 0)   // Rotation
    ),
    robotConfig,
    () -> {
        var alliance = DriverStation.getAlliance();
        return alliance.isPresent()
            && alliance.get() == Alliance.Red;
    },
    this
);`} />

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'PathPlanner', url: 'https://pathplanner.dev/', type: 'tool', description: 'Visual path planning tool for FRC autonomous' }} />
          <ResourceCard resource={{ title: 'System Identification (SysId)', url: 'https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/introduction.html', type: 'link', description: 'Characterize mechanisms for control tuning' }} />
          <ResourceCard resource={{ title: 'Choreo', url: 'https://choreo.autos/', type: 'tool', description: 'Optimization-based trajectory planner for FRC' }} />
        </div>
      </section>

      <section id="vision">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Vision & AprilTags</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Vision processing enables field localization using AprilTags (fiducial markers on the field).
          Modern FRC vision can provide sub-centimeter accuracy for robot positioning.
        </p>

        <DataTable
          caption="FRC Vision Solutions"
          columns={[
            { key: 'system', header: 'System', width: '18%' },
            { key: 'type', header: 'Type', width: '15%' },
            { key: 'features', header: 'Features' },
            { key: 'difficulty', header: 'Difficulty', width: '12%' },
          ]}
          rows={[
            { system: 'Limelight 3/4', type: 'All-in-one', features: 'Plug-and-play AprilTag detection, built-in LEDs, MegaTag2', difficulty: 'Easy' },
            { system: 'PhotonVision', type: 'Software', features: 'Free, runs on coprocessor, multi-target, 3D pose estimation', difficulty: 'Medium' },
            { system: 'Custom OpenCV', type: 'DIY', features: 'Maximum flexibility, steep learning curve', difficulty: 'Hard' },
          ]}
        />

        <CollapsibleSection title="Vision-Based Pose Estimation">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Use WPILib SwerveDrivePoseEstimator (or DifferentialDrivePoseEstimator)',
              'Feed encoder + gyro data every loop via update()',
              'Feed vision measurements via addVisionMeasurement() when new frames arrive',
              'Set standard deviations to weight trust: tight for odometry, looser for vision',
              'Multiple cameras improve coverage and reduce blind spots',
              'Reject vision data too far from current estimate (outlier rejection)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'PhotonVision', url: 'https://docs.photonvision.org/', type: 'tool', description: 'Free vision processing for FRC' }} />
          <ResourceCard resource={{ title: 'Limelight', url: 'https://docs.limelightvision.io/', type: 'tool', description: 'Plug-and-play vision system' }} />
        </div>
      </section>

      <section id="simulation">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Simulation & Testing</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          WPILib simulation enables year-round programming work and faster debugging.
          Teams that simulate effectively can have working autonomous before the robot is built.
        </p>
        <CollapsibleSection title="Simulation Best Practices" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Use WPILib physics sim classes (DCMotorSim, SingleJointedArmSim, ElevatorSim)',
              'Implement simulationPeriodic() in subsystems to update physics models',
              'Use AdvantageScope for visualizing simulated robot state in 2D/3D',
              'Test autonomous routines in simulation before deploying to hardware',
              'Create unit tests with JUnit that exercise command logic without hardware',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'WPILib Simulation', url: 'https://docs.wpilib.org/en/stable/docs/software/wpilib-tools/robot-simulation/physics-sim.html', type: 'link', description: 'Simulate robot mechanisms' }} />
          <ResourceCard resource={{ title: 'AdvantageScope', url: 'https://github.com/Mechanical-Advantage/AdvantageScope', type: 'tool', description: '3D robot visualization and log analysis' }} />
        </div>
      </section>

      <section id="ci-workflow">
        <h2 className="text-xl font-bold text-steel-900 mb-4">CI/CD Workflow</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Continuous Integration ensures code always compiles and passes tests on every commit.
        </p>
        <CodeBlock language="YAML - GitHub Actions CI" code={`name: build-and-test
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
      - run: ./gradlew build
      - run: ./gradlew test`} />
      </section>

      <section id="git-basics">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Git & GitHub for Teams</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Version control is non-negotiable for FRC teams. All robot code should be in a Git repository.
        </p>

        <CollapsibleSection title="Git Fundamentals" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Repository (repo): A project folder tracked by Git with all code and history.',
              'Commit: A snapshot of changes. Write clear messages describing what changed.',
              'Branch: A parallel line of development for new features or experiments.',
              'Pull Request (PR): A request to merge a branch into main with code review.',
              'Push/Pull: Push sends local commits to remote; Pull downloads remote changes.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Recommended Team Workflow">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'The main branch is always deployable -- never commit broken code to main',
              'Create feature branches (e.g., feature/intake-command, fix/auto-path)',
              'Use pull requests for code review before merging',
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
          GitHub offers free Pro accounts through GitHub Education with private repos and Copilot.
        </InfoBox>

        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', type: 'tool', description: 'Interactive visual Git tutorial' }} />
          <ResourceCard resource={{ title: 'GitHub Education', url: 'https://education.github.com/', type: 'link', description: 'Free GitHub Pro for students' }} />
        </div>
      </section>

      <section id="debugging">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Debugging & Best Practices</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Debugging robot code is different from typical software -- real-time systems, network latency,
          and physical hardware make diagnosis challenging.
        </p>

        <CollapsibleSection title="Debugging Techniques" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'SmartDashboard/Shuffleboard: Display encoder positions, motor outputs, sensor readings in real-time.',
              'DataLogManager: Log data to roboRIO for post-match analysis with AdvantageScope.',
              'Driver Station logs: Check for errors, warnings, and CAN bus faults.',
              'Phoenix Tuner X / REV Hardware Client: Test motors and sensors independent of code.',
              'Simulation: Reproduce issues in sim where you can add breakpoints.',
              'NetworkTables: Read/write values for real-time tuning (PID gains, setpoints).',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Common Mistakes & Gotchas">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Forgetting to invert a motor -- robot drives in circles',
              'Not setting idle mode (brake vs coast) -- mechanism falls when disabled',
              'CAN ID conflicts -- two devices with same ID cause erratic behavior',
              'Blocking code in execute() -- starves the scheduler (10ms max)',
              'Static variables in commands -- state persists across instances',
              'Wrong encoder units -- calculating in ticks instead of meters/degrees',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <InfoBox variant="warning" title="Competition Day Tips">
          Before every match: verify CAN bus health, check battery voltage above 12.5V,
          confirm autonomous routine selection, and verify radio connection.
        </InfoBox>
      </section>

      <section id="programming-calendar">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Programming Season Calendar</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          A structured calendar helps programming teams stay on track. Start early -- programming
          work that begins on day 1 of build season gives you weeks more testing time.
        </p>

        <CollapsibleSection title="Pre-Season (Sep - Dec)" defaultOpen>
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Update all software tools when new releases arrive',
              'Train new programmers on Java fundamentals and WPILib basics',
              'Practice with last year\'s robot or a practice chassis',
              'Teach Git workflow using real projects',
              'Study successful teams\' open-source code (254, 6328, 3005)',
              'Practice autonomous path planning with practice robot',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Build Season (Jan - Feb)">
          <ul className="space-y-2 text-sm text-steel-600">
            {[
              'Week 0: Survey design, plan CAN IDs, assign programmers to subsystems',
              'Week 1-2: Create project structure, set up stubs, write basic teleop',
              'Week 2-3: Tune PID for mechanisms, develop driver controls',
              'Week 3-4: Begin autonomous, test path following',
              'Week 4-5: Integrate all subsystems, complex autonomous, driver practice',
              'Week 5-6: Polish autonomous, fault detection, finalize dashboard',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
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
              explanation: 'The command-based framework organizes code into Subsystems and Commands, preventing resource conflicts automatically.',
            },
            {
              question: 'What tool does WPILib provide for characterizing mechanisms to get feedforward gains?',
              options: ['PathPlanner', 'SysId', 'PhotonVision', 'AdvantageScope'],
              correctIndex: 1,
              explanation: 'SysId characterizes drivetrain and mechanism behavior to provide feedforward gains (kS, kV, kA).',
            },
            {
              question: 'In the command lifecycle, which method runs repeatedly while a command is active?',
              options: ['initialize()', 'execute()', 'isFinished()', 'end()'],
              correctIndex: 1,
              explanation: 'execute() runs every 20ms while the command is scheduled.',
            },
            {
              question: 'What are AprilTags used for in FRC?',
              options: ['Team identification', 'Field localization and autonomous alignment', 'Score tracking', 'Battery monitoring'],
              correctIndex: 1,
              explanation: 'AprilTags enable vision-based localization and autonomous alignment using cameras.',
            },
          ]}
        />
      </section>
    </div>
  );
}
