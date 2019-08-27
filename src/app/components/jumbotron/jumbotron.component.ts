import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../../services/planet.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  searchPhrase: any = '';
  // variable created for purposes of search bar requests
  changedPlanets: any = '';
  isSearched: boolean = false;

  constructor(private planetService: PlanetService) {}

  ngOnInit() {

  }

  sendSearchRequest(inputValue) {
    // https://swapi.co/api/planets/38/"
    const urlSearch = `https://swapi.co/api/planets/?search=${inputValue}`;
    // sending a search request to server
    const searchRequest = this.planetService.getPlanetsWithSearch(urlSearch);
    // subscription to observable
    searchRequest.subscribe(planets => {
      const planetsUrl = planets.results[0].url;
      console.log(planetsUrl);
      let reg = new RegExp('([\\d]+)');
      let idRegex = planetsUrl.match(reg)[0];
      idRegex = parseInt(idRegex);
      this.planetService.searchView = true;
      console.log(this.planetService.searchView)
      console.log(idRegex);
      this.planetService.planetIdFromSearchEventually = idRegex - 2;
      // const planetsArrayFromServer = planets.results;
      // passing a planets array from server to service
      // this.planetService.plane = planetsArrayFromServer;
      // variable created for purposes of search bar requests
      this.changedPlanets = planets.results;
      // variable confirming that planets were loaded to the main view
      this.planetService.isLoaded = true;
      // variable confirming that planets were loaded after a search request
      this.isSearched = true;
      // call of the function passing the results of search to planets component (main view were the planets are displayed)
      this.planetService.passFilteredResults(this.changedPlanets);
      // call of the function passing a variable confirming that a search request has been sent
      this.planetService.passIsSearched(this.isSearched);

      this.planetService.passIdFromSearch(idRegex);
    });
  }
  onSubmit(e) {
    e.preventDefault();

  }

}
