import { motion } from "motion/react";

const PROFILE = {
  name: "Sai Dinesh Kancharana",
  title: "Doctoral Researcher in Wireless Communications & Signal Processing",
  affiliation: "IIT Madras — Department of Electrical Engineering",
  bio: "Doctoral researcher in wireless communications, signal processing, and machine learning, with expertise in model-based and learning-assisted algorithm design for reliable communication over high-dimensional and fading channels. My research spans sparse regression codes, iterative inference algorithms, non-coherent/coherent SIMO communication, deep unfolding, and short blocklength coding for next-generation wireless systems. I am particularly interested in problems at the intersection of communication theory, statistical learning, and AI-native physical-layer design, including robust receiver algorithms, data-driven decoding, and theoretically grounded machine learning for 6G wireless systems.",
  photoUrl: "/assets/uploads/Aragon-Headshot-Sai-Dinesh-ee20d401-74-copy-1.jpg",
};

const SOCIAL = {
  googleScholar: "https://scholar.google.com/citations?user=zdjwKeMAAAAJ&hl=en",
  cvUrl: "",
};

export default function HeroSection() {
  return (
    <section id="home" className="pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 min-h-[520px]">
          {/* Left: Beige panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-beige px-10 py-16 flex flex-col justify-center"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-normal text-foreground leading-tight mb-6">
              {PROFILE.name}
            </h1>

            {/* Teal rule + role */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-0.5 h-12 bg-teal flex-shrink-0 mt-1" />
              <div>
                <p className="text-foreground font-semibold text-base">
                  {PROFILE.title}
                </p>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {PROFILE.affiliation}
                </p>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed mb-8 text-[15px] max-w-md text-justify">
              {PROFILE.bio}
            </p>

            <div className="flex items-center gap-4 text-sm">
              <a
                href="#research"
                className="text-teal font-semibold hover:underline"
                data-ocid="hero.research.link"
              >
                About Me
              </a>
              <span className="text-border">•</span>
              <a
                href="#publications"
                className="text-teal font-semibold hover:underline"
                data-ocid="hero.publications.link"
              >
                Publications
              </a>
              {SOCIAL.cvUrl && (
                <>
                  <span className="text-border">•</span>
                  <a
                    href={SOCIAL.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal font-semibold hover:underline"
                    data-ocid="hero.cv.link"
                  >
                    Download CV
                  </a>
                </>
              )}
            </div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden bg-muted"
          >
            <img
              src={PROFILE.photoUrl}
              alt={PROFILE.name}
              className="w-full h-full object-cover object-center min-h-[400px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
