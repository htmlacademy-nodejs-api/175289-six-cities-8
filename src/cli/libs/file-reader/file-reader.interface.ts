import { Offer } from '../../../shared/types/index.js';

export interface FileReader {
  read(): Offer[];
}
