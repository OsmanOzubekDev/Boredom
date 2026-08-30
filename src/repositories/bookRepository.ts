import { pool } from '../config/database';

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export class BookRepository {
  // Pagination & Search Eklenmiş findAll Metodu
  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM books';
    const values: any[] = [];

    if (search) {
      query += ' WHERE title ILIKE $1 OR author ILIKE $1';
      values.push(`%${search}%`);
      query += ` ORDER BY id DESC LIMIT $2 OFFSET $3`;
      values.push(limit, offset);
    } else {
      query += ` ORDER BY id DESC LIMIT $1 OFFSET $2`;
      values.push(limit, offset);
    }

    const result = await pool.query(query, values);

    // Toplam kitap sayısını alma (Pagination metadata için)
    const countQuery = search
      ? 'SELECT COUNT(*) FROM books WHERE title ILIKE $1 OR author ILIKE $1'
      : 'SELECT COUNT(*) FROM books';
    const countValues = search ? [`%${search}%`] : [];
    const countResult = await pool.query(countQuery, countValues);
    const totalBooks = parseInt(countResult.rows[0].count, 10);

    return {
      data: result.rows,
      pagination: {
        totalBooks,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        limit
      }
    };
  }

  async findById(id: number): Promise<Book | null> {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(bookData: Book): Promise<Book> {
    const { title, author, isbn, description, user_id } = bookData;
    const query = `
      INSERT INTO books (title, author, isbn, description, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [title, author, isbn, description, user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updatePut(id: number, bookData: Book): Promise<Book | null> {
    const { title, author, isbn, description } = bookData;
    const query = `
      UPDATE books 
      SET title = $1, author = $2, isbn = $3, description = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5 
      RETURNING *
    `;
    const result = await pool.query(query, [title, author, isbn, description, id]);
    return result.rows[0] || null;
  }

  async updatePatch(id: number, fields: Partial<Book>): Promise<Book | null> {
    const keys = Object.keys(fields).filter(key => fields[key as keyof Book] !== undefined);
    if (keys.length === 0) return this.findById(id);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(key => fields[key as keyof Book]);
    
    const query = `
      UPDATE books 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $${keys.length + 1} 
      RETURNING *
    `;
    
    const result = await pool.query(query, [...values, id]);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}