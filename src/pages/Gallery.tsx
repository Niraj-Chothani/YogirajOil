import { useState } from "react";
import bottleImage from "@/assets/oil-bottle.jpg";
import canImage from "@/assets/oil-can.jpg";
import teenImage from "@/assets/oil-teen.jpg";
import seedsImage from "@/assets/groundnut-seeds.jpg";
import heroImage from "@/assets/hero-oil.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { id: 1, src: heroImage, alt: "Premium Groundnut Oil" },
    { id: 2, src: bottleImage, alt: "Oil Bottle Product" },
    { id: 3, src: canImage, alt: "Oil Can Product" },
    { id: 4, src: teenImage, alt: "Traditional Teen Container" },
    { id: 5, src: seedsImage, alt: "Premium Groundnut Seeds" },
    { id: 6, src: bottleImage, alt: "Luxury Packaging" },
    { id: 7, src: canImage, alt: "Quality Assurance" },
    { id: 8, src: seedsImage, alt: "Fresh Groundnuts" },
  ];

  return (
    <div className="min-h-screen pt-1">
      {/* Header */}
      <section className="py-10 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gradient-gold animate-fade-in">
            Gallery
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Experience the Luxury of Premium Groundnut Oil
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-background font-display text-lg">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-background hover:text-primary text-4xl font-light transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Gallery view"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-elegant animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
