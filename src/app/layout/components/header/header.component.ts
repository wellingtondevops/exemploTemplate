import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Notify } from './../../../models/notify';
import { NotifyService } from './../../../services/notify/notify.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    email: String = '';
    name: String = '';
    userId: String = '';
    data: number = Date.now();
    notify: Notify;
    active: boolean;
    key = '';
    notifys: Observable<any>;
    notifysMail: Observable<any>;
    notifysUpuload: Observable<any>;
    ArrUpload: Observable<any>;
    notifyRef: any;
    sizeArr: Observable<any>;
    ArrMail: Observable<any>;
    newName: String;

    constructor(
        private translate: TranslateService, public router: Router,
        private notifyService: NotifyService ) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.email = window.localStorage.getItem('email');
        this.name = window.localStorage.getItem('name');
        this.newName = this.name.split(' ', 2).toString();
        this.userId = window.localStorage.getItem('id'); //
        // this.id = window.localStorage.getItem('id');
        this.notify = new Notify();
        this.notifys = this.notifyService.getAll(this.userId);
        this.notifysMail = this.notifyService.getAllMail('email-' + this.userId);
        this.notifysUpuload = this.notifyService.getAllUpload('upload-' + this.userId);
        this.sizeArr = this.notifyService.getlength(this.userId);
        this.ArrMail = this.notifyService.getlengthMail('email-' + this.userId);
        this.ArrUpload = this.notifyService.getlengthUpload('upload-' + this.userId);


        // UPDATE
        this.notifyService.currentNotify.subscribe(data => {
            if (data.notify && data.key) {
                this.notify = new Notify();
                this.notify.active = data.notify.active;
                this.key = data.key;
            }
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('profiles');
        localStorage.removeItem('routes');
        localStorage.removeItem('actions');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    clearNotify(key: string) {
        this.notifyService.update(key);
    }

    clearEmail(key: string) {
        this.notifyService.updateMail('email-' + key);
    }

    delete(key: string) {
        this.notifyService.delete(key);
    }
}
