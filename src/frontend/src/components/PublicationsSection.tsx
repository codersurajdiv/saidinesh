import { ExternalLink, FileText } from "lucide-react";
import { motion } from "motion/react";

interface Publication {
  title: string;
  authors: string;
  year: number;
  venue: string;
  abstract: string;
  pdfUrl: string;
  doi: string;
}

const PUBLICATIONS: Publication[] = [
  {
    title: "Sparse Regression Codes for Non-Coherent SIMO Channels",
    authors: "Sai Dinesh Kancharana, Arun Pachai Kannu",
    year: 2025,
    venue: "IEEE Transactions on Communications",
    abstract:
      "We study sparse regression codes (SPARC) for non-coherent single-input multiple-output (SIMO) fading channels, proposing iterative inference algorithms for reliable decoding without channel state information.",
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/11214190",
    doi: "",
  },
  {
    title: "Sparse Regression Codes for Coherent SIMO Channels",
    authors: "Sai Dinesh Kancharana, Arun Pachai Kannu",
    year: 2025,
    venue: "IEEE International Conference on Communications (ICC)",
    abstract:
      "We investigate sparse regression codes for coherent SIMO channels, developing efficient decoding algorithms that leverage multiple receive antennas for improved error performance.",
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/11418136",
    doi: "",
  },
  {
    title: "Sparse Regression Codes exploit Multi-User Diversity without CSI",
    authors: "V S V Sandeep, Sai Dinesh Kancharana, Arun Pachai Kannu",
    year: 2025,
    venue: "arXiv preprint",
    abstract:
      "We study sparse regression codes (SPARC) for multiple access channels with multiple receive antennas in non-coherent flat fading channels. We propose MLMP (maximum likelihood matching pursuit), a novel practical decoder that achieves multi-user diversity without any channel state information.",
    pdfUrl: "https://arxiv.org/abs/2507.11383",
    doi: "10.48550/arXiv.2507.11383",
  },
];

function groupByYear(pubs: Publication[]): Record<number, Publication[]> {
  const groups: Record<number, Publication[]> = {};
  for (const pub of pubs) {
    if (!groups[pub.year]) groups[pub.year] = [];
    groups[pub.year].push(pub);
  }
  return groups;
}

export default function PublicationsSection() {
  const grouped = groupByYear(PUBLICATIONS);
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section id="publications" className="py-20 bg-beige">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl font-normal text-foreground mb-3">
            Publications
          </h2>
          <div className="w-12 h-0.5 bg-teal" />
        </motion.div>

        <div data-ocid="publications.list">
          {years.map((year) => (
            <div key={year} className="mb-10">
              <h3 className="text-teal font-semibold text-sm uppercase tracking-widest mb-4">
                {year}
              </h3>
              <div className="space-y-0">
                {grouped[year].map((pub, idx) => (
                  <motion.div
                    key={pub.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="flex items-start justify-between gap-6 py-5 border-b border-divider last:border-b-0"
                    data-ocid={`publications.item.${idx + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-[15px] leading-snug mb-1">
                        {pub.title}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {pub.authors}
                      </p>
                      <p className="text-muted-foreground text-sm italic mt-0.5">
                        {pub.venue}, {pub.year}
                      </p>
                      {pub.abstract && (
                        <p className="text-muted-foreground text-xs mt-1.5 leading-relaxed line-clamp-2">
                          {pub.abstract}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                      {pub.pdfUrl && pub.pdfUrl !== "#" && (
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-teal border border-teal/30 px-2.5 py-1 rounded hover:bg-teal/5 transition-colors"
                          data-ocid={`publications.pdf.link.${idx + 1}`}
                        >
                          <FileText size={12} />
                          View
                        </a>
                      )}
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-teal border border-teal/30 px-2.5 py-1 rounded hover:bg-teal/5 transition-colors"
                          data-ocid={`publications.doi.link.${idx + 1}`}
                        >
                          <ExternalLink size={12} />
                          DOI
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
