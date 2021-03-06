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
  @Input() id: string

  constructor(
    private _route: Router
  ) { }

  redirect() {
    if (this.id) {
      this._route.navigate([`/${this.redirectTo}`, this.id]);
    } else {
      this._route.navigate([`/${this.redirectTo}`]);
    }
    
  }


}