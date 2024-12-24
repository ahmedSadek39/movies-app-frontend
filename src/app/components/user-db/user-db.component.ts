import { Component, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { Rating, RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FilmsService } from '@config/services/films.service';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { Tooltip } from 'primeng/tooltip';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MovieDb, MovieDbResponse, SearchMovieRequset, MovieSummary } from '@models/film.model';
import { FormMoviesComponent } from '@components/form-movies/form-movies.component';
import { Column } from '@models/app.model';
import { Rating as RatingModel } from '@models/rating.model';
import { TranslatePipe } from '@config/pipes/translate.pipe';
import { ToastService } from '@services/toast.service';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-user-db',
  imports: [Tooltip, FormsModule, InputTextModule, ReactiveFormsModule, DatePickerModule, RatingModule, ButtonModule, CommonModule,
    TableModule, Dialog, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, TextareaModule,
    DropdownModule, Rating, IconFieldModule, InputIconModule, FormMoviesComponent,TranslatePipe],
    standalone:true,
    templateUrl: './user-db.component.html',
    styleUrl: './user-db.component.scss'
})
export class UserDbComponent {

  @ViewChild('dt') dt!: Table;
  @ViewChild('formMovie') formMovieComponent!: FormMoviesComponent;
  ratingDialog: boolean = false;
  detailsDialog: boolean = false;

  films: MovieSummary[] = [];
  film!: MovieDb;
  filmDetails!: MovieDb;
  searchParams!:SearchMovieRequset;
  submitted: boolean = false;
  statuses!: any[];
  cols!: Column[];
  
  loading: boolean = false;
  showReviews: boolean = true;
  showDetails: boolean = true;
  totalResults: number | null = 0;
  currentPage: number = 1;

  constructor(private filmService: FilmsService, private toastService:ToastService, private appService:AppService) {}

  ngOnInit(): void {
    this.searchFilms({}, true);
  }

  hideRatingDialog() {
    this.ratingDialog = false;
    this.submitted = false;
    this.film = {} as MovieDb;
  }

  hideDetailsDialog() {
    this.detailsDialog = false;
    this.submitted = false;
    this.filmDetails = {} as MovieDb;
  }

  openDetailsModal(selectedFilm: MovieDb) {
    this.getFilmDetails(selectedFilm.imdbID);
    this.film = { ...selectedFilm };
    this.submitted = false;
  }

  openRatingModal(selectedFilm: MovieDb) {
    this.film = { ...selectedFilm, userRating: '0' };
    this.submitted = false;
    this.ratingDialog = true;
  }

  saveRating(): void {

    this.loading = true;
    this.filmService.rateMovie({
      rate:this.film.userRating || "0",
      imdbID:this.film.imdbID
    }).subscribe((res:HttpResponse<RatingModel>)=>{
      this.loading = false;
    }, (e:any)=>{
      this.loading = false;
    })
    this.hideRatingDialog();
  }
  
  searchFilms(
    searchParams: SearchMovieRequset = this.searchParams,
    fromPagination: boolean = false
  ): void {
    
    this.loading = true;

    if (!fromPagination) {
      this.currentPage = 1;
      this.formMovieComponent.setPage(1);
    }

    searchParams['page'] = this.currentPage-1;
    searchParams['pageSize'] = 10;
    this.filmService.getFilmsFromDb(searchParams).subscribe(
      (response:MovieDbResponse) => {       
        if (response.content.length == 0) {
          this.toastService.showError(this.appService.getMessageByKey('NO_MOVIES'));
        }
        this.films = response.content || [];

        this.films.map((film:MovieSummary)=>
        {
          film.avgRating/=2;
          return film;
        }
      );
        
        this.totalResults = parseInt((response.totalElements.toString() || "0"), 10) || 0;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error(error);
      }
    );
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= Math.ceil(this.totalResults || 0 / 10)) {
      this.currentPage = page;
      this.searchFilms();
    }
  }

  getFilmDetails(id: string) {
    this.filmService.getFilmDetailsByIdFromDb(id).subscribe(
      (res: MovieDb) => {
        this.filmDetails = res;
        this.detailsDialog = true;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
