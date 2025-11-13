import { Button } from "@/components/ui/button";
import { MessageCircle, Edit, Trash2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductFormModal } from "@/components/ProductFormModal"; // Adjust path if needed
import { useAuth } from "@/context/AuthContext"; // Adjust path if needed

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get user data from the real context
  const { user } = useAuth(); // We only need the user object here
  
  // Determine if the user is an admin
  const isAdmin = user && user.role === 'admin';
  
  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Fetch products from API on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); 
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Empty array ensures this runs only once

  // WhatsApp handler
  const handleWhatsAppOrder = (productName, price) => {
    const message = encodeURIComponent(
      `Hello! I'm interested in ordering ${productName} (₹${price}). Please provide more details.`
    );
    window.open(`https://wa.me/918780621820?text=${message}`, "_blank");
  };

  // --- ADMIN FUNCTION: Handle Delete ---
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      // Remove product from state to update UI instantly
      setProducts(products.filter((p) => p._id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
    }
  };

  // --- ADMIN FUNCTION: Handle Add (Opens Modal) ---
  const handleAddProduct = () => {
    setProductToEdit(null); // Set to null for "Add" mode
    setIsModalOpen(true);
  };

  // --- ADMIN FUNCTION: Handle Edit (Opens Modal) ---
  const handleEditProduct = (product) => {
    setProductToEdit(product); // Pass the product to pre-fill the form
    setIsModalOpen(true);
  };

  // --- ADMIN FUNCTION: Handle Save (From Modal) ---
  const handleSaveProduct = async (formData) => {
    const isEditMode = Boolean(productToEdit); // Check if we are editing
    const url = isEditMode
      ? `/api/products/${productToEdit._id}` // PUT URL for editing
      : "/api/products";                   // POST URL for adding
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      const savedProduct = await response.json();

      if (isEditMode) {
        // Find and replace the product in the state
        setProducts(
          products.map((p) => (p._id === savedProduct._id ? savedProduct : p))
        );
        alert("Product updated!");
      } else {
        // Add the new product to the top of the list
        setProducts([savedProduct, ...products]);
        alert("Product added!");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save product. Check console for details.");
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

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
          
          {/* ADMIN BUTTON: Add New Product */}
          {/* This will only show if 'isAdmin' is true */}
          {isAdmin && (
            <div className="mb-8 text-right">
              <Button size="lg" onClick={handleAddProduct}>
                <PlusCircle className="mr-2" size={20} />
                Add New Product
              </Button>
            </div>
          )}

          {/* Show message if no products exist */}
          {!loading && products.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold mb-4">No Products Found</h2>
              {isAdmin ? (
                <p className="text-muted-foreground">Click "Add New Product" to get started.</p>
              ) : (
                <p className="text-muted-foreground">Please check back later.</p>
              )}
            </div>
          )}

          {/* The Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product._id} // Use _id from MongoDB
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={product.image} // This is the URL from your database
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

                  {/* ADMIN BUTTONS: Edit & Delete */}
                  {/* This will only show if 'isAdmin' is true */}
                  {isAdmin && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        className="w-1/2"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="mr-2" size={16} />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-1/2"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <Trash2 className="mr-2" size={16} />
                        Delete
                      </Button>
                    </div>
                  )}
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

      {/* RENDER THE MODAL */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={productToEdit}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default Products;