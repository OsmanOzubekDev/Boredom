import axios from 'axios';

export interface ExternalBookDetails {
  title?: string;
  publish_date?: string;
  publishers?: string[];
  number_of_pages?: number;
  source: 'open_library' | 'fallback';
}

export class ExternalBookService {
  private readonly baseUrl = 'https://openlibrary.org/api/books';

  async fetchBookByIsbn(isbn: string): Promise<ExternalBookDetails> {
    const cleanIsbn = isbn.replace(/[- ]/g, '');
    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        attempt++;
        const response = await axios.get(this.baseUrl, {
          params: {
            bibkeys: `ISBN:${cleanIsbn}`,
            format: 'json',
            jscmd: 'data'
          },
          timeout: 3000
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
        break;
      } catch (error: any) {
        if (attempt <= maxRetries) {
          await new Promise(res => setTimeout(res, 500));
        }
      }
    }

    return {
      title: 'Bilgi Alınamadı (Harici Servis Kullanılamıyor)',
      source: 'fallback'
    };
  }
}