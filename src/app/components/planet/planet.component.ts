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
  planetIsLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private planetService: PlanetService, private location: Location) {  }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');
    this.planetId = id;
    if (this.planetService.mainPageLoaded && !(this.planetService.planetAll[id - 1].name === 'no data')) {
      this.planetIsLoaded = true;
      this.planet = this.planetService.planetAll[id - 1];
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
    } else {
      if (id == 60) {
        const planetRequest = this.planetService.getPlanet(1);
        planetRequest.subscribe(
          (data) => {
            console.log(data);
            this.planet = data;
          });
      } else if (id == 61) {
        const planetRequest = this.planetService.getPlanet(61);
        planetRequest.subscribe(
          (data) => {
            console.log(data);
            this.planet = data;
          });
      } else {
        const planetRequest = this.planetService.getPlanet(id + 1);
        planetRequest.subscribe(
          (data) => {
            console.log(data);
            this.planet = data;
          }
        );
      }


      for (let i = 0; i < 62; i++) {
        setTimeout(() => {
          let planetReq = this.planetService.getPlanet(i);
          planetReq.subscribe(data => console.log(i, data));
        }, 3000);
      }
    }


  }

}
