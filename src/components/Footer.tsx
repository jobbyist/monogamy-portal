import { Link } from "react-router-dom";
import monogamyLogo from "@/assets/monogamy-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={monogamyLogo} alt="Monogamy" className="h-6 md:h-8" />
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Services
            </Link>
            <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 Monogamy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
