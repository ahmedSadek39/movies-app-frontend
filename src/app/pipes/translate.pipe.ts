import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from '@services/app.service';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private appService: AppService) {}

  transform(key: string): string {
    try {
      if (!key) {
        console.warn('TranslatePipe received an empty or undefined key');
        return '';
      }
      return this.appService.getMessageByKey(key);
    } catch (e) {
      console.error(e);
      console.warn(key);
      return key;
    }
  }
}
