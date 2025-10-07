import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import monogamyLogo from "@/assets/monogamy-logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/">
            <img src={monogamyLogo} alt="Monogamy" className="h-8" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm transition-colors hover:text-foreground ${
                isActive("/") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`text-sm transition-colors hover:text-foreground ${
                isActive("/services") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Services
            </Link>
            <Link 
              to="/portfolio" 
              className={`text-sm transition-colors hover:text-foreground ${
                isActive("/portfolio") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Portfolio
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm transition-colors hover:text-foreground ${
                isActive("/contact") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
            <Link to="/auth">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Client Portal
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className={`text-sm transition-colors hover:text-foreground ${
                  isActive("/") ? "text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className={`text-sm transition-colors hover:text-foreground ${
                  isActive("/services") ? "text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/portfolio" 
                className={`text-sm transition-colors hover:text-foreground ${
                  isActive("/portfolio") ? "text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm transition-colors hover:text-foreground ${
                  isActive("/contact") ? "text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  Client Portal
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
