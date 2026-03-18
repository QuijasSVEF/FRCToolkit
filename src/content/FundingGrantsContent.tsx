import ResourceCard from '../components/ResourceCard';
import InfoBox from '../components/InfoBox';
import DataTable from '../components/DataTable';
import CollapsibleSection from '../components/CollapsibleSection';
import CodeBlock from '../components/CodeBlock';

export default function FundingGrantsContent() {
  return (
    <div className="space-y-8">
      <section id="budget-planning">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Budget Planning</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST describes running an FRC team like running a small business. Building a realistic
          budget early and tracking expenses throughout the season is essential for sustainability.
        </p>
        <DataTable
          caption="Typical FRC Team Budget Categories"
          columns={[
            { key: 'category', header: 'Category', width: '30%' },
            { key: 'range', header: 'Typical Range' },
            { key: 'notes', header: 'Notes' },
          ]}
          rows={[
            { category: 'Registration & Events', range: '$5,000 - $10,000', notes: 'Team registration plus 2-3 event registrations; varies by district vs regional model' },
            { category: 'Robot Parts & Fabrication', range: '$3,000 - $15,000', notes: 'Kit of Parts reduces startup costs; plan for spares and replacements' },
            { category: 'Tools & Shop Supplies', range: '$500 - $5,000', notes: 'Higher in first year; reduces as tool inventory grows' },
            { category: 'Batteries & Charging', range: '$300 - $800', notes: 'Plan for 4-6 match batteries, chargers, and replacement cables' },
            { category: 'Safety & PPE', range: '$200 - $500', notes: 'Safety glasses, first aid, signage, emergency equipment' },
            { category: 'Travel & Lodging', range: '$2,000 - $20,000', notes: 'Often the largest variable cost; depends on event locations' },
            { category: 'Team Branding & Outreach', range: '$500 - $3,000', notes: 'Shirts, banners, pit display, outreach materials' },
            { category: 'Total Typical Range', range: '$15,000 - $50,000+', notes: 'Varies widely. Some teams operate on less; travel-heavy teams spend more.' },
          ]}
        />
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'FIRST Example Budget (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/example-budget.pdf', type: 'pdf', description: 'FIRST median team budget reference' }} />
        </div>
      </section>

      <section id="sponsorship-strategy">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Sponsorship Strategy</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST recommends starting with companies aligned to STEM and leveraging networks of
          parents, mentors, and alumni. Use a templated first contact message and follow up
          persistently, including phone calls and inviting sponsors to demos and events.
        </p>
        <CollapsibleSection title="Sponsor Outreach Steps" defaultOpen>
          <ol className="space-y-2 text-sm text-steel-600 list-decimal list-inside">
            <li>Identify local STEM-aligned companies, engineering firms, and manufacturers</li>
            <li>Check parent and mentor networks for personal connections to companies</li>
            <li>Prepare a sponsorship packet with team info, impact data, and tier options</li>
            <li>Send personalized emails with the student as the primary sender (mentor reviewed)</li>
            <li>Follow up within 1-2 weeks by phone or in person</li>
            <li>Invite prospects to a workshop tour, demo, or event</li>
            <li>After sponsorship: send thank-you letters, regular updates, and event invites</li>
            <li>Retain sponsors year-over-year through newsletters and recognition</li>
          </ol>
        </CollapsibleSection>
        <InfoBox variant="warning" title="Key Rule">
          FIRST's sponsor relations guidance explicitly warns against making promises the team
          cannot deliver. Keep benefit claims realistic and achievable.
        </InfoBox>
      </section>

      <section id="sponsorship-tiers">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Sponsorship Tier Templates</h2>
        <DataTable
          caption="Sample Sponsorship Tier Structure"
          columns={[
            { key: 'tier', header: 'Tier', width: '15%' },
            { key: 'amount', header: 'Amount', width: '18%' },
            { key: 'benefits', header: 'Benefits & Deliverables' },
          ]}
          rows={[
            { tier: 'Community', amount: '$100 - $499', benefits: 'Name on website/pit signage, thank-you letter, optional social media post' },
            { tier: 'Bronze', amount: '$500 - $999', benefits: 'Logo on website and pit signage, thank-you letter, newsletter updates' },
            { tier: 'Silver', amount: '$1,000 - $1,999', benefits: 'All Bronze + larger logo placement, sponsor invites to build reviews/scrimmages' },
            { tier: 'Gold', amount: '$2,000 - $4,999', benefits: 'All Silver + logo on robot, demo invite, priority sponsor updates' },
            { tier: 'Platinum', amount: '$5,000+', benefits: 'All Gold + sponsor-site demo/workshop tour, student speakers, recruiting touchpoints' },
          ]}
        />
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'Sponsor Relations Guide (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/sponsor-relations.pdf', type: 'pdf', description: 'Official FIRST sponsor outreach guide' }} />
        </div>
      </section>

      <section id="grantwriting">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Grantwriting Guide</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          Grant applications follow a predictable structure. Use this template to adapt for
          different grant sources. Most grants want to see: need, program description, measurable
          outcomes, budget, and a sustainability plan.
        </p>
        <CodeBlock language="Grant Narrative Template" code={`GRANT APPLICATION NARRATIVE TEMPLATE
====================================

1. NEED STATEMENT
- Describe the student population you serve
- Local context: access to STEM education, demographics, equity goals
- What problem does your team address?

2. PROGRAM DESCRIPTION
- Overview of FRC and your team's activities
- Build season structure (Jan-Apr) with subteam descriptions
- Outreach and community engagement activities
- Safety culture and mentor oversight model

3. MEASURABLE OUTCOMES
- Number of students served per season
- Student retention rate year over year
- Training hours per student
- Number of outreach events and people reached
- Competition participation and advancement
- Alumni outcomes (college, STEM careers)

4. BUDGET AND USE OF FUNDS
- Registration and event fees
- Robot materials and fabrication
- Tools and safety equipment
- Travel and lodging
- Detailed line items with amounts

5. SUSTAINABILITY PLAN
- Diversified funding: sponsors, grants, fundraisers
- Sponsor retention strategy (newsletters, demos, recognition)
- Student recruitment pipeline
- Mentor recruitment and training plan`} />
      </section>

      <section id="fundraising-toolkit">
        <h2 className="text-xl font-bold text-steel-900 mb-4">Fundraising Toolkit</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST provides a Fundraising Toolkit with business plan elements and fundraising planning
          resources. Beyond grants and sponsors, teams use a variety of fundraising methods.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: 'Robot Demos', desc: 'Take your robot to community events, schools, and company offices. Great for sponsor recruitment.' },
            { title: 'Crowdfunding', desc: 'GoFundMe or similar platforms for specific purchases. Works best with compelling video content.' },
            { title: 'Community Events', desc: 'Car washes, bake sales, STEM nights, or workshop open houses generate funds and visibility.' },
            { title: 'Corporate Matching', desc: 'Many companies match employee donations. Ask parent/mentor employers about matching programs.' },
            { title: 'In-Kind Donations', desc: 'Materials, tools, workspace, food, or professional services can offset budget significantly.' },
            { title: 'Alumni Network', desc: 'Former team members in college or careers can connect the team to new sponsor opportunities.' },
          ].map((item) => (
            <div key={item.title} className="bg-steel-50 rounded-lg p-4">
              <h4 className="font-semibold text-steel-800 text-sm">{item.title}</h4>
              <p className="text-xs text-steel-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'FIRST Fundraising Guide (PDF)', url: 'https://info.firstinspires.org/hubfs/web/program/frc/resources/fundraising-guide.pdf', type: 'pdf', description: 'Official fundraising strategies' }} />
          <ResourceCard resource={{ title: 'Fundraising Toolkit', url: 'https://www.firstinspires.org/resources/library/fundraising-toolkit', type: 'link', description: 'FIRST fundraising resources library' }} />
        </div>
      </section>

      <section id="nasa-grants">
        <h2 className="text-xl font-bold text-steel-900 mb-4">NASA & Other Grants</h2>
        <p className="text-steel-600 leading-relaxed mb-4">
          FIRST publishes a Team Grant Opportunities page and recommends checking with local
          Program Delivery Partners for regional grants. NASA's Robotics Alliance Project is
          one of the largest grant sources for FRC teams.
        </p>
        <InfoBox variant="info" title="Grant Deadlines">
          Many grant deadlines fall in September through November, well before build season.
          Start researching and writing grant applications in the off-season and early preseason.
        </InfoBox>
        <div className="mt-4 grid gap-2">
          <ResourceCard resource={{ title: 'FIRST Team Grant Opportunities', url: 'https://www.firstinspires.org/programs/team-grant-opportunities', type: 'link', description: 'Central grant listing from FIRST' }} />
          <ResourceCard resource={{ title: 'NASA Robotics Alliance Project', url: 'https://robotics.nasa.gov/', type: 'link', description: 'NASA FRC sponsorship grants' }} />
        </div>
      </section>
    </div>
  );
}
