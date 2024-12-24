import { Component, ViewChild } from '@angular/core';
import { MovieDbResponse, MovieSummary, SearchMovieRequset } from '@models/film.model';
import { ConfirmationService } from 'primeng/api';
import { FilmsService } from '@config/services/films.service';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpHeaderResponse } from '@angular/common/http';
import { FormMoviesComponent } from '@components/form-movies/form-movies.component';
import { ToastService } from '@services/toast.service';
import { Column } from '@models/app.model';
import { AppService } from '@services/app.service';
import { TranslatePipe } from '@config/pipes/translate.pipe';

@Component({
  selector: 'app-admin-db',
  imports: [    CommonModule,
    TableModule,
    FormMoviesComponent,
    ButtonModule,
    ToolbarModule,
    ConfirmDialogModule,
    TranslatePipe],
  standalone:true,
  templateUrl: './admin-db.component.html',
  styleUrl: './admin-db.component.scss',
})
export class AdminDbComponent {

  @ViewChild('formMovie') formMovieComponent!: FormMoviesComponent;

  loading: boolean = false;
  searchParams!: SearchMovieRequset;
  currentPage: number = 1;
  totalResults: number | null = 0;
  films: MovieSummary[] = [];
  cols!: Column[];
  selectedFilms!: MovieSummary[] | null;

  constructor(
    private filmService: FilmsService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private appService: AppService,
  ) {}

  ngOnInit(): void {
    this.searchFilms({}, true);
  }

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

    searchParams['page'] = this.currentPage-1;
    searchParams['pageSize'] = 10;
    this.filmService.getFilmsFromDb(searchParams).subscribe(
      (response:MovieDbResponse) => {
        if (response.content?.length == 0) {
          this.toastService.showWarning(this.appService.getMessageByKey('NO_MOVIES_IN_DB'));
        }
        this.films = response.content || [];
        this.totalResults = parseInt((response.totalElements.toString() || "0"), 10) || 0;
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

 
  deleteSelectedFilms() {
    this.confirmationService.confirm({
        message: this.appService.getMessageByKey('CONFIREM_DELETE_MOVIE'),
        header: this.appService.getMessageByKey('CONFIREM'),
        icon: 'pi pi-exclamation-trash',
        acceptLabel: this.appService.getMessageByKey('CONFIREM'),
        rejectLabel: this.appService.getMessageByKey('CANCEL'),
        accept: () => {
          this.deleteMovies();
        }
    });
}

private deleteMovies(){
  this.loading =true;
  let ids = this.selectedFilms?.map((movie:MovieSummary)=> movie.imdbID) || [];
  this.filmService.deleteMoviesInDb({ids}).subscribe(
    (res:HttpHeaderResponse)=>{
      this.loading =false;
      this.selectedFilms = [];
      this.toastService.showSuccess(this.appService.getMessageByKey('FILMS_DELETED'));
    },
    (err:any)=>{
      this.loading =false;
    }
  );
}

}
