import { Router } from 'express';
import {
  getBooks,
  getBook,
  createBook,
  updateBookPut,
  updateBookPatch,
  deleteBook,
  getExternalBookInfo
} from '../controllers/bookController';
import { authenticateToken } from '../middlewares/authMiddleware';
import {
  validate,
  createBookSchema,
  updateBookPatchSchema
} from '../middlewares/validateMiddleware';

const router = Router();

/**
 * @openapi
 * /api/books:
 *   get:
 *     summary: Lists all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Book list
 */
router.get('/', getBooks);

/**
 * @openapi
 * /api/books/external/{isbn}:
 *   get:
 *     summary: Retrieves book details from an external API by ISBN
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         example: "9780132350884"
 *     responses:
 *       200:
 *         description: External book information
 */
router.get('/external/:isbn', getExternalBookInfo);

/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *     summary: Retrieves book details by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 */
router.get('/:id', getBook);

/**
 * @openapi
 * /api/books:
 *   post:
 *     summary: Creates a new book (JWT Auth required)
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Clean Code"
 *               author:
 *                 type: string
 *                 example: "Robert C. Martin"
 *               isbn:
 *                 type: string
 *                 example: "9780132350884"
 *               description:
 *                 type: string
 *                 example: "A Handbook of Agile Software Craftsmanship"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized access
 */
router.post('/', authenticateToken, validate(createBookSchema), createBook);

/**
 * @openapi
 * /api/books/{id}:
 *   put:
 *     summary: Updates book information completely (JWT Auth required)
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Refactoring"
 *               author:
 *                 type: string
 *                 example: "Martin Fowler"
 *               isbn:
 *                 type: string
 *                 example: "9780201485677"
 *               description:
 *                 type: string
 *                 example: "Improving the Design of Existing Code"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Book not found
 */
router.put('/:id', authenticateToken, validate(createBookSchema), updateBookPut);

/**
 * @openapi
 * /api/books/{id}:
 *   patch:
 *     summary: Updates book information partially (JWT Auth required)
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yeni Başlık"
 *               author:
 *                 type: string
 *                 example: "Yeni Yazar"
 *               description:
 *                 type: string
 *                 example: "Güncellenmiş açıklama"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       401:
 *         description: Unauthorized access
 */
router.patch('/:id', authenticateToken, validate(updateBookPatchSchema), updateBookPatch);

/**
 * @openapi
 * /api/books/{id}:
 *   delete:
 *     summary: Deletes a book (JWT Auth required)
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Book not found
 */
router.delete('/:id', authenticateToken, deleteBook);

export default router;