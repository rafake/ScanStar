import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlanetService } from '../../services/planet.service';
import { Planet } from '../../models/Planet';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  planet: Planet;
  planetId: number;

  constructor(private route: ActivatedRoute, private planetService: PlanetService, private location: Location) {  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planet = this.planetService.planetsAll[id - 1];
    this.planetId = id;
    console.log(this.planet);
    const urlResource = this.planet.residents;
    console.log(urlResource);
    if (urlResource.length > 0) {
      for (let i = 0; i < urlResource.length; i++) {
        console.log(urlResource[i]);
        this.planetService.passResidentUrl(urlResource[i]);
    }
    }
    const urlResourceFilms = this.planet.films;
    console.log(urlResourceFilms);
    if (urlResourceFilms.length > 0) {
      for (let i = 0; i < urlResourceFilms.length; i++) {
        console.log(urlResourceFilms[i]);
        this.planetService.passFilmUrl(urlResourceFilms[i]);
      }
    }

  }

}
