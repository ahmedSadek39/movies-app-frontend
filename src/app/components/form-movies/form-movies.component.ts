import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { typeOptions } from '@config/constants/app.constants';
import { TranslatePipe } from '@config/pipes/translate.pipe';
import { SearchMovieRequset } from '@models/film.model';
import { AppService } from '@services/app.service';
import { ToastService } from '@services/toast.service';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-form-movies',
  standalone : true,
  imports: [DropdownModule, ReactiveFormsModule, DatePickerModule, TranslatePipe],
  templateUrl: './form-movies.component.html',
  styleUrl: './form-movies.component.scss'
})
export class FormMoviesComponent {

  typeOptions : any[] = typeOptions;
  @Input() keywordRequired: boolean = false;
  @Output() searchEmitter = new EventEmitter();

  searchForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private toastService: ToastService, private appService:AppService) {}

    ngOnInit(): void {
      this.searchForm = this.fb.group({
        keyword: [''],
        type: [''],
        year: [''],
        page: [1],
      });
    }

    searchFilms(): void {
      let searchParams = this.validateSearchFormAndReturn();
      if(searchParams != null) this.searchEmitter.emit(searchParams);
    }

    setPage(pageNumber:number){
      this.searchForm.controls['page'].patchValue(pageNumber);
    }

    private validateSearchFormAndReturn() : SearchMovieRequset | null {
      const searchParams : SearchMovieRequset = this.searchForm.value;      
      searchParams['year'] = this.searchForm.controls['year'].value && this.searchForm.controls['year'].value.getFullYear() || '';


      if (this.keywordRequired && searchParams.keyword?.length == 0){
        this.toastService.showError(this.appService.getMessageByKey('MUST_ENTER_KEYWORD'));
        return null;
      }
      return searchParams;
    }

    
}
