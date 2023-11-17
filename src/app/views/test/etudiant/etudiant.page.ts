import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.page.html',
  styleUrls: ['./etudiant.page.scss'],
})
export class EtudiantPage implements OnInit {
  selected: any = 'nouveau';
  register: FormGroup | any;
  student: any = {
    fullname: '',
    email: '',
    phone: '',
    matricule: '',
    cycle: '',
    speciality: '',
    niveau: '',
  };
  listeEtudiant: any[] = [];

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchEtudiants().subscribe((etudiants) => {
          this.listeEtudiant = etudiants;
          console.log(this.listeEtudiant);
        });
      }
    });

    this.register = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@institutsaintjean+.org$'),
        ],
      ],
      matricule: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
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
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      cycle: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
      niveau: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.register.controls;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Renseignez tous les champs avant de continuer.',
      duration: 3000,
      color: 'danger',
      icon: 'alert-circle-outline',
      position: 'bottom',
    });
    await toast.present();
  }

  async successRegistration() {
    const toast = await this.toastController.create({
      message: "L'étudiant a été créer avec succès.",
      duration: 5000,
      color: 'success',
      icon: 'happy-outline',
      position: 'top',
    });
    await toast.present();
  }

  submitForm = () => {
    if (this.register.valid) {
      this.student.fullname = this.register.value.fullname;
      this.student.email = this.register.value.email;
      this.student.phone = this.register.value.phone;
      this.student.matricule = this.register.value.matricule;
      this.student.cycle = this.register.value.cycle;
      this.student.speciality = this.register.value.speciality;
      this.student.niveau = this.register.value.niveau;
      this.listeEtudiant.push(this.student);
      setTimeout(() => {
        this.register.reset();
        this.successRegistration();
        this.selected = "liste";
      }, 800);

      return false;
    } else {
      this.presentToast();
      return '';
    }
  };
}
