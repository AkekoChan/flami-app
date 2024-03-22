export interface Badges {
  badges_sports: Badge[],
  badges_etapes: Badge[]
} 

export interface Badge {
  name: string;
  url: string;
  url_cover?: string;
  description: string;
  description_region?: string;
  owned?: boolean;
  region?: string;
}