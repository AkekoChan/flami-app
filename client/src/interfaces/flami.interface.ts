import { Cosmetic } from "./cosmetic.interface"

export interface FlamiData {
  my_flami: Flami,
  keeped_flami: Flami | null,
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
    lat: number, 
    long: number
  },
  _id: string
}