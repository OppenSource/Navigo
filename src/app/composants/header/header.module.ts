import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [IonicModule], // Import IonicModule
  exports: [HeaderComponent]
})
export class HeaderComponentModule {}