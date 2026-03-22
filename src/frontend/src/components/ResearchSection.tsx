import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2, Brain, Radio } from "lucide-react";
import { motion } from "motion/react";
import { useResearchInterests } from "../hooks/useQueries";

const FALLBACK_INTERESTS = [
  {
    title: "Compressed Sensing & High-Dimensional Statistics",
    description:
      "Exploring the mathematical foundations of recovering high-dimensional sparse signals from limited measurements. This encompasses sparse regression codes, approximate message passing algorithms, and statistical guarantees for reliable inference in underdetermined systems.",
    icon: BarChart2,
  },
  {
    title: "Machine Learning for Wireless Communications",
    description:
      "Designing learning-assisted algorithms for next-generation wireless systems, including deep unfolding of iterative receivers, data-driven decoding for short blocklength codes, and AI-native physical-layer methods for 6G non-coherent and coherent SIMO channels.",
    icon: Radio,
  },
  {
    title: "Information-Theoretic Principles of Deep Learning",
    description:
      "Investigating the theoretical underpinnings of deep neural networks through the lens of information theory, including generalization bounds, representation compression, and the mutual information framework for understanding what and how neural networks learn.",
    icon: Brain,
  },
];

const icons = [BarChart2, Radio, Brain];

export default function ResearchSection() {
  const { data: interests, isLoading } = useResearchInterests();

  const items = (
    interests && interests.length > 0 ? interests : FALLBACK_INTERESTS
  ).map((item, i) => ({ ...item, icon: icons[i % icons.length] }));

  return (
    <section id="research" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl font-normal text-foreground mb-3">
            Research Interests
          </h2>
          <div className="w-12 h-0.5 bg-teal mx-auto" />
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-56 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6" data-ocid="research.list">
            {items.map((interest, idx) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white border border-border rounded-lg p-6 shadow-card hover:shadow-md transition-shadow"
                  data-ocid={`research.item.${idx + 1}`}
                >
                  <div className="w-10 h-10 rounded-md bg-teal/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-teal" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2">
                    {interest.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {interest.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
