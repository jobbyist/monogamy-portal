import { Link } from "react-router-dom";
import monogamyLogo from "@/assets/monogamy-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={monogamyLogo} alt="Monogamy" className="h-8" />
          
          <div className="flex gap-8">
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
          
          <div className="text-sm text-muted-foreground">
            © 2025 Monogamy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
