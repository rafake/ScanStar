import { Injectable } from '@angular/core';
import { Planet } from '../models/Planet';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  // planets: Planet[];
  // data: Observable<any>;
  planetsUrl: string = `https://swapi.co/api/planets/`;

  constructor(private http: HttpClient) {
  }

  getPlanets(): Observable<any> {
    return this.http.get<any>(this.planetsUrl);
  }
}
//   getPlanets(planetsUrl: string): Observable<any> {
//       return this.http.get<any>(planetsUrl);
//   }
// }
  //   this.planets = [
  //     {
  //       name: 'Alderaan',
  //     },
  //     {
  //       name: 'Yavin IV',
  //     },
  //     {
  //       name: 'Hoth',
  //     }
  //   ];
  // }
  // getPlanets(): Observable<Planet[]> {
  //   console.log('fetcthing planets from the service');
  //   return of(this.planets);
  // }
  //
  // getData() {
  //   this.data = new Observable(observer => {
  //     setTimeout(() => {
  //       observer.next(1);
  //     }, 1000);
  //
  //     setTimeout(() => {
  //       observer.next(2);
  //     }, 4000);
  //
  //     setTimeout(() => {
  //       observer.next(3);
  //     }, 8000);
  //
  //     setTimeout(() => {
  //       observer.next(4);
  //     }, 12000);
  //   });
  //   return this.data;
  // }

