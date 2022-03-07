import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { ArchivesSearchGuardService } from 'src/app/services/guard/archives-search-guard.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    permissionAdmin: boolean;
    permissionPesquisador: boolean;
    permissionArquivador: boolean;
    isArchivesSearch = false;
    isArchivesRegister = false;
    isVolumesSearch = false;
    isUsers = false;
    isStorehouses = false;
    isCompanies = false;
    isDocuments = false;
    acceptanceTerm = false;
    isMoves = false;

    constructor(
        public daenerysGuard: DaenerysGuard,
        public router: Router,
    ) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        this.permissionAdmin = this.isAdmin();
        this.permissionPesquisador = this.isSnow();
        this.permissionArquivador = this.isTywin();
        this.isArchivesSearch = this.isArchiveSearch();
        this.isArchivesRegister = this.isArchiveRegister();
        this.isVolumesSearch = this.isVolumeSearch();
        this.isUsers = this.isUser();
        this.isMoves = this.isMove();
        this.isStorehouses = this.isStorehouse();
        this.isCompanies = this.isCompany();
        this.isDocuments = this.isDocument();

    }

    isAdmin() {
        let res = false;
        JSON.parse(window.localStorage.getItem('profiles')).map(item => {
            if (item === 'DAENERYS') {
                res = true;
            }
        });
        return res;
    }

    isSnow() {
        let res = false;
        JSON.parse(window.localStorage.getItem('profiles')).map(item => {
            if (item === 'SNOW') {
                res = true;
            }
        });
        return res;
    }

    isArchiveSearch() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('routes'))[0].archivesSearch) {
            res = true;
        }
        return res;
    }

    isArchiveRegister() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('routes'))[0].archivesRegister) {
            res = true;
        }
        return res;
    }

    isVolumeSearch() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('routes'))[0].volumesSearch) {
            res = true;
        }
        return res;
    }

    isUser() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('routes'))[0].users) {
            res = true;
        }
        return res;
    }

    isStorehouse() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('routes'))[0].storehouses) {
            res = true;
        }
        return res;
    }

    isCompany() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('routes'))[0].companies) {
            res = true;
        }
        return res;
    }

    isDocument() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('routes'))[0].documents) {
            res = true;
        }
        return res;
    }
    isMove() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('routes'))[0].moves) {
            res = true;
        }
        return res;
    }

    isTywin() {
        let res = false;
        JSON.parse(window.localStorage.getItem('profiles')).map(item => {
            if (item === 'TYWIN') {
                res = true;
            }
        });
        return res;
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
