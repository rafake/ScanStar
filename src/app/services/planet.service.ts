import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  planetsPagesAll: any = [];
  isLoaded: boolean = false;
  count: number;
  public filteredResults = new Subject<any>();
  public isSearchedState = new Subject<any>();
  public residentsResults = new Subject<any>();
  public filmsResults = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getPlanets(url): Observable<any> {
    return this.http.get<any>(url);
  }

  getPlanet(id): Observable<any> {
    const urlOfPost = `https://swapi.co/api/planets/${id}/`;
    return this.http.get<any>(urlOfPost);
  }

  // sending a search request to server (url added in jumbotron component)
  getPlanetsWithSearch(url): Observable<any> {
    return this.http.get<any>(url);
  }

  // function passing the results of search to planets component (main view were the planets are displayed)
  passFilteredResults(passedData) {
    console.log(this.filteredResults);
    this.filteredResults.next(passedData);
  }

  // function passing a variable confirming that a search request has been sent
  passIsSearched(passedData) {
    this.isSearchedState.next(passedData);
  }

  getResidentsData(urlResident): Observable<any> {
      return this.http.get<any>(urlResident);
  }

  getFilmsData(urlFilm): Observable<any> {
    return this.http.get<any>(urlFilm);
  }


  // function passing the resident url from planet component to films and residents component
  passResidentUrl(passedData) {
    console.log(this.residentsResults);
    this.residentsResults.next(passedData);
  }

  // function passing the film url from planet component to films and residents component
  passFilmUrl(passedData) {
    this.filmsResults.next(passedData);
  }

}
