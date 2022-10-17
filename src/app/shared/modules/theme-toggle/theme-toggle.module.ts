import { NgxLoadingModule } from 'ngx-loading';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeToggleComponent } from './theme-toggle.component';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxLoadingModule.forRoot({})
    ],
    declarations: [ThemeToggleComponent, ],
    exports: [ThemeToggleComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThemeToggleModule { }
