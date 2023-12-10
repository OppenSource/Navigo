import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OtherFunctionsService {
  constructor(private datePipe: DatePipe) {}

  ReformatEmail = (email: string): string =>
    email.indexOf('@') > 0
      ? `${email.substring(0, email.indexOf('@'))}@...org`
      : email;

  getCurrentDate = async (): Promise<string> =>
    this.datePipe.transform(new Date(), 'yyyy/MM/dd HH:mm:ss') || '';

  isDateAfterToday = async (inputDate: string): Promise<boolean> => {
    const providedDate = new Date(inputDate);
    providedDate.setHours(0, 0, 0, 0);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return providedDate > currentDate;
  };

  respMessage = (
    object: any,
    collectionName: string,
    action: string
  ): string => {
    const { fullname, matricule, registration, subname } = object || {};
    const upperMatricule = matricule?.toUpperCase() || '';

    switch (collectionName) {
      case 'student':
        return `Souhaitez-vous vraiment ${this.reallyAction(
          action
        )} l'étudiant ${fullname?.toUpperCase()} identifié par la matricule ${upperMatricule}`;
      case 'bus':
        return `Souhaitez-vous vraiment ${this.reallyAction(
          action
        )} le bus ayant pour immatriculation ${registration?.toUpperCase()} ?`;
      case 'driver':
        return `Souhaitez-vous vraiment ${this.reallyAction(
          action
        )} le chauffeur ${fullname?.toUpperCase()} ayant le surnom ${subname?.toUpperCase()}?`;
      // ... Ajoutez d'autres cas selon les besoins
      default:
        return '';
    }
  };

  // reallyAction = (action: string): string =>
  //   action === 'save' ? 'enregistrer' : 'supprimer';

  reallyAction = (action: string): string =>
    action === 'save'
      ? 'enregistrer'
      : action === 'update'
      ? 'modifier'
      : action === 'delete'
      ? 'supprimer'
      : '';

  HeaderActionSheetResponse = (object: any, collectionName: string): string => {
    const { fullname, matricule, registration } = object || {};

    switch (collectionName) {
      case 'student':
        return `Etudiant : ${fullname.toUpperCase()} ( ${matricule} )`;
      case 'bus':
        return `Bus : Immatriculation ${registration.toUpperCase()}`;
      case 'driver':
        return `Chauffeur :  ${fullname.toUpperCase()}`;
      // ... Ajoutez d'autres cas selon les besoins
      default:
        return '';
    }
  };

  actionSheetCollection = (
    object: any,
    collectionName: string
  ): { keyName: string; keyValue: string } => {
    const response = { keyName: '', keyValue: '' };

    switch (collectionName) {
      case 'student':
        response.keyName = 'matricule';
        response.keyValue = object.matricule;
        break;
      case 'driver':
        response.keyName = 'fullname';
        response.keyValue = object.fullname;
        break;
      case 'bus':
        response.keyName = 'registration';
        response.keyValue = object.registration;
        break;
      // ... Ajoutez d'autres cas selon les besoins
    }

    return response;
  };

  getGreeting = (): string => {
    const currentHour = new Date().getHours();
    return currentHour >= 5 && currentHour < 12
      ? 'Good morning'
      : currentHour >= 12 && currentHour < 18
      ? 'Good afternoon'
      : 'Good evening';
  };
}
