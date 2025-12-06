// src/types.ts
export type Note = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  imageUrl?: string | null; // wykorzystamy przy zdjęciu z aparatu/galerii
};
