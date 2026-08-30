import { BookRepository, Book } from '../repositories/bookRepository';
import { ExternalBookService, ExternalBookDetails } from './externalBookService';

export class BookService {
  private bookRepo: BookRepository;
  private externalService: ExternalBookService;

  constructor() {
    this.bookRepo = new BookRepository();
    this.externalService = new ExternalBookService();
  }

  async getAllBooks(page: number = 1, limit: number = 10, search?: string) {
  return await this.bookRepo.findAll(page, limit, search);
}

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepo.findById(id);
    if (!book) {
      const error: any = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }
    return book;
  }

  async createBook(bookData: Book): Promise<Book> {
    if (!bookData.title || !bookData.author) {
      const error: any = new Error('Title and Author are required');
      error.statusCode = 400;
      throw error;
    }
    return await this.bookRepo.create(bookData);
  }

  async replaceBook(id: number, bookData: Book): Promise<Book> {
    await this.getBookById(id);
    const updated = await this.bookRepo.updatePut(id, bookData);
    return updated!;
  }

  async updateBookPartial(id: number, fields: Partial<Book>): Promise<Book> {
    await this.getBookById(id);
    const updated = await this.bookRepo.updatePatch(id, fields);
    return updated!;
  }

  async removeBook(id: number): Promise<void> {
    await this.getBookById(id);
    await this.bookRepo.delete(id);
  }

  // Harici API entegrasyonu için metod
  async getExternalBookDetails(isbn: string): Promise<ExternalBookDetails> {
    return await this.externalService.fetchBookByIsbn(isbn);
  }
}