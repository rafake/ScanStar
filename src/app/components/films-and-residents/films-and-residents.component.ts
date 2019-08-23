import {Component, OnChanges, OnInit} from '@angular/core';
import {concat, Observable} from 'rxjs';
import { PlanetService } from '../../services/planet.service';

@Component({
  selector: 'app-films-and-residents',
  templateUrl: './films-and-residents.component.html',
  styleUrls: ['./films-and-residents.component.scss']
})
export class FilmsAndResidentsComponent implements OnInit, OnChanges {
  residents: any = [];
  residentsToShow: any = [];
  films: any = [];
  filmsToShow: any = [];
  filmsLoaded: boolean = false;
  residentsLoaded: boolean = false;

  constructor(private planetService: PlanetService) {
    this.filmsLoaded = false;
    this.residentsLoaded = false;
    this.planetService.residentsResults.subscribe(residentUrls => {
      console.log(residentUrls);
      this.residents.push(residentUrls);
      console.log(this.residents);

    });
    setTimeout(() => {
      for (let i = 0; i < this.residents.length; i++) {

        this.planetService.getResidentsData(this.residents[i]).subscribe( resident => {
          this.residentsToShow.push(resident);
          console.log(resident.name);
        });
      }
      setTimeout(() => {
        this.residentsLoaded = true;
      }, 2000);
    }, 5000);

    this.planetService.filmsResults.subscribe(filmUrls => {
      console.log(filmUrls);
      this.films.push(filmUrls);
      console.log(this.films);

    });
    setTimeout(() => {
      for (let i = 0; i < this.residents.length; i++) {

        this.planetService.getFilmsData(this.films[i]).subscribe( film => {
          this.filmsToShow.push(film);
          console.log(film.name);
        });
      }
      setTimeout(() => {
        this.filmsLoaded = true;
      }, 2000);
    }, 5000);
  }

  ngOnInit() {
    // this.planetService.residentsResults.subscribe(residentUrls => {
    //   console.log(residentUrls);
    //   this.residents.push(residentUrls);
    //   for (let i = 0; i < residentUrls.length; i++) {
    //     this.planetService.getResidentsData(residentUrls[i]).subscribe( resident => {
    //       this.residentsToShow.push(resident);
    //       console.log(resident.name);
    //     });
    //   }
    // });
  }

  ngOnChanges() {
  }

}
