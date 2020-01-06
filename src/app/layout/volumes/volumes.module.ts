import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { VolumesRoutingModule } from './volumes-routing.module';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ImportVolumeComponent } from './import-volume/import-volume.component';

@NgModule({
    declarations: [ShowComponent, ListComponent, NewComponent, EnumToArrayPipe, EditComponent, ImportVolumeComponent],
    imports: [
        CommonModule,
        VolumesRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        NgbModule,
        TranslateModule,
        ButtonBackModule,
        ButtonsCustomModule,
        NgxLoadingModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [NgbActiveModal]
})
export class VolumesModule {}
