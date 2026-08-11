import { CertificationCard } from "@/components/sections/certifications/certification-card";
import { FilterGrid, type FilterGridItem } from "@/components/ui/filter-grid";
import { Section } from "@/components/ui/section";
import { Heading, Mono } from "@/components/ui/typography";
import { getCertifications } from "@/sanity/lib/loaders";

export async function Certifications() {
  const { index, eyebrow, heading, items } = await getCertifications();

  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];

  const gridItems: FilterGridItem[] = items.map((certification) => ({
    id: certification.id,
    category: certification.category,
    node: <CertificationCard certification={certification} />,
  }));

  return (
    <Section id="certifications" reveal aria-labelledby="certifications-heading">
      <div className="flex flex-col gap-10 md:gap-12">
        <header className="flex max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-3">
            <Mono tone="accent">{index}</Mono>
            <span aria-hidden className="text-muted-foreground">
              —
            </span>
            <Mono tone="muted">{eyebrow}</Mono>
          </div>
          <Heading id="certifications-heading" as="h2" size="display-l" gradient>
            {heading}
          </Heading>
        </header>

        <FilterGrid
          categories={categories}
          items={gridItems}
          filterLabel="Filter certifications by category"
          emptyTitle="— No certifications in this category"
          itemNoun="certification"
        />
      </div>
    </Section>
  );
}
