import { Component, ViewChild } from '@angular/core';
import { FormMoviesComponent } from '@components/form-movies/form-movies.component';
import { Movie, MovieDb, SearchMovieRequset } from '@models/film.model';
import { ConfirmationService } from 'primeng/api';
import { FilmsService } from '@config/services/films.service';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastService } from '@services/toast.service';
import { Column } from '@models/app.model';
import { AppService } from '@services/app.service';
import { TranslatePipe } from '@config/pipes/translate.pipe';

@Component({
  selector: 'app-admin-om',
  imports: [
    CommonModule,
    TableModule,
    FormMoviesComponent,
    ButtonModule,
    ToolbarModule,
    ConfirmDialogModule,
    TranslatePipe,
  ],
  templateUrl: './admin-om.component.html',
  styleUrl: './admin-om.component.scss',
})
export class AdminOmComponent {
  @ViewChild('formMovie') formMovieComponent!: FormMoviesComponent;

  loading: boolean = false;
  searchParams!: SearchMovieRequset;
  currentPage: number = 1;
  totalResults: number | null = 0;
  films: Movie[] = [];
  cols!: Column[];
  selectedFilms!: Movie[] | null;
  
  constructor(
    private filmService: FilmsService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private appService: AppService,
  ) {}

  ngOnInit(): void {}

  searchFilms(
    searchParams: SearchMovieRequset = this.searchParams,
    fromPagination: boolean = false
  ): void {

    this.searchParams = searchParams;
    this.loading = true;

    if (!fromPagination) {
      this.currentPage = 1;
      this.formMovieComponent.setPage(1);
    }

    searchParams['page'] = this.currentPage;
    this.filmService.getFilmsFromOm(searchParams).subscribe(
      (response) => {
        if (response.Response == 'False') {
          this.toastService.showError(response.Error || 'Error');
        }
        this.films = response.Search || [];
        this.totalResults = parseInt((response.totalResults || "0"), 10) || 0;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= Math.ceil((this.totalResults || 0) / 10)) {
      this.currentPage = page;
      this.searchFilms(this.searchParams, true);
    }
  }

 
  addSelectedFilms() {
    this.confirmationService.confirm({
        message: this.appService.getMessageByKey('CONFIREM_ADD_MOVIE'),
        header:  this.appService.getMessageByKey('CONFIREM'),
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: this.appService.getMessageByKey('CONFIREM'),
        rejectLabel: this.appService.getMessageByKey('CANCEL'),
        accept: () => {
          this.saveMovies();
        }
    });
}

private saveMovies(){
  this.loading =true;
  let ids = this.selectedFilms?.map((movie:Movie)=> movie.imdbID) || [];
  this.filmService.saveMoviesInDb({ids}).subscribe(
    (res:MovieDb[])=>{
      this.loading =false;
      this.selectedFilms = [];
      this.toastService.showSuccess(this.appService.getMessageByKey(`FILMS_SAVED`));
    },
    (err:any)=>{
      this.loading =false;
    }
  );
}
}
