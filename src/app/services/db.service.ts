import { Etudiant } from './etudiant';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  etudiantList: any = new BehaviorSubject([]);
  private storage: SQLiteObject | any;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter
  ) {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'positronx_db.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchEtudiants(): Observable<Etudiant[]> {
    return this.etudiantList.asObservable();
  }
  // Render fake data
  getFakeData() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_) => {
            this.getEtudiants();
            this.isDbReady.next(true);
          })
          .catch((error) => console.error(error));
      });
  }

  // Get list
  getEtudiants() {
    return this.storage.executeSql('SELECT * FROM etudiantable', []).then(
      (res: {
        rows: {
          length: number;
          item: (arg0: number) => {
            (): any;
            new (): any;
            id: any;
            fullname: any;
            email: any;
            phone: any;
            matricule: any;
            cycle: any;
            speciality: any;
            niveau: any;
          };
        };
      }) => {
        let items: Etudiant[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              fullname: res.rows.item(i).fullname,
              email: res.rows.item(i).email,
              phone: res.rows.item(i).phone,
              matricule: res.rows.item(i).matricule,
              cycle: res.rows.item(i).cycle,
              speciality: res.rows.item(i).speciality,
              niveau: res.rows.item(i).niveau,
            });
          }
        }
        this.etudiantList.next(items);
      }
    );
  }

  // Add
  addSong(
    fullname: any,
    email: any,
    phone: any,
    matricule: any,
    cycle: any,
    speciality: any,
    niveau: any
  ) {
    let data = [fullname, email, phone, matricule, cycle, speciality, niveau];
    return this.storage
      .executeSql(
        'INSERT INTO etudiantable (fullname, email, phone, matricule, cycle, speciality, niveau) VALUES (?, ?, ?, ?, ?, ?, ?)',
        data
      )
      // .then((res: any) => {
      //   this.getEtudiants();
      // });
      .then((result: any) => {
        // Code to execute when the promise is resolved
        console.log(result)
      })
      .catch((error: any) => {
        // Code to handle any errors that occur during the promise chain
        console.error(error);
      });

  }

  // Get single object
  getSong(id: any): Promise<Etudiant> {
    return this.storage
      .executeSql('SELECT * FROM etudiantable WHERE id = ?', [id])
      .then(
        (res: {
          rows: {
            item: (arg0: any) => {
              (): any;
              new (): any;
              id: any;
              fullname: any;
              email: any;
              phone: any;
              matricule: any;
              cycle: any;
              speciality: any;
              niveau: any;
            };
          };
        }) => {
          return {
            id: res.rows.item(0).id,
            fullname: res.rows.item(0).fullname,
            email: res.rows.item(0).email,
            phone: res.rows.item(0).phone,
            matricule: res.rows.item(0).matricule,
            cycle: res.rows.item(0).cycle,
            speciality: res.rows.item(0).speciality,
            niveau: res.rows.item(0).niveau,
          };
        }
      );
  }

  // Update
  updateSong(id: any, etudiant: Etudiant) {
    let data = [
      etudiant.fullname,
      etudiant.email,
      etudiant.phone,
      etudiant.matricule,
      etudiant.cycle,
      etudiant.speciality,
      etudiant.niveau,
    ];
    return this.storage
      .executeSql(
        `UPDATE etudiantable SET fullname = ?, email = ?, phone = ?, matricule = ?, cycle = ?, speciality = ?, niveau = ? WHERE id = ${id}`,
        data
      )
      .then((data: any) => {
        this.getEtudiants();
      });
  }

  // Delete
  deleteSong(id: any) {
    return this.storage
      .executeSql('DELETE FROM etudiantable WHERE id = ?', [id])
      .then((_: any) => {
        this.getEtudiants();
      });
  }
}
