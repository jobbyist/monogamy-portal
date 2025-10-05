import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Portfolio = () => {
  const projects = [
    {
      title: "Tech Startup Landing",
      category: "Web Design",
      description: "Modern SaaS landing page with conversion-focused design"
    },
    {
      title: "E-Commerce Store",
      category: "E-Commerce",
      description: "Full-featured online store with seamless checkout"
    },
    {
      title: "Brand Refresh",
      category: "Brand Identity",
      description: "Complete brand overhaul for established business"
    },
    {
      title: "Marketing Campaign",
      category: "Graphic Design",
      description: "Social media and print materials for product launch"
    },
    {
      title: "Corporate Website",
      category: "Web Design",
      description: "Professional website for B2B service provider"
    },
    {
      title: "App Interface",
      category: "Web Design",
      description: "Clean and intuitive user interface design"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-hero-text mb-6">
              Our Work
            </h1>
            <p className="text-xl text-hero-subtext max-w-3xl mx-auto">
              A selection of projects that showcase our design expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl border border-border mb-4 group-hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/5">
                    <span className="text-primary font-semibold">View Project</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-primary font-medium">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
