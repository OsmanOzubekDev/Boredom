import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { BookService } from '../services/bookService';

const bookService = new BookService();

export const getBooks = async (req: AuthRequest, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const getBook = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const book = await bookService.getBookById(id);
    res.status(200).json(book);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const createBook = async (req: AuthRequest, res: Response) => {
  try {
    const bookData = { ...req.body, user_id: req.user?.id };
    const newBook = await bookService.createBook(bookData);
    res.status(201).json(newBook);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const updateBookPut = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updatedBook = await bookService.replaceBook(id, req.body);
    res.status(200).json(updatedBook);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const updateBookPatch = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updatedBook = await bookService.updateBookPartial(id, req.body);
    res.status(200).json(updatedBook);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const deleteBook = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await bookService.removeBook(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const getExternalBookInfo = async (req: AuthRequest, res: Response) => {
  try {
    const isbn = req.params.isbn as string;
    const details = await bookService.getExternalBookDetails(isbn);
    res.status(200).json(details);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};