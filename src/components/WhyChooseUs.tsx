const WhyChooseUs = () => {
  const benefits = [
    {
      title: "No contracts",
      description: "Pause or cancel anytime—flexible pricing designed to suit any budget."
    },
    {
      title: "Conversion focused",
      description: "We design with one goal: turning visitors into clients/buyers."
    },
    {
      title: "Rapid delivery",
      description: "Most design requests are completed within 48 hours."
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hero-text mb-6">
            Why choose us?
          </h2>
          <p className="text-lg text-hero-subtext max-w-2xl mx-auto">
            We make web design simple, fast, and scalable with a subscription model that puts you in control.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
