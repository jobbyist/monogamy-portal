import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="text-sm text-muted-foreground">All services operational</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-hero-text mb-6 leading-tight">
          Manage Your Law Firm's Digital Presence
        </h1>
        
        <p className="text-lg md:text-xl text-hero-subtext max-w-3xl mx-auto mb-10 leading-relaxed">
          Your comprehensive client portal for managing domains, websites, AI chatbots, payments, and invoices—all in one place. Access powerful tools designed specifically for law firms to streamline your online operations.
        </p>
        
        <Link to="/auth">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 h-auto">
            Access Client Portal
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
