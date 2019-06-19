import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
    }
}
