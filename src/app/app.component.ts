import { Component, Inject, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from "@components/loader/loader.component";
import { DOCUMENT } from '@angular/common';
import { AppService } from '@services/app.service';
import { HeaderComponent } from "@components/header/header.component";
import { LanguageTypes } from './constants/messages.constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, LoaderComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'fawry-development-task';
  hideHeader : boolean = false;
  activePage : string = '';
  
  constructor(private router: Router, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private appService:AppService){}

  ngOnInit(){
    this.setConfig();
    this.listenToActivePage();
  }

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#overlay-app');
    this.renderer.setStyle(loader, 'display', 'none');
  }

  toggleLang(newLang:LanguageTypes){
    localStorage.setItem('language', newLang);
    this.setConfig();
  }

  private setConfig(){
    let lang = this.appService.getCurrentLanguage();
    this.renderer.setAttribute(this.document.body, 'lang', lang);
    this.renderer.setStyle(this.document.body, 'direction', lang == 'ar' ? 'rtl' : 'ltr');
  }

  private listenToActivePage(): void {
    this.router.events.subscribe((event) => {     
      if (event instanceof NavigationEnd) {
        this.activePage = event.urlAfterRedirects;
        this.hideHeader = ['/login', '/register'].includes(this.activePage);
      }
    });
  }
}
