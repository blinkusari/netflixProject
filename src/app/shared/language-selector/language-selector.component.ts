import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  constructor(private translocoService: TranslocoService) {

  }
  public activeLanguageCode: string;
  public languagesList: Array<
    Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>
  > = [
      {
        imgUrl: 'https://angular-multi-lingual.hmousavi.dev/assets/images/English.png',
        code: 'en',
        name: 'English',
        shorthand: 'ENG',
      },
      {
        imgUrl: 'https://angular-multi-lingual.hmousavi.dev/assets/images/Deutsch.png',
        code: 'de',
        name: 'German',
        shorthand: 'GER',
      },

    ];

  ngOnInit() {
    this.activeLanguageCode = this.translocoService.getActiveLang();

  }


  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
    this.activeLanguageCode = languageCode;

    languageCode === 'fa'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
  }
}
