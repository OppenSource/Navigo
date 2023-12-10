import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { ToastNotificationsService } from '../Toast/toast-notifications.service';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(
    private toast: ToastNotificationsService,
    private storage: Storage,
    private firestore: Firestore
  ) {}

  async readyToUploadFile() {
    try {
      if (Capacitor.getPlatform() !== 'web') {
        await Camera.requestPermissions();
      }

      const image = await this.capturePhoto();

      if (image) {
        const blob = this.dataURLtoBlob(image.dataUrl);
        const url = await this.uploadImage(blob, image);

        if (url) {
          this.toast.showUploadSuccess();
          await this.addDocument('navigo', { imageUrl: url });
          return { images: image.dataUrl, linkUrl: url, isReady: true };
        } else {
          this.toast.showUploadFailure();
        }
      }
    } catch (e) {
      console.error(e);
      throw e; // Propager l'erreur pour indiquer que la fonction a échoué
    }

    return { images: '', linkUrl: '', isReady: false };
  }

  private async capturePhoto() {
    try {
      const result = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl,
      });

      console.log('image: ', result);
      return result;
    } catch (error) {
      console.error('Error capturing photo:', error);
      throw error;
    }
  }

  private dataURLtoBlob(dataurl: any) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; ++i) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new Blob([u8arr], { type: mime });
  }

  private async uploadImage(blob: any, imageData: any) {
    try {
      const currentDate = Date.now();
      const filePath = `navigo/${currentDate}.${imageData.format}`;
      const fileRef = ref(this.storage, filePath);
      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);
      console.log('Image uploaded successfully:', url);
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  private async addDocument(path: any, data: any) {
    try {
      const dataRef = collection(this.firestore, path);
      await addDoc(dataRef, data);
      console.log('Document added successfully.');
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }
}
