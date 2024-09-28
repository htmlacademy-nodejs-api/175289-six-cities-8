import { City } from './city.enum.js';
import { OfferType } from './offer-type.enum.js';
import { OfferComfort } from './offer-comfort.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  images: [string, string, string, string, string, string];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  comforts: OfferComfort[];
  user: User;
  comments: number;
  coordinates: [number, number];
}
