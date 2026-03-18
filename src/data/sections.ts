import type { Section } from '../types';

export const sections: Section[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'FRC overview, how to start a team, and first steps for new mentors',
    icon: 'Rocket',
    subsections: [
      { id: 'what-is-frc', title: 'What is FRC?' },
      { id: 'starting-a-team', title: 'Starting a Team' },
      { id: 'registration', title: 'Registration & FIRST Dashboard' },
      { id: 'mentor-role', title: 'Your Role as a Mentor' },
      { id: 'first-season-checklist', title: 'First Season Checklist' },
    ],
  },
  {
    id: 'season-timeline',
    title: 'Season Timeline',
    description: 'Month-by-month guide from off-season through championship',
    icon: 'Calendar',
    subsections: [
      { id: 'offseason', title: 'Off-Season (May - Aug)' },
      { id: 'preseason', title: 'Preseason (Sep - Dec)' },
      { id: 'kickoff', title: 'Kickoff' },
      { id: 'build-season', title: 'Build Season (Jan - Feb)' },
      { id: 'competition-season', title: 'Competition Season (Mar - Apr)' },
      { id: 'championship', title: 'Championship' },
    ],
  },
  {
    id: 'team-organization',
    title: 'Team Organization',
    description: 'Roles, subteams, leadership, and team culture',
    icon: 'Users',
    subsections: [
      { id: 'org-structure', title: 'Organizational Structure' },
      { id: 'subteams', title: 'Subteam Breakdown' },
      { id: 'student-leadership', title: 'Student Leadership' },
      { id: 'mentor-roles', title: 'Mentor Roles & Responsibilities' },
      { id: 'team-culture', title: 'Building Team Culture' },
      { id: 'gracious-professionalism', title: 'Gracious Professionalism' },
    ],
  },
  {
    id: 'safety-compliance',
    title: 'Safety & Compliance',
    description: 'Youth protection, workshop safety, and legal requirements',
    icon: 'Shield',
    subsections: [
      { id: 'youth-protection', title: 'Youth Protection Program' },
      { id: 'workshop-safety', title: 'Workshop Safety' },
      { id: 'ppe-requirements', title: 'PPE Requirements' },
      { id: 'battery-safety', title: 'Battery Safety' },
      { id: 'pneumatics-safety', title: 'Pneumatics Safety' },
      { id: 'event-safety', title: 'Event Safety Rules' },
    ],
  },
  {
    id: 'funding-grants',
    title: 'Funding & Grants',
    description: 'Budgets, sponsorships, grantwriting, and fundraising',
    icon: 'DollarSign',
    subsections: [
      { id: 'budget-planning', title: 'Budget Planning' },
      { id: 'sponsorship-strategy', title: 'Sponsorship Strategy' },
      { id: 'sponsorship-tiers', title: 'Sponsorship Tier Templates' },
      { id: 'grantwriting', title: 'Grantwriting Guide' },
      { id: 'fundraising-toolkit', title: 'Fundraising Toolkit' },
      { id: 'nasa-grants', title: 'NASA & Other Grants' },
    ],
  },
  {
    id: 'mechanical',
    title: 'Mechanical Systems',
    description: 'Drivetrain, mechanisms, fabrication, and build practices',
    icon: 'Wrench',
    subsections: [
      { id: 'workspace-setup', title: 'Workspace Setup' },
      { id: 'drivetrain-options', title: 'Drivetrain Options' },
      { id: 'mechanisms', title: 'Mechanisms & Actuators' },
      { id: 'kitbot', title: 'KitBot Build Guide' },
      { id: 'cad-tools', title: 'CAD & Design Tools' },
      { id: 'fabrication', title: 'Fabrication Techniques' },
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical & Wiring',
    description: 'Power distribution, motor controllers, wiring diagrams, and CAN bus',
    icon: 'Zap',
    subsections: [
      { id: 'control-system', title: 'Control System Overview' },
      { id: 'power-distribution', title: 'Power Distribution' },
      { id: 'wiring-diagram', title: 'Wiring Diagram Walkthrough' },
      { id: 'motor-controllers', title: 'Motor Controllers Comparison' },
      { id: 'can-bus', title: 'CAN Bus Wiring' },
      { id: 'radio-setup', title: 'Radio Configuration' },
      { id: 'batteries', title: 'Battery Management' },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Software architecture, WPILib, autonomous, and vision',
    icon: 'Code',
    subsections: [
      { id: 'languages', title: 'Language Choices' },
      { id: 'wpilib-setup', title: 'WPILib Setup' },
      { id: 'command-based', title: 'Command-Based Architecture' },
      { id: 'drivetrain-code', title: 'Drivetrain Programming' },
      { id: 'autonomous', title: 'Autonomous Programming' },
      { id: 'vision', title: 'Vision & AprilTags' },
      { id: 'simulation', title: 'Simulation & Testing' },
      { id: 'ci-workflow', title: 'CI/CD Workflow' },
    ],
  },
  {
    id: 'strategy-scouting',
    title: 'Strategy & Scouting',
    description: 'Match strategy, scouting systems, and alliance selection',
    icon: 'Target',
    subsections: [
      { id: 'game-analysis', title: 'Game Analysis' },
      { id: 'scouting-system', title: 'Building a Scouting System' },
      { id: 'data-sources', title: 'Data Sources & APIs' },
      { id: 'match-strategy', title: 'Match Strategy' },
      { id: 'alliance-selection', title: 'Alliance Selection' },
      { id: 'driver-practice', title: 'Driver Practice & Controllers' },
    ],
  },
  {
    id: 'awards',
    title: 'Awards',
    description: 'Award categories, submissions, and documentation',
    icon: 'Award',
    subsections: [
      { id: 'award-overview', title: 'Award Categories Overview' },
      { id: 'impact-award', title: 'FIRST Impact Award' },
      { id: 'engineering-awards', title: 'Engineering Awards' },
      { id: 'submission-tips', title: 'Submission Tips & Timeline' },
      { id: 'documentation', title: 'Documentation Best Practices' },
    ],
  },
  {
    id: 'resources',
    title: 'Resources & Links',
    description: 'Curated library of official docs, community tools, and videos',
    icon: 'Library',
    subsections: [
      { id: 'official-first', title: 'Official FIRST Resources' },
      { id: 'wpilib-docs', title: 'WPILib Documentation' },
      { id: 'vendor-docs', title: 'Vendor Documentation' },
      { id: 'community', title: 'Community Resources' },
      { id: 'video-library', title: 'Video Library' },
      { id: 'tools-software', title: 'Tools & Software' },
    ],
  },
];

export function getAllSubsections() {
  const result: { sectionId: string; subsectionId: string; title: string; sectionTitle: string }[] = [];
  for (const section of sections) {
    for (const sub of section.subsections) {
      result.push({
        sectionId: section.id,
        subsectionId: sub.id,
        title: sub.title,
        sectionTitle: section.title,
      });
    }
  }
  return result;
}

export function getTotalSubsections() {
  return sections.reduce((total, section) => total + section.subsections.length, 0);
}
