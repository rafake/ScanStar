import { Injectable } from '@angular/core';
import { Planet } from '../models/Planet';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  // planets: Planet[];
  // data: Observable<any>;
  planetsAll: any;
  isLoaded: boolean = false;
  public filteredResults = new Subject<any>();
  public isSearchedState = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getPlanets(url): Observable<any> {
    return this.http.get<any>(url);
  }

  getPlanet(id): Observable<any> {
    const urlOfPost = `https://swapi.co/api/planets/${id}/`;
    return this.http.get<any>(urlOfPost);
  }

  getPlanetsWithSearch(url): Observable<any> {
    return this.http.get<any>(url);
  }

  passFilteredResults(passedData) {
    this.filteredResults.next(passedData);
  }
  passIsSearched(passedData) {
    this.isSearchedState.next(passedData);
  }



  // getAllPlanets(): Observable<any> {
  //   for (let i = 0; i < 7; i++) {
  //     this.planetsUrl = `https://swapi.co/api/planets/?page=${i + 1}`;
  //     this.http.get<any>(this.planetsUrl);
  //   }
  // }


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

