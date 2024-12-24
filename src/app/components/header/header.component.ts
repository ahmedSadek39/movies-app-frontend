import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { pages } from '@config/constants/app.constants';
import { TranslatePipe } from '@config/pipes/translate.pipe';
import { AuthService } from '@core/services/auth.service';
import { Page } from '@models/app.model';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterLink, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username: string = '';
  isRtl: boolean = false;
  links: Page[] = [];

  @Input() activePage: string = '';
  @Input() hideHeader: boolean = false;
  @Output() toggleLangEmit = new EventEmitter();

  constructor(private appService: AppService, private authService: AuthService) {}

  ngOnInit(): void {
    this.setConfig();
  }

  ngOnChanges(){
    this.setLinks();
  }


  logout(): void {
    this.authService.logout();
  }

  private setConfig(){
    this.isRtl = this.appService.getCurrentLanguage() === 'ar';
    document.body.dir = this.isRtl ? 'rtl' : 'ltr';
    this.setLinks();
  }

  setLinks(): void {
    this.username = this.appService.getUsername();
    const role = localStorage.getItem('role');
    this.links = pages.map((page) => ({
      ...page,
      show: this.hasPermission(role, page.permission),
    }));    
  }

  private hasPermission(
    role: string | null,
    pagePermission: 'ADMIN' | 'USER'
  ): boolean {
    if (!role) return false;
    if (role === 'ADMIN') return true;
    return role === 'USER' && pagePermission === 'USER';
  }

  toggleLang() {
    this.isRtl = !this.isRtl;
    const newLang = this.isRtl ? 'ar' : 'en';
    this.toggleLangEmit.emit(newLang);
  }

}
