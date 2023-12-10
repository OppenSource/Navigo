import { APP_INITIALIZER } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//firebase & Firestore
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// translation & i18n
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// service de traduction
import { LanguageService } from 'src/app/RestService/Fonctions/Language/language.service';

// storage
import { StorageModule } from '@angular/fire/storage';

// DatePipe
import { DatePipe } from '@angular/common';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


// Qrcode
import { QRCodeModule } from 'angularx-qrcode';

// send email
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    StorageModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr', // Définissez une valeur par défaut
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    QRCodeModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmailComposer,
    DatePipe,
    LanguageService,
    {
      provide: APP_INITIALIZER,
      useFactory: (languageService: LanguageService) => () => {
        // Appeler la méthode existante pour définir la langue par défaut
        const defaultLanguage = languageService.getDefaultLanguage();
        languageService.setLanguage(defaultLanguage);
      },
      deps: [LanguageService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


// @NgModule({
//   declarations: [AppComponent],
//   imports: [
//     BrowserModule,
//     IonicModule.forRoot(),
//     AppRoutingModule,
//     provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
//     provideFirestore(() => getFirestore()),
//     StorageModule,

//     HttpClientModule,
//     TranslateModule.forRoot({
//       defaultLanguage: 'fr',
//       loader: {
//         provide: TranslateLoader,
//         useFactory: HttpLoaderFactory,
//         deps: [HttpClient],
//       },
//     }),
//     QRCodeModule,
//   ],
//   providers: [
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//     EmailComposer,
//     DatePipe,
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
