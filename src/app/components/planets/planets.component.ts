import {Component, getPlatform, OnInit} from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import { SlicePipe } from '@angular/common';
import { Planet } from '../../models/Planet';
import { concat, observable, Subject} from 'rxjs';
import { PlanetsDataImagesService } from '../../services/planets-data-images.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})

export class PlanetsComponent implements OnInit {
  planetsStored: Planet[];
  planetsArray: Array<any> = [];
  combined: any;
  page: number = 1;
  in: number;
  errorMessage: string;
  startIndex: number = 0;
  endIndex: number = 10;
  perPage: number = 10;
  total: number;
  isLoaded: boolean = false;
  isSearched: boolean = false;
  imagesForPlanets: object = this.planetsDataImagesService.planetsImages;
  mainSearchView: boolean = false;
  // checkIfThePlanetsAllArrayIsFilled: boolean = false;
  // checkIfDownloadedArray: boolean[] = [];

  constructor(private planetService: PlanetService, private planetsDataImagesService: PlanetsDataImagesService) {
  }

  getArrayFromNumber(length) {
    return new Array(Math.ceil(length / Number(this.perPage)));
  }

  updateIndex = (pageIndex: number, itemsPerPage: number) => {
    this.startIndex = pageIndex * Number(itemsPerPage);
    this.endIndex = this.startIndex + Number(itemsPerPage);
    console.log(this.endIndex, typeof this.endIndex);
    this.getPage(pageIndex, this.startIndex, this.endIndex, Number(itemsPerPage));
  }

  getPlanetStored(arr) {
    let temporaryArray = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        temporaryArray = [...temporaryArray, arr[i][j]];
      }
    }
    return temporaryArray;
  }
// 7 strona
  getPage = (page: number, start: number, end: number, perPageNo: number) => {
    // link do 8 strony
    const NumberOfResultsGotFromServer = 10;
    page = Math.ceil((page * perPageNo) / NumberOfResultsGotFromServer);
    const urlPlanets = `https://swapi.co/api/planets/?page=${page + 1}`;
    const planetsRequest = this.planetService.getPlanets(urlPlanets);

    let indexInPlanetAllCountedFromZero = page;
    const emptyArray = [{name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}];
    let howManyHttpPages: number;

    // już sa uzupełnione wyniki (ta strona została pobrana)
    console.log(this.planetService.checkIfDownloadedArray[indexInPlanetAllCountedFromZero]);
    if (this.planetService.checkIfDownloadedArray[indexInPlanetAllCountedFromZero] && this.planetService.checkIfThePlanetsAllArrayIsFilled) {
      this.planetsStored = this.getPlanetStored(this.planetService.planetsPagesAll);
      console.log(this.planetsStored);
      this.isLoaded = true;
    } else {
      this.isLoaded = false;
      planetsRequest.subscribe(
        (data) => {
          this.total = data.count;
          this.planetService.total = this.total;
          console.log(indexInPlanetAllCountedFromZero);
          this.planetService.planetsPagesAll[indexInPlanetAllCountedFromZero] = data.results;


          // zapełniamy całą tablicę ze stronami pustymi stronami tam gdzie nie została pobrana, aby ustalić indeksy
          if (!this.planetService.checkIfThePlanetsAllArrayIsFilled) {
            this.planetService.mainPageLoaded = true;
            howManyHttpPages = Math.ceil(this.total / data.results.length);
            console.log(howManyHttpPages);
            for (let i = 1; i < howManyHttpPages; i++) {
              this.planetService.planetsPagesAll[i] = emptyArray;
              this.planetService.checkIfDownloadedArray[i] = false;
            }
            this.planetService.checkIfThePlanetsAllArrayIsFilled = true;
          }

          this.planetService.checkIfDownloadedArray[indexInPlanetAllCountedFromZero] = true;

          console.log(this.planetService.planetsPagesAll);
          this.planetsStored = this.getPlanetStored(this.planetService.planetsPagesAll);
          this.planetService.planetAll = this.planetsStored;
          console.log(this.planetsStored);
          this.isLoaded = true;
        });
    }
  }

  ngOnInit() {

    this.planetService.searchView = false;

    // zapytanie o pierwszą listę planet
    if (!this.planetService.mainPageLoaded) {
      this.getPage(0, 0, 9, this.perPage);
    } else {
      this.isLoaded = true;
      this.planetsStored = this.planetService.planetAll;
      this.total = this.planetService.total;
    }

    this.planetService.filteredResults.subscribe(
      data => {
        this.mainSearchView = true;
        this.isLoaded = false;
        this.planetsStored = data;
        this.isLoaded = true;
      }
    );

    this.planetService.isSearchedState.subscribe(
      data => {
        this.isSearched = data;
        this.planetService.isLoaded = false;
      }
    );
  }

  linkProvider(array, attr, value) {
    let rightIndex: number;
    if (!this.planetService.searchView) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          rightIndex = i;
          return rightIndex;
        }
      }
    } else {
      rightIndex = this.planetService.planetIdFromSearchEventually;
      this.planetService.searchView = false;
    }

    return rightIndex;
  }
}
