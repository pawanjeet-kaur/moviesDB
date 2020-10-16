import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  moviesDB: any[] = [];
  title: string = "";
  year: number = 0;
  actors: string[] = [];

  yearToDelete = 0;
  actorToAdd = '';
  movieToAdd = '';
  movieUpdatedTitle = '';
  movieUpdatedYear = 0;

  constructor(private dbService: DatabaseService) { }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  //Get Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.year, actors: this.actors };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete movies made before a certain year
  onDeleteMoviesBefore() {

    let i = 0;
    while (i < this.moviesDB.length) {
      if (this.moviesDB[i].year < this.yearToDelete) {
        this.moviesDB.splice(i, 1)
      }
      i++;
    }

    this.onGetMovies;

  }

  onSelectAddActor(item) {
    this.actorToAdd = item.name;
  }

  onSelectToMovie(item) {
    this.movieToAdd = item._id;
    this.movieUpdatedTitle = item.title;
    this.movieUpdatedYear = item.year;
  }

  onAddActorToMovie() {
    let obj = { title: this.movieUpdatedTitle, year: this.movieUpdatedYear, actors: this.actorToAdd };
    this.dbService.addActor(this.movieToAdd, obj).subscribe(result => {
      this.onGetMovies();
    });
  }




  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  //Change what section to display
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }
}


