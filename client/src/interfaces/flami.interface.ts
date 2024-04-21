import { Cosmetic } from "./cosmetic.interface"

export interface Flami {
  name: string;
  cosmetics: Cosmetic[];
  location: {
    latitude: number; 
    longitude: number;
  };
  last_trade: Date | null;
  _id: string;
  owner: string;
  trail: Array<{
    latitude: number;
    longitude: number;
    _id: string;
  }> | null
}