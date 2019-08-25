import { Component, OnInit } from '@angular/core';
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
  planetsCount: number;
  p: number = 1;
  itemsPerPage: number = 10;
  isLoaded: boolean = false;
  isSearched: boolean = false;
  imagesForPlanets: object = this.planetsDataImagesService.planetsImages;
  pageNum: number;

  constructor(private planetService: PlanetService, private planetsDataImagesService: PlanetsDataImagesService) { }

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

    consequtiveRequests() {
      if (!this.planetService.isLoaded) {
        this.planetsArray = [];
        const urlPlanets = `https://swapi.co/api/planets/`;
        const planetsRequest = this.planetService.getPlanets(urlPlanets);

        planetsRequest.subscribe((planets) => {
          console.log(planets);
          console.log(planets.count);
          this.planetService.count = planets.count;
          this.planetsCount = planets.count;
          console.log(planets.next);
          console.log(planets.results);
          this.planetsStored = planets.results;
          this.planetService.planetsAll = this.planetsStored;
          this.planetService.isLoaded = true;
          this.isLoaded = this.planetService.isLoaded;
        });
      } else {
        this.isSearched = false;
        this.isLoaded = this.planetService.isLoaded;
        return this.planetsStored = this.planetService.planetsAll;
      }
    }
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
  //       this.planetService.planetsAll = this.planetsArray;
  //       // information that planets has been loaded and the loader can be hidden
  //       this.planetService.isLoaded = true;
  //       // passing the information about being loaded to the PlanetService
  //       this.isLoaded = this.planetService.isLoaded;
  //
  //     }, 3000);
  //   } else {
  //     this.isSearched = false;
  //     this.isLoaded = this.planetService.isLoaded;
  //     return this.planetsStored = this.planetService.planetsAll;
  //   }
  // }



  ngOnInit() {

    this.consequtiveRequests();

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
//       this.planetService.planetsAll = this.planetsArray;
//       // information that planets has been loaded and the loader can be hidden
//       this.planetService.isLoaded = true;
//       // passing the information about being loaded to the PlanetService
//       this.isLoaded = this.planetService.isLoaded;
//
//     }, 3000);
//   } else {
//     this.isSearched = false;
//     this.isLoaded = this.planetService.isLoaded;
//     return this.planetsStored = this.planetService.planetsAll;
//   }
// }
