import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService) {}

  getDefaultLanguage(): string {
    const browserLang = this.translateService.getBrowserLang();
    const availableLangs = this.translateService.getLangs();

    if (browserLang && availableLangs.includes(browserLang)) {
      return browserLang;
    }

    return availableLangs.length > 0 ? availableLangs[0] : 'en';
  }

  setLanguage(language: string): void {
    this.translateService.use(language);
  }

  setDefaultLanguage(): void {
    const defaultLanguage = this.getDefaultLanguage();
    this.setLanguage(defaultLanguage);
  }
}
