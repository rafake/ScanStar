import {Component, getPlatform, OnInit} from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import { Planet } from '../../models/Planet';
import {concat, observable, Subject} from 'rxjs';
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
  checkIfThePlanetsAllArrayIsFilled: boolean = false;
  checkIfDownloadedArray: boolean[] = [];

  constructor(private planetService: PlanetService, private planetsDataImagesService: PlanetsDataImagesService) {
  }

  getArrayFromNumber(length) {
    return new Array(Math.ceil(length / this.perPage));
  }

  updateIndex = (pageIndex, itemsPerPage) => {
    this.startIndex = pageIndex * itemsPerPage;
    this.endIndex = this.startIndex + itemsPerPage;
    this.getPage(pageIndex, this.startIndex, this.endIndex);
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


  getPage = (page: number, start: number, end: number) => {
    const urlPlanets = `https://swapi.co/api/planets/?page=${page + 1}`;
    const planetsRequest = this.planetService.getPlanets(urlPlanets);
    let indexInPlanetAllCountedFromZero = page;
    const emptyArray = [{name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}, {name: 'no data'}];
    let howManyHttpPages: number;

    // już sa uzupełnione wyniki (ta strona została pobrana)
    console.log(this.checkIfDownloadedArray[indexInPlanetAllCountedFromZero]);
    if (this.checkIfDownloadedArray[indexInPlanetAllCountedFromZero] && this.checkIfThePlanetsAllArrayIsFilled) {
      this.planetsStored = this.getPlanetStored(this.planetService.planetsPagesAll);
      console.log(this.planetsStored);
      this.isLoaded = true;
    } else {
      this.isLoaded = false;
      planetsRequest.subscribe(
        (data) => {
          this.total = data.count;
          console.log(indexInPlanetAllCountedFromZero);
          this.planetService.planetsPagesAll[indexInPlanetAllCountedFromZero] = data.results;


          // zapełniamy całą tablicę ze stronami pustymi stronami tam gdzie nie została pobrana, aby ustalić indeksy
          if (!this.checkIfThePlanetsAllArrayIsFilled) {
            howManyHttpPages = Math.ceil(this.total / data.results.length);
            console.log(howManyHttpPages);
            for (let i = 1; i < howManyHttpPages; i++) {
              this.planetService.planetsPagesAll[i] = emptyArray;
              this.checkIfDownloadedArray[i] = false;
            }
            this.checkIfThePlanetsAllArrayIsFilled = true;
          }

          this.checkIfDownloadedArray[indexInPlanetAllCountedFromZero] = true;

          console.log(this.planetService.planetsPagesAll);
          this.planetsStored = this.getPlanetStored(this.planetService.planetsPagesAll);
          console.log(this.planetsStored);
          this.isLoaded = true;
        });
    }
  }

  ngOnInit() {

    // zapytanie o pierwszą listę planet
    this.getPage(0, 0, 9);


    this.planetService.filteredResults.subscribe(
      data => {
        console.log(data);
        this.planetsStored = data; }
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
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        rightIndex = i;
        return rightIndex;
      }
    }
    return rightIndex;
    }

    // consequtiveRequests() {
    //   if (!this.planetService.isLoaded) {
    //     this.planetsArray = [];
    //     const urlPlanets = `https://swapi.co/api/planets/`;
    //     const planetsRequest = this.planetService.getPlanets(urlPlanets);
    //
    //     planetsRequest.subscribe((planets) => {
    //       console.log(planets);
    //       console.log(planets.count);
    //       this.planetService.count = planets.count;
    //       this.planetsCount = planets.count;
    //       console.log(planets.next);
    //       console.log(planets.results);
    //       this.planetsStored = planets.results;
    //       this.planetService.planetsPagesAll = this.planetsStored;
    //       this.planetService.isLoaded = true;
    //       this.isLoaded = this.planetService.isLoaded;
    //     });
    //   } else {
    //     this.isSearched = false;
    //     this.isLoaded = this.planetService.isLoaded;
    //     return this.planetsStored = this.planetService.planetsPagesAll;
    //   }
    // }
      // cobining all observables under one variable
      // this.combined = concat(page1Request, page2Request, page3Request, page4Request, page5Request, page6Request, page7Request);
  //     this.combined = concat(page1Request, page2Request);
  //     console.log(this.combined);
  //     // subcription to variable and getting results object
  //     this.combined.subscribe(planets => {
  //       // array with planets' data is saved under the result key
  //       let planetsArrayFromServer = planets.results;
  //       console.log(planetsArrayFromServer);
  //       this.planetsArray.push(planetsArrayFromServer);
  //       // variable confirming that are not currently searched, but this is the first load of planets
  //       this.isSearched = false;
  //
  //     });
  //     setTimeout(() => {
  //       console.log(this.planetsArray);
  //       for (let i = 0; i < 7; i++) {
  //         console.log(this.planetsArray[i]);
  //       }
  //       // for (let i = 0; i < 6; i++) {
  //       //   for (let j = 0; j < 10; j++) {
  //       //     console.log(this.planetsArray[i][j].name);
  //       //   }
  //       //
  //       // }
  //       // destructurization of the planets' arrays from different requests into one temporary planets array
  //       this.planetsArray = [...this.planetsArray[0], ...this.planetsArray[1]];
  //       // this.planetsArray = [...this.planetsArray[0], ...this.planetsArray[1], ...this.planetsArray[2], ...this.planetsArray[3], ...this.planetsArray[4], ...this.planetsArray[5], ...this.planetsArray[6]];
  //       // importing of the planets array from temporary to final variable
  //       this.planetsStored = this.planetsArray;
  //
  //       console.log(this.planetsStored);
  //
  //       // saving the planets object in the PlanetService
  //       this.planetService.planetsPagesAll = this.planetsArray;
  //       // information that planets has been loaded and the loader can be hidden
  //       this.planetService.isLoaded = true;
  //       // passing the information about being loaded to the PlanetService
  //       this.isLoaded = this.planetService.isLoaded;
  //
  //     }, 3000);
  //   } else {
  //     this.isSearched = false;
  //     this.isLoaded = this.planetService.isLoaded;
  //     return this.planetsStored = this.planetService.planetsPagesAll;
  //   }
  // }





}

// consequtiveRequests() {
//   if (!this.planetService.isLoaded) {
//     this.planetsArray = [];
//     const urlPlanets = `https://swapi.co/api/planets/?page=1`;
//     const page1Request = this.planetService.getPlanets(urlAPI1);
//     const urlAPI2 = `https://swapi.co/api/planets/?page=2`;
//     const page2Request = this.planetService.getPlanets(urlAPI2);
//     // const urlAPI3 = `https://swapi.co/api/planets/?page=3`;
//     // const page3Request = this.planetService.getPlanets(urlAPI3);
//     // const urlAPI4 = `https://swapi.co/api/planets/?page=4`;
//     // const page4Request = this.planetService.getPlanets(urlAPI4);
//     // const urlAPI5 = `https://swapi.co/api/planets/?page=5`;
//     // const page5Request = this.planetService.getPlanets(urlAPI5);
//     // const urlAPI6 = `https://swapi.co/api/planets/?page=6`;
//     // const page6Request = this.planetService.getPlanets(urlAPI6);
//     // const urlAPI7 = `https://swapi.co/api/planets/?page=7`;
//     // const page7Request = this.planetService.getPlanets(urlAPI7);
//
//     // cobining all observables under one variable
//     // this.combined = concat(page1Request, page2Request, page3Request, page4Request, page5Request, page6Request, page7Request);
//     this.combined = concat(page1Request, page2Request);
//     console.log(this.combined);
//     // subcription to variable and getting results object
//     this.combined.subscribe(planets => {
//       // array with planets' data is saved under the result key
//       let planetsArrayFromServer = planets.results;
//       console.log(planetsArrayFromServer);
//       this.planetsArray.push(planetsArrayFromServer);
//       // variable confirming that are not currently searched, but this is the first load of planets
//       this.isSearched = false;
//
//     });
//     setTimeout(() => {
//       console.log(this.planetsArray);
//       for (let i = 0; i < 7; i++) {
//         console.log(this.planetsArray[i]);
//       }
//       // for (let i = 0; i < 6; i++) {
//       //   for (let j = 0; j < 10; j++) {
//       //     console.log(this.planetsArray[i][j].name);
//       //   }
//       //
//       // }
//       // destructurization of the planets' arrays from different requests into one temporary planets array
//       this.planetsArray = [...this.planetsArray[0], ...this.planetsArray[1]];
//       // this.planetsArray = [...this.planetsArray[0], ...this.planetsArray[1], ...this.planetsArray[2], ...this.planetsArray[3], ...this.planetsArray[4], ...this.planetsArray[5], ...this.planetsArray[6]];
//       // importing of the planets array from temporary to final variable
//       this.planetsStored = this.planetsArray;
//
//       console.log(this.planetsStored);
//
//       // saving the planets object in the PlanetService
//       this.planetService.planetsPagesAll = this.planetsArray;
//       // information that planets has been loaded and the loader can be hidden
//       this.planetService.isLoaded = true;
//       // passing the information about being loaded to the PlanetService
//       this.isLoaded = this.planetService.isLoaded;
//
//     }, 3000);
//   } else {
//     this.isSearched = false;
//     this.isLoaded = this.planetService.isLoaded;
//     return this.planetsStored = this.planetService.planetsPagesAll;
//   }
// }

// zapytanie
//     planetsRequest.subscribe(res => {
//       // pytamy o ilość wszystkich planet
//       this.total = res.count;
//       // potwierdzamy, że dostaliśmy odpowiedź
//       this.isLoaded = true;
//       // dodajemy odpowiedź do listy planet
//       if (this.planetsStored === undefined) {
//         console.log('tablica była pusta', this.planetsStored);
//         this.planetsStored = res.results;
//       } else {
//         console.log('tablica już miała dane', this.planetsStored);
//         this.planetsStored = [...this.planetsStored, ...res.results];
//       }
//       console.log('dane po operacji na planetStored', this.planetsStored);
//
//       if (this.planetService.planetsPagesAll === undefined) {
//         console.log('tablica była pusta', this.planetService.planetsPagesAll);
//         this.planetService.planetsPagesAll[page] = res.results;
//         //
//         // } else {
//         //   console.log('tablica już miała dane', this.planetService.planetsPagesAll);
//         //   this.planetService.planetsPagesAll = [...this.planetService.planetsPagesAll, res.results];
//         // }
//         console.log('dane po operacji na planetService.planetsPagesAll', this.planetService.planetsPagesAll);
//
//         this.planetService.isLoaded = this.isLoaded;
//       }});
//   }
// }
// można dodać this.isLoaded na false
// console.log(this.planetService.planetsPagesAll);
//
// if (this.planetService.planetsPagesAll[page - 1] === undefined) {
//   let urlPlanets = `https://swapi.co/api/planets/?page=${page}`;
//   const planetsRequest = this.planetService.getPlanets(urlPlanets);
//   planetsRequest.subscribe(res => {
//     this.planetService.planetsPagesAll[page - 1] = res.results;
//     console.log(this.planetService.planetsPagesAll);
//     console.log(res);
//     for (let i = 1; i <= page; i++) {
//       if (this.planetService.planetsPagesAll[i - 1] === undefined) {
//         console.log(this.planetService.planetsPagesAll);
//         console.log('pozycja pusta', i - 1);
//         urlPlanets = `https://swapi.co/api/planets/?page=${i}`;
//         const planetsRequestRest = this.planetService.getPlanets(urlPlanets);
//         planetsRequestRest.subscribe(
//           (rest) => {
//             console.log(rest);
//           }
//         );
//       }
//     }
//     this.planetsStored = res.results;
//     this.isLoaded = true;
//     this.total = res.count;
//   });
// }
