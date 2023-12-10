import { OtherFunctionsService } from 'src/app/RestService/Fonctions/Others/other-functions.service';
import { Component, OnInit } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { FireStoreRestServiceService } from 'src/app/RestService/Apis/FireStore/fire-store-rest-service.service';
import { UploadFileService } from 'src/app/RestService/Fonctions/Uploading/upload-file.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
  providers: [DatePipe],
})
export class StudentPage implements OnInit {
  selected: any = 'list';
  selected1: any = 'newAccesibility';
  add: FormGroup | any;
  image: any;
  imageUrl: any;
  linkUrl: any = '';
  currentDate: any;
  listeStudent: any[] = [];
  object: any;
  isReady = false;
  response: any;
  isModalOpen = false;
  isValidity = false;
  readyToUpdate: any;
  resultSearch: any[] = [];
  autocomplete: any[] = [];

  data: any[] = [];
  data1: any[] = [];
  student: any;
  messageBusAccess: any = '';
  messageBusAccessStatus: any = '';

  qrData = 'Hello, this is your QR Code data!';
  scannedData: any;

  isSupported = false;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    private FireStoreRestServiceService: FireStoreRestServiceService,
    private OtherFunctionsService: OtherFunctionsService,
    private UploadFileService: UploadFileService
  ) {}

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
  }

  async loadData() {
    (await this.FireStoreRestServiceService.getAllData('student')).subscribe(
      (result) => {
        this.data = result;
        this.data1 = result;
      },
      (error) => {
        console.error('Erreur lors du chargement des données :', error);
        // Gérez l'erreur, par exemple, affichez un message à l'utilisateur
      }
    );
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
        createdAt: await this.OtherFunctionsService.getCurrentDate(),
        createdBy: '',
        updatedAt: '',
        updatedBy: '',
        beginPeriod: '',
        endPeriod: '',
      };

      const result = await this.FireStoreRestServiceService.actionAlert(
        this.object,
        'student',
        this.add.valid,
        'save'
      );

      setTimeout(() => {
        this.add.reset();
        this.image = '';
        this.loadData();
      }, 6000);
    } catch (error) {
      console.error(
        "Erreur lors de la préparation de l'enregistrement :",
        error
      );
    }
  }

  actionsAboutStudent(object: any) {
    this.FireStoreRestServiceService.actionSheetData(object, 'student');
  }

  async takePicture() {
    try {
      const result = await this.UploadFileService.readyToUploadFile();
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

  maskEmail(item: any) {
    return this.OtherFunctionsService.ReformatEmail(item);
  }

  updateStudent() {}

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
    const end = await this.OtherFunctionsService.isDateAfterToday(
      this.student.endPeriod
    );
    console.log(end)

    if (end) {
      this.messageBusAccessStatus = 'yes';
      this.messageBusAccess =
        'the student: ' +
        this.student.fullname.toUpperCase() +
        ', have access to the bus.';
      this.isValidity = true;
    } else {
      this.messageBusAccessStatus = 'no';
      this.student.endPeriod =
        this.student.endPeriod != ''
          ? this.student.endPeriod
          : 'No subscription';
      this.messageBusAccess =
        'the student: ' +
        this.student.fullname.toUpperCase() +
        ', does not have access to the bus.';
    }
  }
}
