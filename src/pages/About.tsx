import { Sprout, Wind, Filter, Package, Truck, Heart } from "lucide-react";

const About = () => {
  const processSteps = [
    {
      icon: Sprout,
      title: "Premium Farming",
      description: "We source the finest groundnuts from trusted farms across Gujarat",
    },
    {
      icon: Wind,
      title: "Cleaning & De-hulling",
      description: "Meticulous cleaning process removes impurities while preserving quality",
    },
    {
      icon: Heart,
      title: "Traditional Pressing",
      description: "Cold-pressed using traditional methods to retain natural goodness",
    },
    {
      icon: Filter,
      title: "Pure Filtering",
      description: "Natural filtration ensures crystal-clear, pure oil",
    },
    {
      icon: Package,
      title: "Hygienic Packing",
      description: "Sealed in premium containers to preserve freshness and quality",
    },
    {
      icon: Truck,
      title: "Timely Delivery",
      description: "Fresh from our mill to your kitchen with care and precision",
    },
  ];

  return (
    <div className="min-h-screen pt-1">
      {/* Header */}
      <section className="py-10 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gradient-gold animate-fade-in">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Crafting Excellence Through Traditional Methods and Modern Expertise
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-elegant mb-16">
            <h2 className="text-3xl md:text-4xl font-display mb-6 text-foreground">
              The Rich Taste of Original Groundnut Oil
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                At Yogiraj Oil Mill, we believe that quality begins with tradition. For generations, 
                our family has been dedicated to producing the finest groundnut oil using time-honored 
                techniques passed down through the ages.
              </p>
              <p>
                Our commitment to excellence starts with selecting only the premium groundnuts from 
                Gujarat's finest farms. Each batch is carefully processed using traditional cold-pressing 
                methods that preserve the natural nutrients, authentic aroma, and rich taste that makes 
                Yogiraj oil truly exceptional.
              </p>
              <p>
                We take pride in maintaining the highest standards of hygiene and quality control 
                throughout our production process. From farm to kitchen, every drop of Yogiraj oil 
                embodies our dedication to purity, authenticity, and the well-being of your family.
              </p>
            </div>
          </div>

          {/* Process Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-center mb-12 text-gradient-gold">
              Our Crafting Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="relative bg-card p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Values */}
          <div className="bg-gradient-to-br from-foreground to-foreground/90 p-8 md:p-12 rounded-2xl shadow-elegant text-center">
            <h2 className="text-3xl md:text-4xl font-display mb-6 text-background">
              Our Promise
            </h2>
            <p className="text-xl text-background/90 leading-relaxed">
              Every bottle of Yogiraj oil carries our commitment to purity, quality, and tradition. 
              We don't just make oil – we craft an experience that brings authentic taste and 
              wholesome nutrition to your family's table.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
