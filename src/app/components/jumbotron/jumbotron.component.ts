import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import set = Reflect.set;

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  searchPhrase: any = '';
  changedPlanets: any = '';
  isSearched: boolean = false;

  constructor(private planetService: PlanetService) {}

  ngOnInit() {

  }

  sendSearchRequest(a) {
    const urlSearch = `https://swapi.co/api/planets/?search=${a}`;
    console.log(urlSearch);
    const searchRequest = this.planetService.getPlanetsWithSearch(urlSearch);
    searchRequest.subscribe(planets => {
      const a = planets.results;
      console.log(planets.results);
      // this.planetsStored = a;
      this.planetService.planetsAll = a;
      console.log(this.planetService.planetsAll);
      this.changedPlanets = a;
      this.planetService.isLoaded = true;
      this.isSearched = true;
      this.planetService.passFilteredResults(this.changedPlanets);
      this.planetService.passIsSearched(this.isSearched);
    });
  }
  onSubmit(e) {
    e.preventDefault();

  }

}
