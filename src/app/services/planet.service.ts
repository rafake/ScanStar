import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  planetsPagesAll: any = [];
  planetAll: any[] = [];
  pages: number[];
  mainPageLoaded: boolean = false;
  isLoaded: boolean = false;
  searchView: boolean = false;
  count: number;
  total: number;
  planetIdService: number;
  checkIfThePlanetsAllArrayIsFilled: boolean = false;
  checkIfDownloadedArray: boolean[] = [];
  planetsResidentsDownloaded: Array<[string]> = [];
  planetIdFromSearchEventually: number;
  planetsFilmsDownloaded: any[] = [];
  public filteredResults = new Subject<any>();
  public isSearchedState = new Subject<any>();
  public residentsResults = new Subject<any>();
  public filmsResults = new Subject<any>();
  public planetId = new Subject<any>();
  public planetIdFromSearchSubject = new Subject<any>();

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
    this.filteredResults.next(passedData);
  }

  // function passing a variable confirming that a search request has been sent
  passIsSearched(passedData) {
    this.searchView = true;
    this.isSearchedState.next(passedData);
  }

  // function passing a variable confirming that a search request has been sent
  passIdFromSearch(passedData) {
    this.planetIdFromSearchSubject.next(passedData);
  }

  getResidentsData(urlResident): Observable<any> {
    return this.http.get<any>(urlResident);
  }

  getFilmsData(urlFilm): Observable<any> {
    return this.http.get<any>(urlFilm);
  }

  // function passing the resident url from planet component to films and residents component
  passResidentUrl(passedData) {
    if (passedData === 'no residents') {
      return this.residentsResults.complete();
    }
    this.residentsResults.next(passedData);
  }

  // function passing the film url from planet component to films and residents component
  passFilmUrl(passedData) {
    if (passedData === 'no films') {
      return this.filmsResults.complete();
    }
    this.filmsResults.next(passedData);
  }

  passId(passedData) {
    this.planetId.next(passedData);
  }

}
