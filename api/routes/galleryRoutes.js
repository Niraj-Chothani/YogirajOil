import express from 'express'; // 1. CHANGE THIS
const router = express.Router();
import GalleryImage from '../models/galleryModel.js'; // 2. CHANGE THIS (and add .js)

// --- CREATE (upload) a new gallery image ---
// POST /api/gallery
router.post('/', async (req, res) => {
  try {
    const { src, alt } = req.body;
    const newImage = new GalleryImage({ src, alt });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- GET all gallery images ---
// GET /api/gallery
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- DELETE a gallery image by ID ---
// DELETE /api/gallery/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedImage = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!deletedImage) {
      return res.status(440).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; // 3. CHANGE THIS