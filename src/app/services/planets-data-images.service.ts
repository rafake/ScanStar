import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanetsDataImagesService {
  // object with prepared images' urls of planets
  planetsImages: object = {
    'Alderaan': './assets/images/planets-images/Planet_1.png',
    'Yavin IV' : './assets/images/planets-images/Planet_2.png',
    'Hoth': './assets/images/planets-images/Planet_3.png',
    'Dagobah': './assets/images/planets-images/Planet_4.png',
    'Bespin': './assets/images/planets-images/Planet_5.png',
    'Endor': './assets/images/planets-images/Planet_6.png',
    'Naboo': './assets/images/planets-images/Planet_7.png',
    'Coruscant': './assets/images/planets-images/Planet_8.png',
    'Kamino': './assets/images/planets-images/Planet_9.png',
    'Geonosis': './assets/images/planets-images/Planet_10.png',
    'Utapau': './assets/images/planets-images/Planet_11.png',
    'Mustafar': './assets/images/planets-images/Planet_12.png',
    'Kashyyyk': './assets/images/planets-images/Planet_13.png',
    'Polis Massa' : './assets/images/planets-images/Planet_14.png',
    'Mygeeto': './assets/images/planets-images/Planet_15.png',
    'Felucia': './assets/images/planets-images/Planet_16.png',
    'Cato Neimoidia': './assets/images/planets-images/Planet_17.png',
    'Saleucami': './assets/images/planets-images/Planet_18.png',
    'Stewjon': './assets/images/planets-images/Planet_19.png',
    'Eriadu': './assets/images/planets-images/Planet_20.png',
    'Corellia': './assets/images/planets-images/Planet_21.png',
    'Rodia': './assets/images/planets-images/Planet_22.png',
    'Nal Hutta': './assets/images/planets-images/Planet_23.png',
    'Dantooine': './assets/images/planets-images/Planet_24.png',
    'Bestine IV' : './assets/images/planets-images/Planet_25.png',
    'Ord Mantell': './assets/images/planets-images/Planet_26.png',
    'unknown': './assets/images/planets-images/Planet_27.png',
    'Trandosha': './assets/images/planets-images/Planet_28.png',
    'Socorro': './assets/images/planets-images/Planet_29.png',
    'Mon Cala': './assets/images/planets-images/Planet_30.png',
    'Chandrila': './assets/images/planets-images/Planet_31.png',
    'Sullust': './assets/images/planets-images/Planet_32.png',
    'Toydaria': './assets/images/planets-images/Planet_33.png',
    'Malastare': './assets/images/planets-images/Planet_34.png',
    'Dathomir': './assets/images/planets-images/Planet_35.png',
    'Ryloth': './assets/images/planets-images/Planet_36.png',
    'Aleen Minor' : './assets/images/planets-images/Planet_37.png',
    'Vulpter': './assets/images/planets-images/Planet_38.png',
    'Troiken': './assets/images/planets-images/Planet_39.png',
    'Tund': './assets/images/planets-images/Planet_40.png',
    'Haruun Kal' : './assets/images/planets-images/Planet_41.png',
    'Cerea': './assets/images/planets-images/Planet_42.png',
    'Glee Anselm' : './assets/images/planets-images/Planet_43.png',
    'Iridonia': './assets/images/planets-images/Planet_44.png',
    'Tholoth': './assets/images/planets-images/Planet_45.png',
    'Iktotch': './assets/images/planets-images/Planet_46.png',
    'Quermia': './assets/images/planets-images/Planet_47.png',
    'Dorin': './assets/images/planets-images/Planet_48.png',
    'Champala': './assets/images/planets-images/Planet_49.png',
    'Mirial': './assets/images/planets-images/Planet_50.png',
    'Serenno': './assets/images/planets-images/Planet_51.png',
    'Concord Dawn' : './assets/images/planets-images/Planet_52.png',
    'Zolan': './assets/images/planets-images/Planet_53.png',
    'Ojom': './assets/images/planets-images/Planet_54.png',
    'Skako': './assets/images/planets-images/Planet_55.png',
    'Muunilinst': './assets/images/planets-images/Planet_56.png',
    'Shili': './assets/images/planets-images/Planet_57.png',
    'Kalee': './assets/images/planets-images/Planet_58.png',
    'Umbara': './assets/images/planets-images/Planet_59.png',
    'Tatooine': './assets/images/planets-images/Planet_60.png',
    'Jakku': './assets/images/planets-images/Planet_61.png'
  };
  // end of the object

  constructor() { }
}
