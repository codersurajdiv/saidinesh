import { Mail } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";

const EMAIL = "saidinesh75@gmail.com";
const GOOGLE_SCHOLAR = "https://scholar.google.com/citations?user=zdjwKeMAAAAJ&hl=en";

export default function FooterSection() {
  const year = new Date().getFullYear();
  const iconClass = "text-white/60 hover:text-white transition-colors";

  return (
    <footer id="cv" className="bg-charcoal text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Social icons */}
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className={iconClass}
            data-ocid="footer.email.link"
          >
            <Mail size={20} />
          </a>
          <a
            href={GOOGLE_SCHOLAR}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Scholar"
            className={iconClass}
            data-ocid="footer.scholar.link"
          >
            <SiGooglescholar size={18} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white/40 text-xs">
          &copy; {year} Sai Dinesh Kancharana. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
