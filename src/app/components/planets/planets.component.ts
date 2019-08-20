import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import { Planet } from '../../models/Planet';
import { Observable } from 'rxjs';
import { concat } from 'rxjs';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  // planets: Planet[];
  planets: any;
  planetsArray: Array = [];
  data: any;
  // url: string;
  combined: any;

  constructor(private planetService: PlanetService) { }

  consequtiveRequests() {
    const urlAPI1 = `https://swapi.co/api/planets/?page=1`;
    const page1Request = this.planetService.getPlanets(urlAPI1);
    const urlAPI2 = `https://swapi.co/api/planets/?page=2`;
    const page2Request = this.planetService.getPlanets(urlAPI2);
    const urlAPI3 = `https://swapi.co/api/planets/?page=3`;
    const page3Request = this.planetService.getPlanets(urlAPI3);
    const urlAPI4 = `https://swapi.co/api/planets/?page=4`;
    const page4Request = this.planetService.getPlanets(urlAPI4);
    const urlAPI5 = `https://swapi.co/api/planets/?page=5`;
    const page5Request = this.planetService.getPlanets(urlAPI5);
    const urlAPI6 = `https://swapi.co/api/planets/?page=6`;
    const page6Request = this.planetService.getPlanets(urlAPI6);
    const urlAPI7 = `https://swapi.co/api/planets/?page=7`;
    const page7Request = this.planetService.getPlanets(urlAPI7);
    this.combined = concat(page1Request, page2Request, page3Request, page4Request, page5Request, page6Request, page7Request);
    this.combined.subscribe(planets => {
      let a = planets.results;
      this.planetsArray.push(a);
      console.log(planets.results);
      });
    setTimeout(() => {
      console.log('to jest tablica', this.planetsArray);
      console.log(this.planetsArray[0]);
      console.log(this.planetsArray[1]);
      this.planetsArray = [...this.planetsArray[0], ...this.planetsArray[1], ...this.planetsArray[2], ...this.planetsArray[3], ...this.planetsArray[4], ...this.planetsArray[5], ...this.planetsArray[6]];
      console.log(this.planetsArray);
      this.planets = this.planetsArray;
    }, 6000);

    }

  ngOnInit() {
// // dobre
//     console.log(this.planetService.getPlanets());
//     this.planetService.getPlanets().subscribe(planets => {
//       console.log(planets);
//       this.planets = planets.results;
//     });

    this.consequtiveRequests();

      //     console.log(planets);
    // this.planetService.getData().subscribe(data => console.log(data));
    // for (let i = 0; i < 7; i++) {
    //   this.url = `https://swapi.co/api/planets/?page=${i + 1}`;
    //   this.planetService.getPlanets(this.url).subscribe(planets => {
    //     console.log(planets);
    //     this.planets.push(planets.results);
    //     // console.log(planets.results);
    //     // this.planets = planets.results;
    //   });
    // }




  }

}
