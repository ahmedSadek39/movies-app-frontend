import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AuthService } from '@config/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@services/toast.service';
import { AuthResponse } from '@models/app.model';
import { TranslatePipe } from '@config/pipes/translate.pipe';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ToastModule,
    TranslatePipe
  ]
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastService, private loginService:AuthService, private appService:AppService) {}

  ngOnInit(){

    if(localStorage.getItem('token') && localStorage.getItem('username')){
      this.appService.navigate(localStorage.getItem('role') || 'USER');
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {      
      this.loginService.login(this.loginForm.value).subscribe(
        (res:AuthResponse) =>{
          localStorage.setItem('token', 'Bearer ' + res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('username', this.loginForm.value['username']);
          this.appService.navigate(res.role);
        }, (err:HttpErrorResponse)=>{
        }
      )
    } else {
      this.toastService.showError(this.appService.getMessageByKey('FILL_ALL_FIELDS'));
    }
  }

}
