import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
    selector: 'app-theme-toggle',
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

    theme: string = 'bootstrap';

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
    }

    toggleTheme() {
        if (this.theme === 'bootstrap') {
            this.theme = 'bootstrap-dark';
        } else {
            this.theme = 'bootstrap';
        }

        this.themeService.setTheme(this.theme)
    }

}
