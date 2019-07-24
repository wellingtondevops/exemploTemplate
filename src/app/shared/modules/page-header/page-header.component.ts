import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
    @Input() heading: string;
    @Input() icon: string;
    @Input() btnNew: string;
    @Input() routerTo: string;

    constructor() {}
}
