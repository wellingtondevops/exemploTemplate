import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorehousesRoutingModule } from './storehouses-routing.module';
import { PageHeaderModule, DatatablesModule, NgbdModalConfirmModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgxLoadingModule } from 'ngx-loading';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { PieChartComponent } from './show/graphics/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './show/graphics/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './show/graphics/bar-chart/bar-chart.component';

@NgModule({
    declarations: [ListComponent, ShowComponent, NewComponent, EditComponent, PieChartComponent, DoughnutChartComponent, BarChartComponent],
    imports: [
        NgbModule,
        CommonModule,
        StorehousesRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        NgbModule,
        ButtonsCustomModule,
        ChartsModule,
        ButtonBackModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [NgbActiveModal, CaseInsensitive]
})
export class StorehousesModule {}
