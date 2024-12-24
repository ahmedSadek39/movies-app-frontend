import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { defaultLanguage } from '@config/constants/app.constants';
import { LanguageTypes, MessageKey, messages } from '@config/constants/messages.constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router:Router) { }

  setLanguage(lang: string): void {
    localStorage.setItem('language', lang);
  }

  getUsername(): string {
    return localStorage.getItem('username') || this.getMessageByKey('DEFAULT_USERNAME');
  }

  getCurrentLanguage(): LanguageTypes {
    return (localStorage.getItem('language') || navigator.language.split('-')[0] || defaultLanguage) as LanguageTypes;
  }

  getMessageByKey(key: MessageKey): string {
    return messages[key][this.getCurrentLanguage()];
  }

  navigate(role : string){
    if(role === 'ADMIN'){
      this.router.navigate(['/admin-movies-om'])
    } else{
      this.router.navigate(['/user-movies-db'])
    }
  }

}
