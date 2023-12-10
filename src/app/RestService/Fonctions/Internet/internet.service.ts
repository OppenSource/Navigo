import { Injectable, OnDestroy } from '@angular/core';
import { Network, ConnectionStatus } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastNotificationsService } from '../Toast/toast-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class InternetService implements OnDestroy {
  private networkListener: PluginListenerHandle;
  private isConnected: boolean;
  private destroy$: Subject<void> = new Subject<void>();
  private statusChanged: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  constructor(private toast: ToastNotificationsService) {
    this.isConnected = true; // Assuming online by default
    this.networkListener = Network.addListener(
      'networkStatusChange',
      (status) => this.updateNetworkStatus(status)
    );
    this.initializeNetworkStatus();
  }

  private async initializeNetworkStatus() {
    const status = await Network.getStatus();
    this.updateNetworkStatus(status);
  }

  getNetworkStatus(): boolean {
    return this.isConnected;
  }

  getStatusChangedObservable(): Observable<boolean> {
    return this.statusChanged.asObservable();
  }

  private updateNetworkStatus(status: ConnectionStatus) {
    console.log('Network status changed', status);
    this.isConnected = status.connected;
    this.statusChanged.next(this.isConnected);
    if (this.isConnected == false) {
      this.toast.showInternetLost();
    }else{
      this.toast.showInternetReady();
    }
  }

  ngOnDestroy() {
    this.networkListener.remove();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
