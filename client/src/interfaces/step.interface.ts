export interface Step {
  etape: string;
  etape_numero: number;
  date: string;
  timestamp: number;
  territoire: string;
  departement: string;
  ville: string;
  plan: string | null;
  geolocalisation: {
    latitude: number;
    longitude: number;
  };
  position: {
    x: number;
    y: number;
  };
  population: number;
  code_postal: string;
}