import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  bookIsbn: string;     // Hangi kitaba yapıldı (ISBN ile bağlıyoruz)
  username: string;     // Yorumu yapan kullanıcı
  comment: string;      // Yorum metni
  rating: number;       // Beğeni/Puan (1-5 arası)
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  bookIsbn: { type: String, required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema);