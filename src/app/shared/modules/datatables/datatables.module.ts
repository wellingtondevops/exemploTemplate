import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DatatablesComponent } from './datatables.component';

@NgModule({
    imports: [CommonModule, RouterModule, NgxDatatableModule],
    declarations: [DatatablesComponent],
    exports: [DatatablesComponent]
})
export class DatatablesModule {}
