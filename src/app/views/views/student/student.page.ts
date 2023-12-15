import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InternetService } from 'src/app/RestService/Fonctions/Internet/internet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtherFunctionsService } from 'src/app/RestService/Fonctions/Others/other-functions.service';
import { UploadFileService } from 'src/app/RestService/Fonctions/Uploading/upload-file.service';
import { FireStoreRestServiceService } from 'src/app/RestService/Apis/FireStore/fire-store-rest-service.service';
import { Subscription } from 'rxjs';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
  providers: [DatePipe],
})
export class StudentPage implements OnInit {
  selected: any = 'list';
  collectionnName: any = 'student';
  selected1: any = 'newAccesibility';
  add: FormGroup | any;
  data1: any[] = [];
  data: any[] = [];
  autocomplete: any[] = [];
  student: any;
  messageBusAccessStatus: any;
  messageBusAccess: any;
  linkUrl: any;
  object: any;
  image: any;
  isReady: any;
  variable: any;
  isModalOpen = false;
  isValidity = false;
  readyToUpdate: any;
  resultSearch: any[] = [];
  formattedDate = '';

  loadingData = true;
  isConnected: boolean | any;
  items: any[] = Array.from({ length: 4 });
  private internetStatusSubscription: Subscription | any;
  qrData = null;
  createdCode = null;

  constructor(
    public formBuilder: FormBuilder,
    public api: FireStoreRestServiceService,
    public upload: UploadFileService,
    public others: OtherFunctionsService,
    public internet: InternetService,
    private qrScanner: QRScanner,
    private platform: Platform
    ) {}

  createCode() {
    this.createdCode = this.qrData;
    console.log(this.createdCode);
  }

  truncateAndEllipsis(name: string): string {
    const maxLength = 20;
    if (name.length <= maxLength) {
      return name;
    } else {
      return name.substring(0, 15) + '...';
    }
  }

  async ngOnInit() {
    this.add = this.formBuilder.group({
      matricule: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(9)],
        ],
      fullname: ['', [Validators.required, Validators.minLength(4)]],
      cycle: ['', [Validators.required]],
      level: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@institutsaintjean+.org$'),
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
    });

    this.loadData();

    this.internetStatusSubscription = this.internet
    .getStatusChangedObservable()
    .subscribe((isConnected: boolean) => {
      if (!this.isConnected && isConnected) {
        this.refreshData();
      }
      this.isConnected = isConnected;
      console.log(this.isConnected);
    });
    FormBuilder;
  }

  ngOnDestroy(): void {
    this.internetStatusSubscription.unsubscribe();
  }

  private refreshData(): void {
    console.log('Rafraîchissement des données...');
    this.loadData();
  }

  maskEmail(item: any) {
    return this.others.ReformatEmail(item);
  }

  async loadData() {
    try {
      const dataObservable = await (
        await this.api.getAllData(this.collectionnName)
        ).toPromise();

      if (dataObservable) {
        // Si dataObservable n'est pas undefined, assignez sa valeur à list
        this.data = dataObservable;
        this.data1 = dataObservable;
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

  //
  async handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.data = this.data1.filter(
      (d) =>
      d.matricule.toLowerCase().indexOf(query) > -1 ||
      d.fullname.toLowerCase().indexOf(query) > -1 ||
      d.cycle.toLowerCase().indexOf(query) > -1 ||
      d.level.toLowerCase().indexOf(query) > -1 ||
      d.phone.toLowerCase().indexOf(query) > -1 ||
      d.createdAt.toLowerCase().indexOf(query) > -1 ||
      d.email.toLowerCase().indexOf(query) > -1
      );
    console.log(this.data1);
  }

  async studentAutocomplete(event: any) {
    const value = event.target.value.toLowerCase();
    if (value.length <= 0) {
      this.autocomplete = [];
      return;
    }
    const list = this.data1;
    const items = list.filter(
      (d) =>
      d.matricule.toLowerCase().indexOf(value) > -1 ||
      d.fullname.toLowerCase().indexOf(value) > -1 ||
      d.cycle.toLowerCase().indexOf(value) > -1 ||
      d.level.toLowerCase().indexOf(value) > -1 ||
      d.phone.toLowerCase().indexOf(value) > -1 ||
      d.email.toLowerCase().indexOf(value) > -1
      );
    this.autocomplete = items;
  }

  async selectedAutocomplete(event: any) {
    this.student = event;
    const end = await this.others.isDateAfterToday(this.student.endPeriod);
    console.log(end);

    if (end) {
      this.messageBusAccessStatus = 'yes';
      this.messageBusAccess =
      "L'étudiant : " +
      this.student.fullname.toUpperCase() +
      ', a bel et bien accès au bus.';
      this.isValidity = true;
    } else {
      this.messageBusAccessStatus = 'no';
      this.isValidity = false;
      this.student.endPeriod =
      this.student.endPeriod != ''
      ? this.student.endPeriod
      : 'Aucune Souscription';
      this.messageBusAccess =
      "L'étudiant : " +
      this.student.fullname.toUpperCase() +
      ", n'a pas accès au bus.";
    }
  }

  async annuler(){
    this.student = '';
    this.messageBusAccessStatus = ''
  }

  async save() {
    try {
      this.object = {
        matricule: this.add.value.matricule,
        fullname: this.add.value.fullname,
        cycle: this.add.value.cycle,
        level: this.add.value.level,
        email: this.add.value.email,
        phone: this.add.value.phone,
        picture: this.linkUrl,
        login: '',
        password: '',
        createdAt: await this.others.getCurrentDate(),
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        beginPeriod: await this.others.getFirstMondayOfSecondWeekOfSeptember(),
        endPeriod: await this.others.addDaysToFirstMondayOfSecondWeek(),
      };

      const collectionName = this.collectionnName;
      const isSave = this.add.valid;
      const operation = 'save';

      console.log(this.object, collectionName, isSave, operation);

      const result = await this.api.actionAlert(
        this.object,
        collectionName,
        isSave,
        operation
        );

      if (result) {
        this.add.reset();
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

  async actionsAboutStudent(object: any) {
    this.variable = object;
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

  async updateStudent() {
    try {
      const object = {
        matricule: this.add.value.matricule,
        fullname: this.add.value.fullname,
        cycle: this.add.value.cycle,
        level: this.add.value.level,
        email: this.add.value.email,
        phone: this.add.value.phone,
        picture: this.linkUrl,
        login: this.variable.login,
        password: this.variable.password,
        createdAt: this.variable.createdAt,
        createdBy: this.variable.createdBy,
        updatedAt: await this.others.getCurrentDate(),
        updatedBy: '',
        beginPeriod: this.variable.beginPeriod,
        endPeriod: this.variable.endPeriod,
      };

      const collectionName = this.collectionnName;
      const isSave = this.add.valid;
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
        this.add.reset();
        this.image = '';
        this.loadData();
      }

      // Utilisez le résultat si nécessaire
      console.log(result);
    } catch (error) {
      console.error("Erreur lors de l'appel à actionAlert :", error);
    }
  }

  startQRScanner() {
    console.log('Attempting to start QR scanner...');

    this.platform.ready().then(() => {
      console.log('Platform is ready.');

      this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        console.log('QR scanner status:', status);

        if (status.authorized) {
          console.log('QR scanner authorized. Starting scan...');

          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

              // Handle the scanned text as needed

              this.qrScanner.hide(); // Hide the camera preview
              scanSub.unsubscribe(); // Stop scanning
            });

            this.qrScanner.show(); // Show the camera preview
          } else if (status.denied) {
            console.log('Camera permission denied.');
            // Camera permission was permanently denied
            // You can guide the user to the settings page
            // using this.qrScanner.openSettings();
          } else {
            console.log('Camera permission denied, but not permanently.');
            // Permission was denied, but not permanently
            // You can ask for permission again at a later time
          }
        })
      .catch((error: any) => {
        console.error('Error initializing QR scanner', error);
      });
    });
  }

  onInput(event: any) {
    const inputValue = event.detail.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Format the date (YYYY/MM/DD)
    if (numericValue.length >= 4) {
      this.formattedDate =
        numericValue.substring(0, 4) +
        (numericValue.length >= 6 ? '/' + numericValue.substring(4, 6) : '') +
        (numericValue.length >= 8 ? '/' + numericValue.substring(6, 8) : '');
    } else {
      this.formattedDate = numericValue;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
