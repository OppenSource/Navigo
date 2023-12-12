// Importations

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FireStoreRestServiceService } from 'src/app/RestService/Apis/FireStore/fire-store-rest-service.service';
import { InternetService } from 'src/app/RestService/Fonctions/Internet/internet.service';
import { OtherFunctionsService } from 'src/app/RestService/Fonctions/Others/other-functions.service';
import { UploadFileService } from 'src/app/RestService/Fonctions/Uploading/upload-file.service';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
  providers: [],
})
export class BusPage implements OnInit , OnDestroy {
  save: FormGroup | any;
  collectionnName: any = 'bus';
  selected: any = 'list';
  image: any;
  isReady: any = false;
  isModalOpen: any = false;
  linkUrl: any = '';
  readyToUpdate: any;
  data: any[] = [];
  list: any[] = [];
  loadingData = true;
  isConnected: boolean | any;
  items: any[] = Array.from({ length: 4 });
  private internetStatusSubscription: Subscription | any;

  constructor(
    public formBuilder: FormBuilder,
    public api: FireStoreRestServiceService,
    public upload: UploadFileService,
    public others: OtherFunctionsService,
    public internet: InternetService
  ) {}

  async ngOnInit() {
    this.save = this.formBuilder.group({
      registration: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      color: ['', [Validators.required]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required]],
      driver: ['', [Validators.required]],
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

  async addData() {
    try {
      const object = {
        registration: this.save.value.registration,
        color: this.save.value.color,
        brand: this.save.value.brand,
        type: this.save.value.type,
        driver: this.save.value.driver,
        picture: this.linkUrl,
        createdAt: await this.others.getCurrentDate(),
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
      };

      const collectionName = 'bus';
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
        if (this.readyToUpdate.registration != '') {
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
        registration: this.save.value.registration,
        color: this.save.value.color,
        brand: this.save.value.brand,
        type: this.save.value.type,
        driver: this.save.value.driver,
        picture: this.linkUrl === '' ? this.image : this.linkUrl,
        updatedAt: await this.others.getCurrentDate(),
        updatedBy: '',
      };

      const collectionName = 'bus';
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
        d.registration.toLowerCase().indexOf(query) > -1 ||
        d.driver.toLowerCase().indexOf(query) > -1 ||
        d.brand.toLowerCase().indexOf(query) > -1 ||
        d.type.toLowerCase().indexOf(query) > -1
    );
  }
}
