import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { DaenerysGuardService } from 'src/app/services/guard/daenerys-guard.service';
import { TywinGuardService } from 'src/app/services/guard/tywin-guard.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
    @Input() heading: string;
    @Input() icon: string;
    @Input() btnNew: string;
    @Input() routerTo: string;
    @Input() permissionBtnNew: any;
    @Input() modalNew: Boolean;

    @Output() show = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    openNew(){
        this.show.emit();
    }
}
