import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="text-sm text-muted-foreground">Available for work</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-hero-text mb-6 leading-tight">
          The easiest way to build and manage your digital presence
        </h1>
        
        <p className="text-lg md:text-xl text-hero-subtext max-w-3xl mx-auto mb-10 leading-relaxed">
          Get a high-performing website designed to turn clicks into customers, all with a simple, stress-free $99/month subscription—no contracts, no hassle.
        </p>
        
        <Link to="/contact">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 h-auto">
            Book your free intro call
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
