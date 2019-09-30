import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonBackComponent } from './button-back.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ButtonBackComponent],
    exports: [ButtonBackComponent]
})
export class ButtonBackModule {}
