export type Language = 'es' | 'eu';

export interface Activity {
  id: string;
  description: string;
  sessions: string;
  resources: string;
  products: string;
  instruments: string;
}

export interface SdaFormData {
  Campo1: string;
  Campo2: string;
  Campo3: string;
  Campo4: string;
  Campo5: string;
  Campo6: string;
  Campo7: string;
  Campo8: string;
  Campo9: string[];
  Campo10: string[];
  Campo11: string[];
  Campo12: string[];
  Campo13: string;
  Campo14: string;
  Campo15: string;
  Campo16: string;
  Campo17: string;
  
  activities: Activity[];

  Campo43: string;
  Campo44: string;
  Campo45: string;
  Campo46: string;
  Campo47: string;
  Campo48: string;
}