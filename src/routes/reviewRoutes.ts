import { Router } from 'express';
import { Review } from '../models/Review';

const router = Router();

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Adds a review and rating to a book
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookIsbn
 *               - username
 *               - comment
 *               - rating
 *             properties:
 *               bookIsbn:
 *                 type: string
 *                 example: "9780132350884"
 *               username:
 *                 type: string
 *                 example: "osman"
 *               comment:
 *                 type: string
 *                 example: "Harika bir kitap!"
 *               rating:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Review saved successfully
 */
router.post('/', async (req, res) => {
  try {
    const { bookIsbn, username, comment, rating } = req.body;
    const newReview = new Review({ bookIsbn, username, comment, rating });
    await newReview.save();
    res.status(201).json({ message: 'Review saved successfully!', review: newReview });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/reviews/{isbn}:
 *   get:
 *     summary: Gets all reviews for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         example: "9780132350884"
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/:isbn', async (req, res) => {
  try {
    const reviews = await Review.find({ bookIsbn: req.params.isbn }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;