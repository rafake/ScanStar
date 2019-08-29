import {Component, OnChanges, OnInit} from '@angular/core';
import {concat, Observable } from 'rxjs';
import { PlanetService } from '../../services/planet.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-films-and-residents',
  templateUrl: './films-and-residents.component.html',
  styleUrls: ['./films-and-residents.component.scss']
})
export class FilmsAndResidentsComponent implements OnInit, OnChanges {
  residents: any = [];
  id: number;
  residentsToShow: any = [];
  noResidents: boolean = false;
  noFilms: boolean = false;
  films: any = [];
  filmsToShow: any = [];
  filmsLoaded: boolean = false;
  residentsLoaded: boolean = false;
  urlsLoaded: boolean = false;

  constructor(private planetService: PlanetService) {
    this.noResidents = false;
    this.noFilms = false;
    this.filmsLoaded = false;
    this.residentsLoaded = false;

    this.planetService.planetId.subscribe((id) => this.id = id);

    this.planetService.residentsResults.subscribe(
      (residentUrls) => {
      this.residents = [];
      console.log(residentUrls);
      this.residents.push(residentUrls);
      console.log(this.residents);
      for (let i = 0; i < this.residents.length; i++) {
        console.log('for launched');
        this.planetService.getResidentsData(this.residents[i]).subscribe(resident => {
            this.residentsToShow.push(resident);
            console.log(resident.name);
          this.residentsLoaded = true;
          });
      }
      console.log(this.planetService.planetsResidentsDownloaded[this.id]);
      },
      (data) => console.log(data),
      () => {
        this.noResidents = true;
        console.log('no residents');
        this.residentsLoaded = true;
      }
    );

    this.planetService.filmsResults.subscribe(
      filmUrls => {
        this.films = [];
        console.log(filmUrls);
        this.films.push(filmUrls);
        console.log(this.films);
        for (let i = 0; i < this.films.length; i++) {
          this.planetService.getFilmsData(this.films[i]).subscribe( film => {
            this.filmsToShow.push(film);
            console.log(film.name);
            this.filmsLoaded = true;
          });
        }

      },
      (data) => console.log(data),
      () => {
        this.noFilms = true;
        console.log('no films');
        this.filmsLoaded = true;
      }
    );
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

}
