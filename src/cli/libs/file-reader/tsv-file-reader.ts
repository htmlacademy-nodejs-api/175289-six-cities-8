import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { City, Offer, OfferComfort, OfferType, UserType } from '../../../shared/types/index.js';

export class TSVFileReader implements FileReader {
  private TSVContent = '';

  constructor(
    private readonly filePath: string,
  ) {}

  public read(): Offer[] {
    this.TSVContent = readFileSync(this.filePath, { encoding: 'utf-8' });
    if (!this.TSVContent) {
      throw new Error(`File ${this.filePath} was not read`);
    }
    return this.toArray();
  }

  private toArray(): Offer[] {
    return this.TSVContent
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map(this.parseRow);
  }

  private parseRow(row: string): Offer {
    const [
      title,
      description,
      date,
      city,
      preview,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      comforts,
      name,
      email,
      avatar,
      userType,
      comments,
      coordinates,
    ] = row.split('\t');

    return {
      title,
      description,
      postDate: new Date(date),
      city: City[city as City],
      preview,
      images: images.split(';') as [string, string, string, string, string, string],
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: Number.parseFloat(rating),
      type: OfferType[type as OfferType],
      rooms: Number.parseInt(rooms, 10),
      guests: Number.parseInt(guests, 10),
      price: Number.parseInt(price, 10),
      comforts: comforts.split(';') as OfferComfort[],
      user: {
        name,
        email,
        avatar,
        type: UserType[userType as UserType],
      },
      comments: Number.parseInt(comments, 10),
      coordinates: coordinates.split(',').map((value) => Number.parseFloat(value)) as [number, number],
    };
  }
}
