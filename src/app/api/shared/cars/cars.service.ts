import {
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  constructor(private firestore: Firestore) {}

  // recuperer la liste des bus
  getAllBus() {
    const busRef = collection(this.firestore, 'bus');
    return collectionData(busRef);
  }

  // selectionner un bus appartir de son matricule
  selectOneByRegistration(registration: string): Promise<any> {
    const busCollectionRef = collection(this.firestore, 'bus');
    const q = query(
      busCollectionRef,
      where('registration', '==', registration)
    );

    return getDocs(q)
      .then((querySnapshot: QuerySnapshot) => {
        if (querySnapshot.size > 0) {
          // Si le champ d'immatriculation est unique, utilisez querySnapshot.docs[0] pour obtenir le premier document
          const documentSnapshot: DocumentSnapshot = querySnapshot.docs[0];
          return documentSnapshot.data();
        } else {
          return null; // Aucun document correspondant trouvé
        }
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la sélection du document par immatriculation :',
          error
        );
        throw error;
      });
  }

  // enregistrer un bus
  addBus(bus: any) {
    const busRef = collection(this.firestore, 'bus');
    return addDoc(busRef, bus);
  }

  // Supprimer un bus par numéro d'immatriculation
  deleteBusByRegistration(registration: string): Promise<void> {
    const busCollectionRef = collection(this.firestore, 'bus');
    const q = query(
      busCollectionRef,
      where('registration', '==', registration)
    );

    return getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          const documentSnapshot = querySnapshot.docs[0];
          const busDocRef = doc(this.firestore, 'bus', documentSnapshot.id);
          return deleteDoc(busDocRef);
        } else {
          throw new Error(
            `Aucun bus avec l'immatriculation ${registration} trouvé.`
          );
        }
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la suppression du bus par immatriculation :',
          error
        );
        throw error;
      });
  }

  // Modifier un bus par numéro d'immatriculation

  updateBusByRegistration(
    registration: string,
    updatedData: any
  ): Promise<void> {
    const busCollectionRef = collection(this.firestore, 'bus');
    const q = query(
      busCollectionRef,
      where('registration', '==', registration)
    );

    return getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          const documentSnapshot = querySnapshot.docs[0];
          const busDocRef = doc(this.firestore, 'bus', documentSnapshot.id);
          return updateDoc(busDocRef, updatedData);
        } else {
          throw new Error(
            `Aucun bus avec l'immatriculation ${registration} trouvé.`
          );
        }
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la modification du bus par immatriculation :',
          error
        );
        throw error;
      });
  }
}
