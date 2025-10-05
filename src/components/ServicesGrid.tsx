import { Link } from "react-router-dom";
import { Palette, Layout, ShoppingCart, Sparkles } from "lucide-react";

const ServicesGrid = () => {
  const services = [
    {
      title: "Brand Identity",
      icon: Sparkles,
      path: "/services#brand-identity"
    },
    {
      title: "Graphic Design",
      icon: Palette,
      path: "/services#graphic-design"
    },
    {
      title: "E-Commerce",
      icon: ShoppingCart,
      path: "/services#e-commerce"
    },
    {
      title: "Web Design",
      icon: Layout,
      path: "/services#web-design"
    }
  ];

  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-hero-text mb-6">
            Our team works with a wide range of projects
          </h2>
          <p className="text-lg text-hero-subtext max-w-3xl mx-auto">
            From landing pages to full websites, UI/UX to ongoing updates—our experts are here to bring your vision to life, hassle-free.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link 
                key={index}
                to={service.path}
                className="group relative bg-card border border-border rounded-2xl p-10 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div className="relative z-10">
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
