import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { routerTransitions } from './router.animations';
import { ThemeService } from './services/theme/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [ routerTransitions ],
})
export class AppComponent implements OnInit {

    constructor(
        translate: TranslateService,
        private themeService: ThemeService,
        private renderer: Renderer2) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('pt-BR');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('pt-BR');
    }

    ngOnInit(): void {
        this.themeService.themeChanges().subscribe(theme => {
            if (theme.oldValue) {
                this.renderer.removeClass(document.body, theme.oldValue);
            }
            this.renderer.addClass(document.body, theme.newValue);
        })
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
