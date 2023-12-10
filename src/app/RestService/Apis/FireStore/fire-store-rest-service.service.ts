// Import des modules Angular et Ionic nécessaires
import { OtherFunctionsService } from './../../Fonctions/Others/other-functions.service';
import { ToastNotificationsService } from './../../Fonctions/Toast/toast-notifications.service';
import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { Observable, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireStoreRestServiceService {
  // Constructeur pour injecter les services nécessaires
  constructor(
    private firestore: Firestore,
    private loadingCtrl: LoadingController,
    private toast: ToastNotificationsService,
    private alertCtrl: AlertController,
    private otherFunctionsService: OtherFunctionsService,
    private actionSheetCtrl: ActionSheetController
  ) {}


  // Méthode pour vérifier si une entité existe dans une collection
  async doesEntityExist(
    keyName: any,
    keyValue: any,
    collectionName: any
  ): Promise<boolean> {
    try {
      const existingStudent = await this.getOne(
        keyName,
        keyValue,
        collectionName
      );
      return existingStudent !== null;
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'existence de la ressource :",
        error
      );
      return false; // Vous pouvez choisir de renvoyer false en cas d'erreur
    }
  }


  async getAllData(collectionName: any): Promise<Observable<any[]>> {
    const loading = await this.loadingCtrl.create({
      message: 'Chargement des données...',
    });

    try {
      await loading.present();

      const data = await getDocs(collection(this.firestore, collectionName));
      const result = data.docs.map((doc) => doc.data());

      await loading.dismiss();

      if (result.length > 0) {
        return from([result]);
      } else {
        this.toast.showResourceUnavailable();
        return from([[]]);  // Retourne un tableau vide si le résultat est vide
      }
    } catch (error) {
      console.error('Error in getAllData:', error);

      // Vous pouvez ajouter un traitement spécifique aux erreurs ici
      // Par exemple, afficher un message d'erreur à l'utilisateur

      this.toast.showResourceUnavailable();
      return throwError(error);  // Retourne une observable avec l'erreur
    }
  }



  // Méthode pour récupérer un seul document de la collection en fonction d'une clé et d'une valeur
  async getOne(
    keyName: any,
    keyValue: any,
    collectionName: any
  ): Promise<DocumentData | null> {
    try {
      const reference = collection(this.firestore, collectionName);
      const q = query(reference, where(keyName, '==', keyValue));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      if (querySnapshot.size > 0) {
        const documentSnapshot: DocumentSnapshot<DocumentData> =
          querySnapshot.docs[0];
        const data = documentSnapshot.data();
        return data !== undefined ? data : null;
      } else {
        return null;
      }
    } catch (error: any) {
      // Gestion des erreurs avec des messages Toast appropriés
      if (error.code === 'unavailable') {
        this.toast.showResourceUnavailable();
      } else {
        let errors = `Impossible de sélectionner la resource ${keyName} reférencée par ${keyValue}`;
        this.toast.showWarning(errors, 5000);
      }
      throw error;
    }
  }

  // Méthode pour générer une chaîne de caractères aléatoire
  async generateRandomString(length: number) {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

  // Méthode pour enregistrer un objet dans la collection
  async save(object: any, collectionName: any): Promise<boolean> {
    try {
      // Appel à d'autres services pour des actions spécifiques
      const rest: any = await this.otherFunctionsService.actionSheetCollection(
        object,
        collectionName
      );

      // Vérifier si l'entité existe déjà
      const doesExist = await this.doesEntityExist(
        rest.keyName,
        rest.keyValue,
        collectionName
      );

      if (doesExist) {
        this.toast.RegistrationIsExist();
        return false; // L'entité existe déjà, retourner false
      } else {
        // Génération de chaînes aléatoires pour login et mot de passe
        const login = await this.generateRandomString(8);
        const password = await this.generateRandomString(10);
        if (
          collectionName == 'student' ||
          collectionName == 'driver' ||
          collectionName == 'administrator'
        ) {
          object.login = login;
          object.password = password;
        }

        object.createdAt = await this.otherFunctionsService.getCurrentDate();

        // Ajout du document dans la collection
        const docRef = await addDoc(
          collection(this.firestore, collectionName),
          object
        );

        if (docRef) {
          // Affichage d'un message Toast en cas de succès
          this.toast.showSuccess(`Enregistrement effectué avec succès`, 5000);
          // Appel à la méthode pour récupérer toutes les données après l'enregistrement
          return true; // Succès, retourner true
        } else {
          // Affichage d'un message Toast en cas d'échec de l'enregistrement
          this.toast.showDanger(`Enregistrement impossible`, 5000);
          return false; // Échec, retourner false
        }
      }
    } catch (error) {
      // Gestion des erreurs lors de l'enregistrement
      console.error(`Erreur durant l'enregistrement :`, error);
      this.toast.showDanger(`Enregistrement impossible`, 5000);
      return false; // Échec en cas d'erreur
    }
  }

  // Méthode pour mettre à jour un document dans la collection (à implémenter)
  // Méthode pour mettre à jour un document de la collection en fonction d'une clé et d'une valeur
  async updateOne(
    keyName: string,
    keyValue: any,
    collectionName: string,
    updatedData: any
  ): Promise<boolean> {
    try {
      const reference = collection(this.firestore, collectionName);
      const q = query(reference, where(keyName, '==', keyValue));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

      if (querySnapshot.size > 0) {
        const documentSnapshot = querySnapshot.docs[0];

        // Utiliser setDoc pour mettre à jour ou créer le document
        await setDoc(documentSnapshot.ref, updatedData);

        // Affichage d'un message Toast en cas de succès
        this.toast.showSuccess(
          `La ressource ${keyName} référencée par ${keyValue} a bien été mise à jour`,
          5000
        );

        // Appel à la méthode pour récupérer toutes les données après la mise à jour

        // Renvoyer true pour indiquer que la mise à jour a réussi
        return true;
      } else {
        // Affichage d'un message Toast si aucun document trouvé pour la mise à jour
        this.toast.showWarning(
          `Dans la section ${keyName}, aucune ressource identifiée par ${keyValue} n'a été trouvée`,
          5000
        );

        // Renvoyer false pour indiquer que la mise à jour a échoué
        return false;
      }
    } catch (error: any) {
      // Gestion des erreurs avec des messages Toast appropriés
      if (error.code === 'unavailable') {
        this.toast.showResourceUnavailable();
      } else {
        let errors = `Impossible de mettre à jour la ressource ${keyName} référencée par ${keyValue}`;
        this.toast.showWarning(errors, 5000);
      }

      // Renvoyer false en cas d'erreur
      return false;
    }
  }

  // Méthode pour supprimer un document de la collection en fonction d'une clé et d'une valeur
  async deleteOne(
    keyName: string,
    keyValue: any,
    collectionName: string
  ): Promise<boolean> {
    try {
      const reference = collection(this.firestore, collectionName);
      const q = query(reference, where(keyName, '==', keyValue));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

      if (querySnapshot.size > 0) {
        const documentSnapshot = querySnapshot.docs[0];
        // Suppression du document de la collection
        await deleteDoc(documentSnapshot.ref);

        // Affichage d'un message Toast en cas de succès
        this.toast.showSuccess(
          `La ressource ${keyName} référencée par ${keyValue} a bien été supprimée`,
          5000
        );


        // Renvoyer true pour indiquer que la suppression a réussi
        return true;
      } else {
        // Affichage d'un message Toast si aucun document trouvé pour la suppression
        this.toast.showWarning(
          `Dans la section ${keyName}, aucune ressource identifiée par ${keyValue} n'a été trouvée`,
          5000
        );

        // Renvoyer false pour indiquer que la suppression a échoué
        return false;
      }
    } catch (error: any) {
      // Gestion des erreurs avec des messages Toast appropriés
      if (error.code === 'unavailable') {
        this.toast.showResourceUnavailable();
      } else {
        let errors = `Impossible de sélectionner la ressource ${keyName} référencée par ${keyValue}`;
        this.toast.showWarning(errors, 5000);
      }

      // Renvoyer false en cas d'erreur
      return false;
    }
  }

  async actionAlert(
    object: any,
    collectionName: any,
    isSave: any,
    operation: any
  ): Promise<boolean> {
    try {
      if (isSave) {
        // Construction du message pour l'alerte en appelant un service externe
        const asyncMessage: string =
          await this.otherFunctionsService.respMessage(
            object,
            collectionName,
            operation
          );

        console.log(object, collectionName, operation);

        // Création d'une promesse qui sera résolue plus tard
        return new Promise<boolean>(async (resolve) => {
          // Affichage de l'alerte avec des boutons "Annuler" et "Continuer"
          const alert = await this.alertCtrl.create({
            header: 'Êtes vous sûres?',
            message: asyncMessage,
            buttons: [
              {
                text: 'Annuler',
                role: 'cancel',
                handler: () => {
                  // Annulation : résoudre la promesse avec false
                  resolve(false);
                },
              },
              {
                text: 'Continuer',
                handler: async () => {
                  // Appel à la méthode appropriée en fonction de l'opération (enregistrement ou suppression)
                  const rest: any =
                    await this.otherFunctionsService.actionSheetCollection(
                      object,
                      collectionName
                    );
                  try {
                    if (operation == 'save') {
                      const result = await this.save(object, collectionName);
                      // Résoudre la promesse avec le résultat de la fonction save
                      resolve(result);
                    } else if (operation == 'delete') {
                      const result = await this.deleteOne(
                        rest.keyName,
                        rest.keyValue,
                        collectionName
                      );
                      // Résoudre la promesse avec le résultat de la fonction deleteOne
                      resolve(result);
                    } else if (operation == 'update') {
                      const result = await this.updateOne(rest.keyName, rest.keyValue,
                        collectionName, object);
                        resolve(result);
                    }
                  } catch (error) {
                    // Affichage d'un message Toast en cas d'erreur pendant l'enregistrement ou la suppression
                    this.toast.showDanger(
                      `Désolé cette opération est impossible`,
                      5000
                    );
                    // Résoudre la promesse avec false en cas d'erreur
                    resolve(false);
                  }
                },
              },
            ],
          });
          // Affichage de l'alerte
          await alert.present();
        });
      } else {
        this.toast.showDanger(`Données sont abscentes ou incorrectes`, 5000);
        // Si isSave n'est pas vrai, résoudre la promesse avec false
        return false;
      }
    } catch (error) {
      // Affichage d'un message Toast en cas d'erreur générale
      console.log(error);
      this.toast.showDanger(
        `Désolé cette action est actuellement impossible`,
        5000
      );
      // Résoudre la promesse avec false en cas d'erreur
      return false;
    }
  }

  // Méthode pour afficher un Action Sheet avec des options de suppression et de modification
  async actionSheetData(object: any, collectionName: any): Promise<any> {
    return new Promise(async (resolve) => {
      const asyncMessage: string =
        await this.otherFunctionsService.HeaderActionSheetResponse(
          object,
          collectionName
        );
      const actionSheet = await this.actionSheetCtrl.create({
        header: asyncMessage,
        buttons: [
          {
            icon: 'trash-outline',
            text: 'Suppression',
            role: 'destructive',
            data: {
              action: 'supprimer',
            },
            handler: async () => {
              // Appel à la méthode d'alerte pour la suppression
              const result = await this.actionAlert(
                object,
                collectionName,
                true,
                'delete'
              );
              resolve(result); // Résoudre la promesse avec le résultat de l'action
            },
          },
          {
            icon: 'create-outline',
            text: 'Modification',
            data: {
              action: 'modifier',
            },
            handler: () => {
              resolve(null); // Résoudre la promesse avec false car la modification n'est pas encore implémentée
            },
          },
        ],
      });

      // Affichage du Action Sheet
      await actionSheet.present();
    });
  }
}
