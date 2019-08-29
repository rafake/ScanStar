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
  planetIdfromSearchLocal: number;
  planetIsLoaded: boolean = false;

  constructor(private route: ActivatedRoute, public planetService: PlanetService, private location: Location) {  }

  searchViewFalse = () => {
    this.planetService.searchView = false;
  }

  ngOnInit() {

    const requestForResidents = (data) => {
      const urlResource = data;
      console.log('request for residents launched...');
      if (urlResource.length > 0) {
        for (let i = 0; i < urlResource.length; i++) {
          this.planetService.passResidentUrl(urlResource[i]);
        }
      } else if (urlResource.length === 0) {
        console.log('no residents based on the information received');
        this.planetService.passResidentUrl('no residents');
      }
    };

    const requestForFilms = (data) => {
      const urlResourceFilms = data;
      console.log('request for films launched...');
      if (urlResourceFilms.length > 0) {
        for (let i = 0; i < urlResourceFilms.length; i++) {
          console.log(urlResourceFilms[i]);
          this.planetService.passFilmUrl(urlResourceFilms[i]);
        }
      } else if (urlResourceFilms.length === 0) {
        console.log('no films based on the information received');
        this.planetService.passFilmUrl('no films');
      }
    };

    this.planetId = +this.route.snapshot.paramMap.get('id');
    console.log(this.planetId);

    // this.planetService.planetIdFromSearchSubject.subscribe(idFromUrl => {
    //   console.log(Number(idFromUrl));
    //   this.planetService.planetIdFromSearchEventually = Number(idFromUrl);
    // });

    // console.log(this.planetId);
    // // const id = this.planetId;

    if (this.planetService.mainPageLoaded && !(this.planetService.planetAll[this.planetId - 1].name === 'no data')) {
      this.planetIsLoaded = true;
      this.planet = this.planetService.planetAll[this.planetId - 1];

      this.planetService.passId(this.planetId - 1);

      requestForResidents(this.planet.residents);
      requestForFilms(this.planet.films);

    } else {
      if (this.planetId == 60) {
        const planetRequest = this.planetService.getPlanet(1);
        this.planetService.passId(1);
        planetRequest.subscribe(
          (data) => {
            console.log(data);
            this.planet = data;

            requestForResidents(this.planet.residents);
            requestForFilms(this.planet.films);

          });
      } else if (this.planetId == 61) {
        const planetRequest = this.planetService.getPlanet(61);
        this.planetService.passId(61);
        planetRequest.subscribe(
          (data) => {
            console.log(data);
            this.planet = data;

            requestForResidents(this.planet.residents);
            requestForFilms(this.planet.films);

          });
      } else {
        const planetRequest = this.planetService.getPlanet(this.planetId + 1);
        this.planetService.passId(this.planetId + 1);
        planetRequest.subscribe(
          (data) => {
            console.log(data);
            this.planet = data;

            requestForResidents(this.planet.residents);
            requestForFilms(this.planet.films);

          }
        );
      }
    }
  }
}
