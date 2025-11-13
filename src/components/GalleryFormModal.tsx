import { useState } from "react";
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

// Initial state for an empty form
const DEFAULT_FORM_STATE = {
  src: "", // The image URL
  alt: "", // The alt text
};

export const GalleryFormModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);

  // Update form state on any input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle the final form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Send the data back to the parent component
    setFormData(DEFAULT_FORM_STATE); // Reset form
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Gallery Image</DialogTitle>
          <DialogDescription>
            Enter the URL and a description for the new image. Click save to add it.
          </DialogDescription>
        </DialogHeader>

        {/* Form for adding/editing */}
        <form onSubmit={handleSubmit} id="gallery-form" className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="src" className="text-right">Image URL</Label>
            {/* Remember to use /images/your-image-name.jpg here */}
            <Input 
              id="src" 
              name="src" 
              placeholder="/images/hero-oil.jpg" 
              value={formData.src} 
              onChange={handleChange} 
              className="col-span-3" 
              required 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alt" className="text-right">Alt Text</Label>
            <Input 
              id="alt" 
              name="alt" 
              placeholder="Premium Groundnut Oil" 
              value={formData.alt} 
              onChange={handleChange} 
              className="col-span-3" 
              required 
            />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          {/* This button submits the form */}
          <Button type="submit" form="gallery-form">
            Save Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};