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

const router = Router();

router.get('/', getBooks);
// DİKKAT: /external rotası /:id rotasından ÖNCE gelmeli!
router.get('/external/:isbn', getExternalBookInfo);
router.get('/:id', getBook);

router.post('/', authenticateToken, createBook);
router.put('/:id', authenticateToken, updateBookPut);
router.patch('/:id', authenticateToken, updateBookPatch);
router.delete('/:id', authenticateToken, deleteBook);

export default router;