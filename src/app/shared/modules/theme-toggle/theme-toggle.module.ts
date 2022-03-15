import { ThemeToggleComponent } from './theme-toggle.component';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ThemeToggleComponent],
    exports: [ThemeToggleComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThemeToggleModule { }
