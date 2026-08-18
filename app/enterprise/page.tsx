import { PageHero } from '@/components/site/page-hero';
import { Section, SectionHeading, FadeIn } from '@/components/site/section';
import { Users, Network, MonitorSmartphone, Package, Clock, MessageSquare, Shield, KeyRound, Cloud, Server, FileText } from 'lucide-react';

export const metadata = {
  title: 'Enterprise',
  description: 'Shared Engineering Memory for teams — Team Knowledge Graph, SSO, audit logs, cloud and private deployment.',
};

const features = [
  { icon: Users, title: 'Shared Engineering Memory', description: 'The entire team shares one project memory. Onboarding drops from weeks to hours.' },
  { icon: Network, title: 'Team Knowledge Graph', description: 'A unified graph that merges individual contributions into a single source of truth.' },
  { icon: MonitorSmartphone, title: 'Shared Dashboard', description: 'Real-time dashboard access for every team member. No local setup required.' },
  { icon: Package, title: 'Shared Builds', description: 'Build memory is shared across the team. Everyone sees what broke, when, and why.' },
  { icon: Clock, title: 'Organization Timeline', description: 'A unified timeline of every commit, decision, and event across all projects.' },
  { icon: MessageSquare, title: 'Shared Chat Context', description: 'AI sessions are shared. One developer\'s context benefits the whole team.' },
  { icon: KeyRound, title: 'SSO & SAML', description: 'Enterprise SSO with SAML 2.0. Okta, Azure AD, Google Workspace, and custom providers.' },
  { icon: Shield, title: 'Permissions & RBAC', description: 'Granular role-based access control. Project-level and organization-level permissions.' },
  { icon: Cloud, title: 'Cloud or Private Deployment', description: 'Host in our cloud or deploy in your own VPC. Your data, your infrastructure.' },
  { icon: Server, title: 'Private Deployment', description: 'Run DevMemory Enterprise on your own infrastructure. Air-gapped supported.' },
  { icon: FileText, title: 'Audit Logs', description: 'Every query, every access, every change — logged and exportable for compliance.' },
  { icon: Users, title: 'Priority Support', description: 'Dedicated support channel with SLA guarantees and direct engineering access.' },
];

export default function EnterprisePage() {
  return (
    <>
      <PageHero
        label="Enterprise"
        title={<>Shared memory for <span className="text-muted-foreground">engineering teams.</span></>}
        description="The future of DevMemory is shared. One knowledge graph for your entire organization — so every developer, every AI agent, and every decision is connected."
      />

      <Section className="border-t border-border">
        <SectionHeading
          label="Coming Soon"
          title="Built for teams that build together."
          description="DevMemory Enterprise brings the power of Engineering Memory to your entire organization. Shared context, shared history, shared understanding."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 40}>
              <div className="h-full rounded-2xl border border-border bg-card/40 p-6">
                <feature.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="mt-12 rounded-2xl border border-border bg-card/40 p-8 text-center">
            <h3 className="text-xl font-semibold">Interested in Enterprise?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              We're working with select teams to shape the future of shared engineering memory.
            </p>
            <a href="mailto:enterprise@devmemory.ai" className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-[13px] font-medium text-primary-foreground hover:bg-primary/90">
              Contact us
            </a>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
