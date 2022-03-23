import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
    selector: 'app-theme-toggle',
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

    theme: string = 'bootstrap';
    saveTheme: any;

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
        // if (localStorage.getItem('theme') === '') {
        //     localStorage.setItem('theme', 'bootstrap');
        // }
        // // this.themeService.setTheme(localStorage.getItem('theme'));
    }

    toggleTheme() {
        this.theme = localStorage.getItem('theme');

        if (this.theme === 'bootstrap') {
            this.theme = 'bootstrap-dark';
        } else {
            this.theme = 'bootstrap';
        }

        this.themeService.setTheme(this.theme);
        localStorage.setItem('theme', this.theme);
    }
}
