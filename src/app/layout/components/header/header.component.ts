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
    userId: String = '';
    data: number = Date.now();
    notify: Notify;
    active: Boolean = false;
    key = '';
    notifys: Observable<any>;

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
        this.email = window.localStorage.getItem('email'); //
        this.userId = window.localStorage.getItem('id'); //
        // this.id = window.localStorage.getItem('id');
        this.notify = new Notify();
        this.notifys = this.notifyService.getAll(this.userId);
        console.log(this.notifys);
        //UPDATE
        this.notifyService.currentNotify.subscribe(data => {
            this.notify.active = data.notify.active;
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
        localStorage.removeItem('profiles');
        localStorage.removeItem('routes');
        localStorage.removeItem('actions');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onSubmit() {
        if (this.key) {
            this.notifyService.update(this.notify, this.key);
        }
    }

    delete(key: string) {
        this.notifyService.delete(key);
    }

    edit(notify: Notify, key: string) {
        this.notifyService.update(notify, key);
    }
    onClick() {
        this.notify.active = !this.notify.active;
    }
}
