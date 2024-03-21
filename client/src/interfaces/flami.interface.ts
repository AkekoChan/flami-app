import { Cosmetic } from "./cosmetic.interface"

export interface FlamiData {
  my_flami: Flami,
  kept_flami: Flami | null,
  last_trade_date: Date
}

export interface Flami {
  name: string,
  stats: {
    strength: number,
    speed: number,
    dexterity: number
  },
  cosmetics: Cosmetic[],
  location: {
    latitude: number, 
    longitude: number
  },
  _id: string,
  owner: string,
  trail: Array<{
    latitude: number;
    longitude: number;
    _id: string;
  }> | null
}