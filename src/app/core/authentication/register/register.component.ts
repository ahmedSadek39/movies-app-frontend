import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@services/toast.service';
import { roles } from '@config/constants/app.constants';
import { AuthResponse } from '@models/app.model';
import { AppService } from '@services/app.service';
import { TranslatePipe } from '@config/pipes/translate.pipe';

@Component({
  selector: 'app-register',
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ToastModule,
    DropdownModule,
    TranslatePipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  roles = roles;

  constructor(private fb: FormBuilder, private toastService: ToastService, private loginService:AuthService, private appService:AppService) {

  }

  ngOnInit(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { password, confirmPassword } = this.registerForm.value;
      
      if(password !== confirmPassword){
        this.toastService.showError(this.appService.getMessageByKey('PASSWORD_MISMATCH'));
        return 
      }

      this.loginService.register({...this.registerForm.value, role:this.getRole()}).subscribe(
        (res:AuthResponse) =>{
          localStorage.setItem('token', 'Bearer ' + res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('username', this.registerForm.value['username']);
          this.appService.navigate(res.role);
        }, (err:HttpErrorResponse)=>{
          console.log(err);
        }
      )
    } else {
      this.toastService.showError(this.appService.getMessageByKey('FILL_ALL_FIELDS'));
    }
  }

  private getRole(){
    return String(this.registerForm.value['role']).toUpperCase();
  }
}
