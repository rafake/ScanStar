import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../../services/planet.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  searchPhrase: any = '';
  changedPlanets: any = '';
  isSearched: boolean = false;
  alreadyInMemory: boolean = false;
  index: number;

  constructor(private planetService: PlanetService) {}

  ngOnInit() {

  }

  sendSearchRequest(inputValue) {
    for (let i = 0; i < this.planetService.planetAll.length; i++) {
      if (this.planetService.planetAll[i].name == inputValue) {
        this.alreadyInMemory = true;
        this.index = i;
      }
    }

    if (this.alreadyInMemory) {
      console.log('getting data from memory', this.planetService.planetAll[this.index]);
      this.planetService.searchView = true;

      let url = this.planetService.planetAll[this.index].url;
      console.log(url);
      let reg1 = new RegExp('(\\d+)(?!.*\\d)');
      let idRegex1 = url.match(reg1)[0];
      let tempIdRegex1 = Number(idRegex1);
      console.log(tempIdRegex1);

      this.planetService.planetIdService = tempIdRegex1 - 1;

      this.planetService.passFilteredResults([this.planetService.planetAll[this.index]]);
      // call of the function passing a variable confirming that a search request has been sent
      this.planetService.passIsSearched(this.isSearched);

      this.planetService.passIdFromSearch(tempIdRegex1);
      this.alreadyInMemory = false;
    } else {
      const urlSearch = `https://swapi.co/api/planets/?search=${inputValue}`;
      // sending a search request to server
      const searchRequest = this.planetService.getPlanetsWithSearch(urlSearch);
      // subscription to observable
      searchRequest.subscribe(planets => {
        const planetsUrl = planets.results[0].url;
        console.log(planetsUrl);
        let reg = new RegExp('(\\d+)(?!.*\\d)');
        let idRegex = planetsUrl.match(reg)[0];
        let tempIdRegex = Number(idRegex);
        this.planetService.searchView = true;
        console.log(this.planetService.searchView);
        console.log(tempIdRegex);
        this.changedPlanets = planets.results;
        console.log(planets.results)
        // variable confirming that planets were loaded to the main view
        this.planetService.isLoaded = true;
        // variable confirming that planets were loaded after a search request
        this.isSearched = true;
        // call of the function passing the results of search to planets component (main view were the planets are displayed)
        this.planetService.passFilteredResults(this.changedPlanets);
        // call of the function passing a variable confirming that a search request has been sent
        this.planetService.passIsSearched(this.isSearched);
        this.planetService.planetIdService = tempIdRegex - 1;

        this.planetService.passIdFromSearch(tempIdRegex);
      });
    }

  }

  onSubmit(e) {
    e.preventDefault();

  }

}
