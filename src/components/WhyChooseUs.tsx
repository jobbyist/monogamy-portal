const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Step 1: Initiate The Portal",
      description: "Click the 'Access Client Portal' button to get started. If you're a new user, you'll be directed to the sign-up page where you can create your account. Already have an account? Simply log in to access your dashboard interface and start managing your digital assets."
    },
    {
      title: "Step 2: Choose Any Tool/Service",
      description: "Navigate through our comprehensive suite of tools and services including domain management, website deployment, AI chatbots, and more. Each service is designed to streamline your law firm's digital operations. If you encounter any issues or errors, you can open a support ticket or try again later."
    },
    {
      title: "Step 3: Manage & Monitor",
      description: "Track your services, view invoices, and monitor transactions all from one centralized dashboard. Access real-time updates on your digital assets, manage your billing, and get support whenever you need it. Your complete law firm digital ecosystem at your fingertips."
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hero-text mb-6">
            How It Works
          </h2>
          <p className="text-lg text-hero-subtext max-w-2xl mx-auto">
            Get started with Monogamy in three simple steps and transform your law firm's digital asset management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
