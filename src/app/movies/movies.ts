import { Actor } from '../actors/actors'; // Import Actor interface

export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  genre: string;
  rating: number;
  actors: Actor[];
}
