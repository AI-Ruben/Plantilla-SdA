import type { SdaFormData } from './types';

export const INITIAL_SDA_FORM_DATA: SdaFormData = {
  Campo1: '', Campo2: '', Campo3: '', Campo4: '', Campo5: '', Campo6: '',
  Campo7: '', Campo8: '',
  Campo9: [''], Campo10: [''], Campo11: [''], Campo12: [''],
  Campo13: '', Campo14: '', Campo15: '', Campo16: '', Campo17: '',
  
  activities: [{
    id: `activity-${Date.now()}`,
    description: '',
    sessions: '',
    resources: '',
    products: '',
    instruments: '',
  }],

  Campo43: '', Campo44: '', Campo45: '', Campo46: '', Campo47: '', Campo48: ''
};