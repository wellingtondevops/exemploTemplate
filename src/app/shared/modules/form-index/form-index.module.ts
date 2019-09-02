import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FormIndexComponent } from './form-index.component';

@NgModule({
    imports: [CommonModule, RouterModule, NgxDatatableModule],
    declarations: [FormIndexComponent],
    exports: [FormIndexComponent]
})
export class FormIndexModule {}
