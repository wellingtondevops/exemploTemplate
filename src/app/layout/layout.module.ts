import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbdModalConfirmComponent } from '../shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbdModalConfirmModule, ThemeToggleModule } from '../shared';
import { Masks } from '../utils/masks';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowModalComponent } from './departaments/show-modal/show-modal.component';
import { AppComponent } from '../app.component';

@NgModule({
    imports: [
      CommonModule,
      LayoutRoutingModule,
      TranslateModule,
      NgbDropdownModule,
      NgbdModalConfirmModule,
      ThemeToggleModule,
      NgbModule,
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
    providers: [Masks],
})
export class LayoutModule {}
