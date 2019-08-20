import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../../services/planet.service';
import {Planet} from '../../models/Planet';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  // planets: Planet[];
  planets: any;
  data: any;
  // url: string;

  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.planetService.getPlanets().subscribe(planets => {
      console.log(planets);
      this.planets = planets.results;
    });
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
