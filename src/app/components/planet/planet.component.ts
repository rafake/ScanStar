import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlanetService } from '../../services/planet.service';
import { Planet } from '../../models/Planet';
import {$PERCENT} from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  planet: Planet;
  planetId: number;
  // getProgress = (populationOfThePlanet) => {
  //   let populationPercentageInput: number = Number(populationOfThePlanet);
  //   if (Number(populationPercentageInput) > 0) {
  //     populationPercentageInput = Math.ceil(populationPercentageInput / 1000000000000);
  //     let populationPercentage: string;
  //     populationPercentage = `${populationPercentageInput}%`;
  //     return populationPercentage;
  //   }
  //
  //
  // }

  constructor(private route: ActivatedRoute, private planetService: PlanetService, private location: Location) {  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.planetService.getPlanet(id).subscribe(planet => this.planet = planet);
    this.planet = this.planetService.planetsAll[id - 1];
    this.planetId = id;
    console.log(this.planet);

  }

}
