import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbdModalConfirmComponent } from '../shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbdModalConfirmModule } from '../shared';
import { Masks } from '../utils/masks';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        NgbdModalConfirmModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
    entryComponents: [
        NgbdModalConfirmComponent
    ],
    providers: [
        Masks
    ]
})
export class LayoutModule {}
