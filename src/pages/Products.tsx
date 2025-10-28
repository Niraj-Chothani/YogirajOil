import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import bottleImage from "@/assets/oil-bottle.jpg";
import canImage from "@/assets/oil-can.jpg";
import teenImage from "@/assets/oil-teen.jpg";
import seedsImage from "@/assets/groundnut-seeds.jpg";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Premium Oil Bottle",
      category: "Groundnut Oil",
      size: "1 Liter",
      price: 200,
      image: bottleImage,
      description: "Perfect for everyday cooking needs",
    },
    {
      id: 2,
      name: "Oil Can",
      category: "Groundnut Oil",
      size: "5 Liters",
      price: 800,
      image: canImage,
      description: "Ideal for medium-sized families",
    },
    {
      id: 3,
      name: "Traditional Teen",
      category: "Groundnut Oil",
      size: "15 Liters",
      price: 2800,
      image: teenImage,
      description: "Traditional container for bulk requirements",
    },
    {
      id: 4,
      name: "Teen (Weight)",
      category: "Groundnut Oil",
      size: "15 Kg",
      price: 3000,
      image: teenImage,
      description: "Premium quality by weight",
    },
    {
      id: 5,
      name: "G20 Seeds",
      category: "Groundnut Seeds",
      size: "Per Kg",
      price: 1950,
      image: seedsImage,
      description: "Premium quality groundnut seeds",
    },
    {
      id: 6,
      name: "G39 Seeds",
      category: "Groundnut Seeds",
      size: "Per Kg",
      price: 2250,
      image: seedsImage,
      description: "Select quality groundnut seeds",
    },
    {
      id: 7,
      name: "BT-32 Seeds",
      category: "Groundnut Seeds",
      size: "Per Kg",
      price: 2350,
      image: seedsImage,
      description: "Superior quality groundnut seeds",
    },
    {
      id: 8,
      name: "G35 Seeds",
      category: "Groundnut Seeds",
      size: "Per Kg",
      price: 2550,
      image: seedsImage,
      description: "Premium select groundnut seeds",
    },
  ];

  const handleWhatsAppOrder = (productName: string, price: number) => {
    const message = encodeURIComponent(
      `Hello! I'm interested in ordering ${productName} (₹${price}). Please provide more details.`
    );
    window.open(`https://wa.me/918780621820?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-1">
      {/* Header */}
      <section className="py-10 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gradient-gold animate-fade-in">
            Our Products
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Premium Quality Oil & Seeds for Every Need
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-display font-semibold">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-display font-semibold mb-2 text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-display text-muted-foreground">
                      {product.size}
                    </span>
                    <span className="text-2xl font-display font-bold text-primary">
                      ₹{product.price}
                    </span>
                  </div>
                  <Button
                    variant="luxury"
                    className="w-full"
                    onClick={() => handleWhatsAppOrder(product.name, product.price)}
                  >
                    <MessageCircle className="mr-2" size={18} />
                    Order on WhatsApp
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-foreground to-foreground/90">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display mb-6 text-background">
            Need Bulk Orders?
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Contact us for special pricing on large quantities
          </p>
          <Button
            size="lg"
            variant="luxury"
            onClick={() => {
              const message = encodeURIComponent(
                "Hello! I'm interested in bulk orders. Please provide details and pricing."
              );
              window.open(`https://wa.me/917670029700?text=${message}`, "_blank");
            }}
          >
            <MessageCircle className="mr-2" />
            Contact for Bulk Orders
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Products;
