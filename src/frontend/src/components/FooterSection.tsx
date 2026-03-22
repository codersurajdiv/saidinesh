import { Mail } from "lucide-react";
import { SiGithub, SiGooglescholar, SiLinkedin } from "react-icons/si";
import { useProfileInfo, useSocialLinks } from "../hooks/useQueries";

interface FooterSectionProps {
  onAdminClick: () => void;
}

export default function FooterSection({ onAdminClick }: FooterSectionProps) {
  const { data: profile } = useProfileInfo();
  const { data: socialLinks } = useSocialLinks();

  const email = profile?.email ?? "evance@mit.edu";
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  const iconClass = "text-white/60 hover:text-white transition-colors";

  return (
    <footer id="cv" className="bg-charcoal text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Social icons */}
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className={iconClass}
            data-ocid="footer.email.link"
          >
            <Mail size={20} />
          </a>
          {socialLinks?.googleScholar ? (
            <a
              href={socialLinks.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Scholar"
              className={iconClass}
              data-ocid="footer.scholar.link"
            >
              <SiGooglescholar size={18} />
            </a>
          ) : (
            <span
              aria-label="Google Scholar"
              className={iconClass}
              data-ocid="footer.scholar.link"
            >
              <SiGooglescholar size={18} />
            </span>
          )}
          {socialLinks?.linkedIn ? (
            <a
              href={socialLinks.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconClass}
              data-ocid="footer.linkedin.link"
            >
              <SiLinkedin size={18} />
            </a>
          ) : (
            <span
              aria-label="LinkedIn"
              className={iconClass}
              data-ocid="footer.linkedin.link"
            >
              <SiLinkedin size={18} />
            </span>
          )}
          {socialLinks?.github ? (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={iconClass}
              data-ocid="footer.github.link"
            >
              <SiGithub size={18} />
            </a>
          ) : (
            <span
              aria-label="GitHub"
              className={iconClass}
              data-ocid="footer.github.link"
            >
              <SiGithub size={18} />
            </span>
          )}
        </div>

        {/* Copyright + built with */}
        <div className="text-center space-y-1">
          <p className="text-white/40 text-xs">
            &copy; {year} Eleanor Vance. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Built with &hearts; using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 underline transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>

        {/* Admin link */}
        <button
          type="button"
          onClick={onAdminClick}
          className="text-white/20 text-xs hover:text-white/50 transition-colors"
          data-ocid="footer.admin.button"
        >
          Admin
        </button>
      </div>
    </footer>
  );
}
