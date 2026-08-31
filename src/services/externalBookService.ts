import axios from 'axios';

export interface ExternalBookDetails {
  title?: string;
  publish_date?: string;
  publishers?: string[];
  number_of_pages?: number;
  source: 'open_library' | 'google_books' | 'fallback';
}

export class ExternalBookService {
  private readonly openLibraryUrl = 'https://openlibrary.org/api/books';
  private readonly googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes';

  async fetchBookByIsbn(isbn: string): Promise<ExternalBookDetails> {
    const cleanIsbn = isbn.replace(/[- ]/g, '');

    // 1. DENE: Google Books API (Daha Hızlı ve Kararlı)
    try {
      const response = await axios.get(this.googleBooksUrl, {
        params: { q: `isbn:${cleanIsbn}` },
        timeout: 5000
      });

      if (response.data.totalItems > 0) {
        const volumeInfo = response.data.items[0].volumeInfo;
        return {
          title: volumeInfo.title,
          publish_date: volumeInfo.publishedDate,
          publishers: volumeInfo.publisher ? [volumeInfo.publisher] : [],
          number_of_pages: volumeInfo.pageCount,
          source: 'google_books'
        };
      }
    } catch (err: any) {
      console.log('Google books request failed, trying Open Library...', err.message);
    }

    // 2. DENE: Open Library API
    try {
      const response = await axios.get(this.openLibraryUrl, {
        params: {
          bibkeys: `ISBN:${cleanIsbn}`,
          format: 'json',
          jscmd: 'data'
        },
        timeout: 5000
      });

      const key = `ISBN:${cleanIsbn}`;
      const data = response.data[key];

      if (data) {
        return {
          title: data.title,
          publish_date: data.publish_date,
          publishers: data.publishers ? data.publishers.map((p: any) => p.name) : [],
          number_of_pages: data.number_of_pages,
          source: 'open_library'
        };
      }
    } catch (err: any) {
      console.log('Open Library request failed:', err.message);
    }

    // 3. İKİSİ DE BAŞARISIZ OLURSA
    return {
      title: 'asdsadsadsadsadsa)',
      source: 'fallback'
    };
  }
}