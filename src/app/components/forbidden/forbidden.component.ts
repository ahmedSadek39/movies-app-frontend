import { Component } from '@angular/core';
import { TranslatePipe } from '@config/pipes/translate.pipe';
@Component({
  selector: 'mts-forbidden',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {
  
}
