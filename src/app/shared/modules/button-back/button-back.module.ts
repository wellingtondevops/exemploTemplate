import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonBackComponent } from './button-back.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ButtonBackComponent],
    exports: [ButtonBackComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonBackModule {}
