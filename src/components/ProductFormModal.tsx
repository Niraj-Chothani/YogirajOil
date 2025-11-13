
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Initial state for an empty form
const DEFAULT_FORM_STATE = {
  name: "",
  category: "",
  size: "",
  price: 0,
  image: "",
  description: "",
};

export const ProductFormModal = ({ isOpen, onClose, productToEdit, onSave }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  
  // Check if we are in "Edit" mode
  const isEditMode = Boolean(productToEdit);

  // When the modal opens, pre-fill the form if we are editing
  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        setFormData(productToEdit);
      } else {
        setFormData(DEFAULT_FORM_STATE);
      }
    }
  }, [isOpen, productToEdit, isEditMode]);

  // Update form state on any input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Convert price back to a number
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Handle the final form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Send the data back to the parent component
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Make changes to your product here. Click save when you're done."
              : "Fill in the details for your new product. Click save to add it."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} id="product-form" className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Input id="category" name="category" value={formData.category} onChange={handleChange} className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="size" className="text-right">Size</Label>
            <Input id="size" name="size" value={formData.size} onChange={handleChange} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price (₹)</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image URL</Label>
            <Input id="image" name="image" placeholder="https://..." value={formData.image} onChange={handleChange} className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3" />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          {/* This button submits the form */}
          <Button type="submit" form="product-form">
            Save Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};