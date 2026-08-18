import { Hero } from '@/components/site/hero';
import { ProblemSection } from '@/components/site/sections/problem-section';
import { HowItWorks } from '@/components/site/sections/how-it-works';
import { KnowledgeGraphSection } from '@/components/site/sections/knowledge-graph-section';
import { McpSection } from '@/components/site/sections/mcp-section';
import { ComparisonSection } from '@/components/site/sections/comparison-section';
import { IntegrationsSection } from '@/components/site/sections/integrations-section';
import { DownloadCtaSection } from '@/components/site/sections/download-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <KnowledgeGraphSection />
      <McpSection />
      <ComparisonSection />
      <IntegrationsSection />
      <DownloadCtaSection />
    </>
  );
}
