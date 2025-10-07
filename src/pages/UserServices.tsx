import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Palette, ShoppingCart, Layout } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "brand-identity",
      title: "Brand Identity",
      icon: Sparkles,
      description: "Create a memorable brand that stands out from the competition with logos, color palettes, and visual guidelines.",
      features: [
        "Logo design & variants",
        "Brand color palette",
        "Typography system",
        "Visual style guide",
        "Brand voice & messaging"
      ]
    },
    {
      id: "graphic-design",
      title: "Graphic Design",
      icon: Palette,
      description: "Eye-catching graphics for marketing materials, social media, presentations, and more.",
      features: [
        "Social media graphics",
        "Marketing materials",
        "Presentation decks",
        "Print design",
        "Digital assets"
      ]
    },
    {
      id: "e-commerce",
      title: "E-Commerce",
      icon: ShoppingCart,
      description: "Build a high-converting online store that turns browsers into buyers with seamless shopping experiences.",
      features: [
        "Product catalog design",
        "Checkout optimization",
        "Payment integration",
        "Inventory management",
        "Mobile-first approach"
      ]
    },
    {
      id: "web-design",
      title: "Web Design",
      icon: Layout,
      description: "Beautiful, responsive websites that convert visitors into customers with modern design and seamless UX.",
      features: [
        "Custom web design",
        "Responsive layouts",
        "Fast performance",
        "SEO optimization",
        "CMS integration"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-hero-text mb-6">
              Our Services
            </h1>
            <p className="text-xl text-hero-subtext max-w-3xl mx-auto">
              Comprehensive design solutions to elevate your digital presence
            </p>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24"
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                    <div className="flex-1 space-y-6">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-border"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
