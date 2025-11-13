import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // Import your real auth hook
import { GalleryFormModal } from "@/components/GalleryFormModal"; // Import your new modal

const Gallery = () => {
  // State for the lightbox
  const [selectedImage, setSelectedImage] = useState(null);
  
  // State for gallery images from backend
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for admin controls
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin';
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch gallery images from API on load
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setGalleryImages(data);
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // --- ADMIN FUNCTION: Handle Delete ---
  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }
    try {
      const response = await fetch(`/api/gallery/${imageId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      // Remove image from state to update UI
      setGalleryImages(galleryImages.filter((img) => img._id !== imageId));
      alert("Image deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image");
    }
  };
  
  // --- ADMIN FUNCTION: Handle Save (From Modal) ---
  const handleSaveImage = async (formData) => {
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save image");
      }

      const savedImage = await response.json();
      // Add the new image to the top of the list
      setGalleryImages([savedImage, ...galleryImages]);
      alert("Image added!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save image.");
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };

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
          
          {/* ADMIN BUTTON: Add New Image */}
          {isAdmin && (
            <div className="mb-8 text-right">
              <Button size="lg" onClick={() => setIsModalOpen(true)}>
                <PlusCircle className="mr-2" size={20} />
                Add New Image
              </Button>
            </div>
          )}

          {/* Show message if no images exist */}
          {!loading && galleryImages.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold mb-4">No Images Found</h2>
              {isAdmin ? (
                <p className="text-muted-foreground">Click "Add New Image" to get started.</p>
              ) : (
                <p className="text-muted-foreground">Please check back later.</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Map over images from state */}
            {galleryImages.map((image, index) => (
              <div
                key={image._id} // Use _id from MongoDB
                className="relative aspect-square overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image.src)}
              >
                {/* ADMIN BUTTON: Delete Image */}
                {isAdmin && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      // Stop the click from opening the lightbox
                      e.stopPropagation(); 
                      handleDeleteImage(image._id);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                )}

                <img
                  src={image.src} // Use src from database
                  alt={image.alt} // Use alt from database
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

      {/* Lightbox Modal (Unchanged) */}
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
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking image
          />
        </div>
      )}

      {/* RENDER THE ADD IMAGE MODAL */}
      <GalleryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveImage}
      />
    </div>
  );
};

export default Gallery;