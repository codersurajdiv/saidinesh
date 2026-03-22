import { Award, BookOpen, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";

const TEACHING = [
  {
    courseName: "Linear Algebra, Detection & Estimation, Wireless Communications",
    courseCode: "Teaching Assistantship",
    semester: "2022–2025",
    year: 2025,
    role: "Supervised tutorials and live mentoring sessions for 300+ undergraduate and postgraduate students at IIT Madras. Winner of the Girish Reddy Teaching Assistant Recognition Award (TARA), 2025, awarded by the Department of Electrical Engineering, IIT Madras.",
  },
  {
    courseName: "Digital Communications (NPTEL)",
    courseCode: "NPTEL Live Sessions",
    semester: "Ongoing",
    year: 2024,
    role: "Delivered NPTEL live sessions and interactive lectures for 300+ students at BVC Institute, Amalapuram and Adarsh Engineering College, Chebrolu, AP.",
  },
  {
    courseName: "Linear Algebra and Detection Theory",
    courseCode: "Online Tutorials (M.Tech)",
    semester: "Ongoing",
    year: 2023,
    role: "Conducted online tutorials for 100+ web-enabled M.Tech students enrolled through company-sponsored programs at IIT Madras.",
  },
];

const EMAIL = "saidinesh75@gmail.com";
const OFFICE = "IIT Madras, Chennai, Tamil Nadu 600036, India";
const GOOGLE_SCHOLAR = "https://scholar.google.com/citations?user=zdjwKeMAAAAJ&hl=en";

export default function TeachingContactSection() {
  const sortedCourses = [...TEACHING].sort((a, b) => b.year - a.year);

  return (
    <section id="teaching" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Teaching */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-4xl font-normal text-foreground mb-3">
              Teaching Experience
            </h2>
            <div className="w-12 h-0.5 bg-teal mb-8" />

            {/* Award highlight */}
            <div className="flex items-start gap-3 bg-teal/5 border border-teal/20 rounded-lg p-4 mb-6">
              <Award size={18} className="text-teal flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Girish Reddy Teaching Assistant Recognition Award (TARA), 2025
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Department of Electrical Engineering, IIT Madras — for excellence in teaching assistantship
                </p>
              </div>
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-teal mb-5">
              Roles & Courses
            </h3>

            <div className="space-y-0" data-ocid="teaching.list">
              {sortedCourses.map((course, idx) => (
                <div
                  key={`${course.courseCode}-${course.semester}-${course.year}`}
                  className="py-5 border-b border-divider last:border-0"
                  data-ocid={`teaching.item.${idx + 1}`}
                >
                  <div className="flex items-start gap-3">
                    <BookOpen size={15} className="text-teal flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {course.courseName}
                      </p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {course.courseCode} &middot; {course.semester}
                      </p>
                      <p className="text-muted-foreground text-sm mt-1 leading-snug">
                        {course.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-serif text-4xl font-normal text-foreground mb-3">
              Contact
            </h2>
            <div className="w-12 h-0.5 bg-teal mb-8" />

            <div
              className="border border-border rounded-lg p-6 bg-white shadow-card space-y-4"
              data-ocid="contact.panel"
            >
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-3 group"
                data-ocid="contact.email.link"
              >
                <div className="w-8 h-8 rounded-md bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={15} className="text-teal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-sm text-teal group-hover:underline">{EMAIL}</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={15} className="text-teal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Office
                  </p>
                  <p className="text-sm text-foreground/80">{OFFICE}</p>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-3 border-t border-divider">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">
                  Find Me Online
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={GOOGLE_SCHOLAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-teal border border-teal/30 px-3 py-1.5 rounded hover:bg-teal/5 transition-colors"
                    data-ocid="contact.scholar.link"
                  >
                    Google Scholar
                  </a>
                </div>
              </div>

              {/* Send message form */}
              <div className="pt-3 border-t border-divider">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">
                  Send a Message
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const emailEl = form.elements.namedItem("sender_email") as HTMLInputElement;
                    const msgEl = form.elements.namedItem("message") as HTMLTextAreaElement;
                    window.location.href = `mailto:${EMAIL}?subject=Message from website&body=${encodeURIComponent(`From: ${emailEl.value}\n\n${msgEl.value}`)}`;
                  }}
                  className="space-y-3"
                >
                  <input
                    name="sender_email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    data-ocid="contact.input"
                  />
                  <textarea
                    name="message"
                    placeholder="Your message"
                    rows={3}
                    required
                    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none"
                    data-ocid="contact.textarea"
                  />
                  <button
                    type="submit"
                    className="w-full bg-teal text-white text-sm font-semibold py-2 rounded-md hover:opacity-90 transition-opacity"
                    data-ocid="contact.submit_button"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
