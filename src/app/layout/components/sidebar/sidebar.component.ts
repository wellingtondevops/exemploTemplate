import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;
  permissionAdmin: boolean;
  permissionPesquisador: boolean;
  permissionArquivador: boolean;
  isArchivesSearch: boolean = false;
  isArchivesRegister: boolean = false;
  isVolumesSearch: boolean = false;
  isVolumesErrors: boolean = false;
  isVolumesImport: boolean = false;
  isUsers: boolean = false;
  isStorehouses: boolean = false;
  isCompanies: boolean = false;
  isDocuments: boolean = false;
  isDepartaments: boolean = false;
  isArchivesError: boolean = false;
  isArchivesImport: boolean = false;
  isTemplates: boolean = false;

  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(private translate: TranslateService, public router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    this.permissionAdmin = this.isAdmin();
    this.permissionArquivador = this.isTywin();
    this.permissionPesquisador = this.isSnow();
    this.isArchivesSearch = this.isArchiveSearch();
    this.isArchivesRegister = this.isArchiveRegister();
    this.isArchivesImport = this.isArchiveImport();
    this.isVolumesSearch = this.isVolumeSearch();
    this.isUsers = this.isUser();
    this.isStorehouses = this.isStorehouse();
    this.isCompanies = this.isCompany();
    this.isDocuments = this.isDocument();
    this.isDepartaments = this.isDepartament();
    this.isVolumesErrors = this.isVolumeError();
    this.isVolumesImport = this.isVolumeImport();
    this.isArchivesError = this.isArchiveError();
    this.isTemplates = this.isTemplate();
  }

  eventCalled() {
    this.isActive = !this.isActive;
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

  isTywin() {
    let res = false;
    JSON.parse(window.localStorage.getItem('profiles')).map(item => {
      if (item === 'TYWIN') {
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

  isTemplate(){
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].templates) {
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

  isVolumeError() {
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].volumesError) {
      res = true;
    }
    return res;
  }

  isVolumeImport() {
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].volumesImport) {
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

  isDepartament(){
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].departaments) {
      res = true;
    }
    return res;
  }

  isArchiveError(){
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].archivesError) {
      res = true;
    }
    return res;
  }

  isArchiveImport(){
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].archivesImport) {
      res = true;
    }
    return res;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
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

  changeLang(language: string) {
    this.translate.use(language);
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }
}
