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

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private firestore: Firestore) {}

  // recuperer la liste des student
  getAllstudent() {
    const studentRef = collection(this.firestore, 'student');
    return collectionData(studentRef);
  }

  // selectionner un student appartir de son matricule
  selectOneByMatricule(matricule: string): Promise<any> {
    const studentCollectionRef = collection(this.firestore, 'student');
    const q = query(
      studentCollectionRef,
      where('matricule', '==', matricule)
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

  // enregistrer un student
  addOneStudent(student: any) {
    const studentRef = collection(this.firestore, 'student');
    return addDoc(studentRef, student);
  }

  // Supprimer un student par un matricule
  deletestudentByMatricule(matricule: string): Promise<void> {
    const studentCollectionRef = collection(this.firestore, 'student');
    const q = query(
      studentCollectionRef,
      where('matricule', '==', matricule)
    );

    return getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          const documentSnapshot = querySnapshot.docs[0];
          const studentDocRef = doc(this.firestore, 'student', documentSnapshot.id);
          return deleteDoc(studentDocRef);
        } else {
          throw new Error(
            `Aucun étudiant avec le matricule ${matricule} trouvé.`
          );
        }
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la suppression de l\'étudiant par matricule :',
          error
        );
        throw error;
      });
  }

  // Modifier un student par un matricule

  updatestudentByMatricule(
    matricule: string,
    updatedData: any
  ): Promise<void> {
    const studentCollectionRef = collection(this.firestore, 'student');
    const q = query(
      studentCollectionRef,
      where('matricule', '==', matricule)
    );

    return getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          const documentSnapshot = querySnapshot.docs[0];
          const studentDocRef = doc(this.firestore, 'student', documentSnapshot.id);
          return updateDoc(studentDocRef, updatedData);
        } else {
          throw new Error(
            `Aucun étudiant avec le matricule ${matricule} trouvé.`
          );
        }
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la modification de l\'étudiant par matricule :',
          error
        );
        throw error;
      });
  }
}
