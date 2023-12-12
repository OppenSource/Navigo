import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationsService {
  RegistrationIsExist() {
    throw new Error('Method not implemented.');
  }
  constructor(private toastController: ToastController) {}

  /**
   * Affiche un toast avec les paramètres spécifiés.
   * @param message Message à afficher dans le toast.
   * @param color Couleur du toast.
   * @param position Position du toast sur l'écran.
   * @param icon Nom de l'icône à afficher dans le toast.
   * @param duration Durée d'affichage du toast en millisecondes.
   */
  async showToast(message: any, color: any, position: any, icon: any, duration: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color,
      icon: icon,
      position: position,
    });
    await toast.present();
  }

  // Actions de notification spécifiques

  /** Affiche un toast de succès. */
  async showSuccess(message: any, duration: any) {
    this.showToast(message, 'primary', 'middel', 'happy-outline', 5000);
  }

  /** Affiche un toast d'erreur. */
  async showDanger(message: any, duration: any) {
    this.showToast(message, 'danger', 'bottom', 'close-circle-outline', 5000);
  }

  /** Affiche un toast d'avertissement. */
  async showWarning(message: any, duration: any) {
    this.showToast(message, 'dark', 'bottom', 'dark-outline', 5000);
  }

  /** Affiche un toast neutre. */
  async showNeutral(message: any, duration: any) {
    this.showToast(message, 'primary', 'bottom', 'help-outline', 5000);
  }

  /** Affiche un toast pour indiquer que la connexion Internet est rétablie. */
  async showInternetReady() {
    this.showToast('Connexion internet rétablie.', 'primary', 'bottom', 'wifi-outline', 5000);
  }

  /** Affiche un toast pour indiquer que la connexion Internet est perdue. */
  async showInternetLost() {
    this.showToast('Connexion internet perdue.', 'dark', 'bottom', 'construct-outline', 5000);
  }

  /** Affiche un toast pour indiquer qu'une ressource est indisponible. */
  async showResourceUnavailable() {
    this.showToast('Désolé mais cette ressource est indisponible.', 'dark', 'bottom', 'cloud-offline-outline', 5000);
  }

  /** Affiche un toast pour indiquer que l'upload de la photo a réussi. */
  async showUploadSuccess() {
    this.showToast('La photo a bien été exportée.', 'primary', 'middle', 'cloud-done-outline', 5000);
  }

  /** Affiche un toast pour indiquer que l'upload de la photo a échoué. */
  async showUploadFailure() {
    this.showToast("Impossible d'exporter la photo.", 'danger', 'bottom', 'cloud-offline-outline', 5000);
  }

  /** Affiche un toast pour indiquer que la connexion Internet est perdue. */
  async showOffline() {
    this.showToast('Connexion Internet perdue.', 'danger', 'bottom', 'planet-outline', 3500);
  }

  /** Affiche un toast pour indiquer qu'une tentative de duplication a échoué. */
  async showRegistrationExistenceError() {
    this.showToast(
      'Désolé mais il semblerait que vous essayez de dupliquer une ressource déjà existante.',
      'dark',
      'bottom',
      'dark-outline',
      3500
    );
  }

  /** Affiche un toast pour indiquer que la connexion Internet est rétablie. */
  async showOnline() {
    this.showToast('Connexion à internet rétablie.', 'primary', 'bottom', 'wifi-outline', 3500);
  }
}
