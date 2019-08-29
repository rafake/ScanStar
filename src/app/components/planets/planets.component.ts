import {Component, OnInit} from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import { Planet } from '../../models/Planet';
import { PlanetsDataImagesService } from '../../services/planets-data-images.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})

export class PlanetsComponent implements OnInit {
  planetsStored: Planet[];
  in: number;
  startIndex: number = 0;
  endIndex: number = 10;
  perPage: number = 10;
  total: number;
  isLoaded: boolean = false;
  isSearched: boolean = false;
  imagesForPlanets: object = this.planetsDataImagesService.planetsImages;
  mainSearchView: boolean = false;
  planetsRequestsUrls: string[] = [];
  numberOfResultsGotFromServer: number = 10;

  constructor(private planetService: PlanetService, private planetsDataImagesService: PlanetsDataImagesService) {
  }

  getArrayFromNumber(length) {
    return new Array(Math.ceil(length / Number(this.perPage)));
  }

  updateIndex = (pageIndex: number, itemsPerPage: number) => {
    this.startIndex = pageIndex * Number(itemsPerPage);
    this.endIndex = this.startIndex + Number(itemsPerPage);
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

  unverifiedUrlNoToSendRequest = (page, start, end, perPageNo, numberOfResultsFromHttp) => {
    const pages = [];
    if (perPageNo === 10) {
      pages.push(page);
    } else if (perPageNo === 100) {
      const pageStart = Math.floor(start / numberOfResultsFromHttp);
      console.log(pageStart)
      const pageEnd = Math.floor(end / numberOfResultsFromHttp);
      for (let i = 0; i <= (pageEnd - pageStart); i++) {
        pages[i] = pageStart + i;
      }
      console.log('pageStart:', pageStart, 'pageEnd:', pageEnd, 'pages Array:', pages);
    } else {
      const pageStart = Math.floor(start / numberOfResultsFromHttp);
      let pageEnd;
      if (end % 10 === 0) {
        pageEnd = Math.floor((end - 1) / numberOfResultsFromHttp);
      } else {
        pageEnd = Math.floor((end) / numberOfResultsFromHttp);
      }
      for (let i = 0; i <= (pageEnd - pageStart); i++) {

        pages[i] = pageStart + i;
      }
      console.log('pageStart:', pageStart, 'pageEnd:', pageEnd, 'pages Array:', pages);
    }
    return pages;
  }

  getPage = (page: number, start: number, end: number, perPageNo: number) => {
    console.log('getPage launched');
    console.log('before pageIndex calculation', page, 'startIndex', start, 'endIndex', end);

    const emptyArray = [{name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}];
    let howManyHttpPages = 0;
    this.planetsRequestsUrls = [];

    const pages = this.unverifiedUrlNoToSendRequest(page, start, end, perPageNo, this.numberOfResultsGotFromServer);

    console.log('pages: ', pages);
    for (let i = 0; i < pages.length; i++) {
      console.log(this.planetService.checkIfDownloadedArray);
      console.log(this.planetService.checkIfDownloadedArray[pages[i]]);
      if (this.planetService.mainPageLoaded && ((pages[i] + 1) > (Math.ceil(this.planetService.total / this.numberOfResultsGotFromServer)))) {
        break;
      }
      this.planetsRequestsUrls.push(`https://swapi.co/api/planets/?page=${pages[i] + 1}`);
    }

    this.planetService.pages = pages;

    console.log('array with information on downloaded content', this.planetService.checkIfDownloadedArray);

    if (this.planetService.mainPageLoaded) {
      console.log('before cutting off', this.planetsRequestsUrls, 'total', this.planetService.total);
      const temporaryPlanetsRequestsUrls = this.planetsRequestsUrls.slice(0, Math.ceil(this.planetService.total / this.numberOfResultsGotFromServer));
      this.planetsRequestsUrls = temporaryPlanetsRequestsUrls;
      console.log('after cutting off', this.planetsRequestsUrls);
    }

    for (let i = 0; i < this.planetsRequestsUrls.length; i++) {
      // programme is not getting inside this loop in first running
      console.log('checkIfDownloadedArray verified the links', this.planetService.checkIfDownloadedArray);
      const regVerif = new RegExp('(\\d+)(?!.*\\d)');
      let idRegexVerif = this.planetsRequestsUrls[i].match(regVerif)[0];
      console.log('id Regex verif', idRegexVerif);
      let numberIdRegexVerif = Number(idRegexVerif);
      if (this.planetService.checkIfDownloadedArray[numberIdRegexVerif - 1] === true) {
        console.log('array with urls: ', this.planetsRequestsUrls, 'array with page indexes: ', pages);
        console.log(numberIdRegexVerif - 1);
        this.planetsRequestsUrls.splice(i, 1, undefined);
        console.log('array without unnecessary url', this.planetsRequestsUrls);
        pages.splice(i, 1, undefined);
      }
    }

    let temporaryPlanetUrls = this.planetsRequestsUrls.filter(function(el) {
      return !(el === undefined);
    });
    this.planetsRequestsUrls = temporaryPlanetUrls;
    console.log('deleting undefines', this.planetsRequestsUrls);

    console.log('Sending requests to following links (planetsRequests)', this.planetsRequestsUrls);
    console.log('Getting data for SWAPI planet pages no', pages);

    if (this.planetsRequestsUrls.length === 0) {
      console.log('HTTP request will not be sent - getting data from memory');
    }

    if (this.planetsRequestsUrls.length > 0) {
      this.isLoaded = false;

      console.log('Sending a HTTP request on verified necessary pages urls:', this.planetsRequestsUrls);

      for (let i = 0; i < this.planetsRequestsUrls.length; i++) {
        this.planetService.getPlanets(this.planetsRequestsUrls[i]).subscribe(
          (data) => {

            const reg = new RegExp('(\\d+)(?!.*\\d)');
            const idRegex = this.planetsRequestsUrls[i].match(reg)[0];
            console.log('id Regex', idRegex);
            const numberIdRegex = Number(idRegex);

            this.planetService.planetsPagesAll[numberIdRegex - 1] = data.results;

            if (!this.planetService.checkIfThePlanetsAllArrayIsFilled) {
              console.log('filling the planetPagesAll array with dummy data to prepare indexes');
              this.total = data.count;
              this.planetService.total = this.total;
              this.planetService.mainPageLoaded = true;
              howManyHttpPages = Math.ceil(this.total / data.results.length);
              console.log('there will be', howManyHttpPages, 'pages');
              for (let i = 1; i < howManyHttpPages; i++) {
                this.planetService.planetsPagesAll[i] = emptyArray;
                this.planetService.checkIfDownloadedArray[i] = false;
              }
              this.planetService.checkIfThePlanetsAllArrayIsFilled = true;
            }

            this.planetService.checkIfDownloadedArray[numberIdRegex - 1] = true;

            if (this.planetService.total < this.endIndex) {
              this.endIndex = this.planetService.total;
            }

            console.log('planet Pages All - which URL pages were downloaded', this.planetService.planetsPagesAll);
            console.log('planetStored before transformation', this.planetsStored);
            this.planetsStored = this.getPlanetStored(this.planetService.planetsPagesAll);

            console.log('moving the data to the planetService')
            this.planetService.planetAll = this.planetsStored;
            console.log('planetStored after transformation', this.planetsStored);
            this.isLoaded = true;
          });
      }

    }
  }

  linkProvider(array, attr, value) {
    let rightIndex: number;
    // if (!this.planetService.searchView) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          rightIndex = i;
          return rightIndex;
        }
      }
    // }
    // else {
    //   rightIndex = this.planetService.planetIdFromSearchEventually;
    //   // this.planetService.searchView = false;
    // }

    return rightIndex;
  }

  ngOnInit() {
    //
    // this.planetService.searchView = false;

    if (!this.planetService.mainPageLoaded) {
      console.log('first paged did not load yet - sending a request');
      this.getPage(0, 0, 9, this.perPage);
    } else {
      console.log('first page already loaded');
      this.isLoaded = true;
      this.planetsStored = this.planetService.planetAll;
      this.total = this.planetService.total;
    }

    this.planetService.filteredResults.subscribe(
      data => {
        this.mainSearchView = true;
        this.isLoaded = false;
        console.log('data from jumbotron received', data)
        this.planetsStored = data;
        this.isLoaded = true;
        this.startIndex = 0;
        this.endIndex = 10;
      }
    );

    this.planetService.isSearchedState.subscribe(
      data => {
        this.isSearched = data;
        this.planetService.isLoaded = false;
      }
    );
  }


  getFirstPageArray() {
    this.mainSearchView = false;
    this.planetService.searchView = false;
    this.planetsStored = this.planetService.planetAll;
}


}
