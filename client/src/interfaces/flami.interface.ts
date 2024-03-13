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
  last_share: string,
  shared_flami: Flami | null,
  _id: string
}