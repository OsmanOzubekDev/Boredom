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
 *     summary: Tüm kitapları listeler
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Kitap listesi
 */
router.get('/', getBooks);

/**
 * @openapi
 * /api/books/external/{isbn}:
 *   get:
 *     summary: Harici API'den ISBN numarasına göre kitap detayı getirir
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
 *         description: Harici kitap bilgileri
 */
router.get('/external/:isbn', getExternalBookInfo);

/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *     summary: ID'ye göre kitap detayı getirir
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
 *         description: Kitap detayı
 *       404:
 *         description: Kitap bulunamadı
 */
router.get('/:id', getBook);

/**
 * @openapi
 * /api/books:
 *   post:
 *     summary: Yeni bir kitap ekler (JWT Auth gerekli)
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
 *         description: Kitap oluşturuldu
 *       400:
 *         description: Geçersiz veri
 *       401:
 *         description: Yetkisiz erişim
 */
router.post('/', authenticateToken, validate(createBookSchema), createBook);

/**
 * @openapi
 * /api/books/{id}:
 *   put:
 *     summary: Kitap bilgilerini tamamen günceller (JWT Auth gerekli)
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
 *         description: Kitap güncellendi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Kitap bulunamadı
 */
router.put('/:id', authenticateToken, validate(createBookSchema), updateBookPut);

/**
 * @openapi
 * /api/books/{id}:
 *   patch:
 *     summary: Kitap bilgilerini kısmi günceller (JWT Auth gerekli)
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
 *         description: Kitap güncellendi
 *       401:
 *         description: Yetkisiz erişim
 */
router.patch('/:id', authenticateToken, validate(updateBookPatchSchema), updateBookPatch);

/**
 * @openapi
 * /api/books/{id}:
 *   delete:
 *     summary: Kitap siler (JWT Auth gerekli)
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
 *         description: Silindi
 *       401:
 *         description: Yetkisiz erişim
 *       404:
 *         description: Kitap bulunamadı
 */
router.delete('/:id', authenticateToken, deleteBook);

export default router;