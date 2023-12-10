// Importations

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FireStoreRestServiceService } from 'src/app/RestService/Apis/FireStore/fire-store-rest-service.service';
import { InternetService } from 'src/app/RestService/Fonctions/Internet/internet.service';
import { OtherFunctionsService } from 'src/app/RestService/Fonctions/Others/other-functions.service';
import { UploadFileService } from 'src/app/RestService/Fonctions/Uploading/upload-file.service';
import { LanguageService } from 'src/app/RestService/Fonctions/Language/language.service';


import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit , OnDestroy {
  save: FormGroup | any;
  collectionnName: any = 'driver';
  selected: any = 'list';
  image: any;
  isReady: any = false;
  isModalOpen: any = false;
  linkUrl: any = '';
  readyToUpdate: any;
  data: any[] = [];
  list: any[] = [];
  loadingData = true;
  defaultLanguage: string | any;
  isConnected: boolean | any;
  items: any[] = Array.from({ length: 4 });
  private internetStatusSubscription: Subscription | any;

  constructor(
    public formBuilder: FormBuilder,
    public api: FireStoreRestServiceService,
    public upload: UploadFileService,
    public others: OtherFunctionsService,
    public internet: InternetService,
    private language: LanguageService,
    private translate: TranslateService,
  ) {}

  async ngOnInit() {
    this.defaultLanguage = this.language.getDefaultLanguage();
    console.log('Default Language:', this.defaultLanguage);
    this.translate.use(this.defaultLanguage);

    this.save = this.formBuilder.group({
      fullname: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ],
      ],

      subname: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ],
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern(/^6/),
        ],
      ],

      cni: ['', [Validators.required, Validators.minLength(10)]],
      adresse: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.loadData();

    this.internetStatusSubscription = this.internet
      .getStatusChangedObservable()
      .subscribe((isConnected: boolean) => {
        if (!this.isConnected && isConnected) {
          this.refreshData();
        }
        this.isConnected = isConnected;
      });
  }

  ngOnDestroy(): void {
    this.internetStatusSubscription.unsubscribe();
  }

  private refreshData(): void {
    console.log('Rafraîchissement des données...');
    this.loadData();
  }

  async loadData() {
    try {
      const dataObservable = await (
        await this.api.getAllData(this.collectionnName)
      ).toPromise();

      if (dataObservable) {
        // Si dataObservable n'est pas undefined, assignez sa valeur à list
        this.list = dataObservable;
        this.data = dataObservable;
      } else {
        console.warn("Aucune donnée n'a été renvoyée.");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors du chargement des données:",
        error
      );
    }
  }

  async checkInternet() {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async addData() {
    try {
      const object = {
        fullname: this.save.value.fullname,
        subname: this.save.value.subname,
        phone: this.save.value.phone,
        adresse: this.save.value.adresse,
        cni: this.save.value.cni,
        picture: this.linkUrl,
        createdAt: await this.others.getCurrentDate(),
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
      };

      console.log(object)

      const collectionName = 'driver';
      const isSave = this.save.valid;
      const operation = 'save';

      console.log(object, collectionName, isSave, operation);

      const result = await this.api.actionAlert(
        object,
        collectionName,
        isSave,
        operation
      );

      if (result) {
        this.save.reset();
        this.image = '';
        this.loadData();
      }

      // Utilisez le résultat si nécessaire
      console.log(result);
    } catch (error) {
      console.error("Erreur lors de l'appel à actionAlert :", error);
    }
  }

  async takePicture() {
    try {
      const result = await this.upload.readyToUploadFile();
      this.isReady = result.isReady;
      this.image = result.images;
      this.linkUrl = result.linkUrl;
      console.log(result);
    } catch (error) {
      console.error(
        'Erreur lors de la préparation du fichier pour le téléchargement :',
        error
      );
    }
  }

  async actionSheetData(object: any) {
    try {
      const result = await this.api.actionSheetData(
        object,
        this.collectionnName
      );

      if (result) {
        this.loadData();
      }

      if (result === null) {
        this.readyToUpdate = object;
        if (this.readyToUpdate.fullname != '') {
          this.image = this.readyToUpdate.picture;
          this.isModalOpen = true;
        }
      }

      console.log(result);
    } catch (error) {
      console.error("Erreur lors de l'appel à actionAlert :", error);
    }
  }

  async readyUpdate(object: any) {}

  async updateData() {
    try {
      const object = {
        fullname: this.save.value.fullname,
        subname: this.save.value.subname,
        phone: this.save.value.phone,
        adresse: this.save.value.adresse,
        cni: this.save.value.cni,
        picture: this.linkUrl === '' ? this.image : this.linkUrl,
        updatedAt: await this.others.getCurrentDate(),
        updatedBy: '',
      };

      const collectionName = 'driver';
      const isSave = this.save.valid;
      const operation = 'update';

      console.log(object, collectionName, isSave, operation);

      const result = await this.api.actionAlert(
        object,
        collectionName,
        isSave,
        operation
      );

      if (result) {
        this.isModalOpen = false;
        this.save.reset();
        this.image = '';
        this.loadData();
      }

      // Utilisez le résultat si nécessaire
      console.log(result);
    } catch (error) {
      console.error("Erreur lors de l'appel à actionAlert :", error);
    }
  }

  async handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.data = this.list.filter(
      (d) =>
        d.fullname.toLowerCase().indexOf(query) > -1 ||
        d.subname.toLowerCase().indexOf(query) > -1 ||
        d.phone.toLowerCase().indexOf(query) > -1 ||
        d.adresse.toLowerCase().indexOf(query) > -1 ||
        d.cni.toLowerCase().indexOf(query) > -1
    );
  }
}
