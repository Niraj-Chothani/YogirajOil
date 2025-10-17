import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Award, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-oil.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium Groundnut Oil"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-background">
            Yogiraj Groundnut Oil
          </h1>
          <p className="text-3xl md:text-5xl font-display italic mb-4 text-gradient-gold">
            Crafting Luxury in Every Teen
          </p>
          <p className="text-xl md:text-2xl text-background/90 mb-8 max-w-2xl mx-auto">
            Our process transforms premium groundnuts into pure, Natural & Original oil
          </p>
          <Link to="/products">
            <Button size="lg" variant="luxury" className="text-lg px-8 py-6 animate-scale-in">
              THE ART OF CRAFTING
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-background/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-display text-center mb-16 text-gradient-gold">
            Why Choose Yogiraj?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover-lift text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
                100% Pure
              </h3>
              <p className="text-muted-foreground">
                Traditional cold-pressed method preserves natural nutrients and authentic taste
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover-lift text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
                Premium Quality
              </h3>
              <p className="text-muted-foreground">
                Selected finest groundnuts from Gujarat's best farms for superior taste
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover-lift text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
                Natural & Healthy
              </h3>
              <p className="text-muted-foreground">
                No chemicals, no additives - just pure, natural goodness in every drop
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-foreground to-foreground/90">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display mb-6 text-background">
            Experience the Rich Taste
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Discover why families across Gujarat trust Yogiraj for their daily cooking needs
          </p>
          <Link to="/products">
            <Button size="lg" variant="luxury" className="text-lg">
              View Our Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
