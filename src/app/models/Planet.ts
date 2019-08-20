export interface Planet {
  // "name": "Alderaan",
  name: string;
  // "rotation_period": "24",
  rotation_period?: string;
  // "orbital_period": "364",
  orbital_period?: string;
  // "diameter": "12500",
  diameter?: string;
  // "climate": "temperate",
  climate?: string;
  // "gravity": "1 standard",
  gravity?: string;
  // "terrain": "grasslands, mountains",
  terrain?: string;
  // "surface_water": "40",
  surface_water?: string;
  // "population": "2000000000",
  population?: string;
  // "residents": [
  //   "https://swapi.co/api/people/5/",
  //   "https://swapi.co/api/people/68/",
  //   "https://swapi.co/api/people/81/"
  //   ],
  residents?: string[];
  // "films": [
  //   "https://swapi.co/api/films/6/",
  //   "https://swapi.co/api/films/1/"
  //   ],
  films?: string[];
  // "created": "2014-12-10T11:35:48.479000Z",
  created?: string[];
  // "edited": "2014-12-20T20:58:18.420000Z",
  edited?: string[];
  // "url": "https://swapi.co/api/planets/2/"
  url?: string[];
}
