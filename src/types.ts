// Types pour l'application

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  imagesannexes?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isPast: boolean;
}

export interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
}

export interface Annonce {
  id: string;
  title: string;
  description: string;
  contact: string;
  category: string;
  date: string;
  author: string;
  isValidated: boolean;
}
