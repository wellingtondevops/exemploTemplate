import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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

    constructor() {
    }

    ngOnInit() {
    }

    permissionOfBtnNew() {
        let res: Boolean = false;
        for (const item in this.permissionBtnNew) {
            JSON.parse(localStorage.getItem('profiles')).forEach(element => {
                if (element === this.permissionBtnNew[item]) {
                    res = true;
                    return;
                }
            });
        }
        return res;
    }
}
