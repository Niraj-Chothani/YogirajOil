import mongoose from 'mongoose'; // 1. CHANGE THIS

const galleryImageSchema = new mongoose.Schema(
  {
    src: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    alt: {
      type: String,
      required: [true, 'Please provide alt text'],
    },
  },
  {
    timestamps: true,
  }
);

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

export default GalleryImage; // 2. CHANGE THIS