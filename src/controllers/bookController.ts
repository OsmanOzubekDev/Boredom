import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/bookService';
import { ExternalBookService } from '../services/externalBookService';
import { CustomError } from '../middlewares/errorHandler';
import { sendBookNotification } from '../config/rabbitmq';

const bookService = new BookService();
const externalBookService = new ExternalBookService();

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;

    const result = await bookService.getAllBooks(page, limit, search);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const book = await bookService.getBookById(Number(id));
    if (!book) {
      throw new CustomError(404, 'Book not found');
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBook = await bookService.createBook(req.body);

    // RabbitMQ kuyruğuna mesajı gönderiyoruz
    await sendBookNotification({
      event: 'BOOK_CREATED',
      title: newBook.title,
      timestamp: new Date()
    });

    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBookPut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedBook = await bookService.replaceBook(Number(id), req.body);
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const updateBookPatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedBook = await bookService.updateBookPartial(Number(id), req.body);
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await bookService.removeBook(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getExternalBookInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isbn } = req.params;
    const bookInfo = await bookService.getExternalBookDetails(isbn as string);
    res.json(bookInfo);
  } catch (error) {
    next(error);
  }
};