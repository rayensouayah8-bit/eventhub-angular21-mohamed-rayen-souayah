// Ce modèle décrit les informations nécessaires pour afficher un événement.
export interface Event {
  id: string;
  title: string;
  category: 'Atelier' | 'Conférence' | 'Sport';
  date: string;
  location: string;
  price: number;
  description: string;
  image: string;
}
