import { Cosmetic } from "./cosmetic.interface"

export interface Flami {
  owner: string,
  cosmetics: Cosmetic[],
  stamina: number,
  stats: {
    strength: number,
    speed: number,
    dexterity: number
  },
  location: {
    lat: number,
    long: number
  },
  last_action: Date,
  shared_flami: Flami | null
}