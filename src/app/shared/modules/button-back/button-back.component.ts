import { Component, Output, EventEmitter, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-button-back',
    templateUrl: './button-back.component.html',
    styleUrls: ['./button-back.component.scss']
})
@Injectable()
export class ButtonBackComponent {
    @Input() redirectTo: string;

    constructor(
        private _route: Router
    ) {}

    redirect() {
        this._route.navigate([`/${this.redirectTo}`]);
    }


}