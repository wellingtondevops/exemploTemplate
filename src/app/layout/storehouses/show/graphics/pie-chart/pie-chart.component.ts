import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {

    public pieChartLabels = ['Mosaic Uberaba III', 'Mosaic', 'Mosaic Araxa'];
    public pieChartData = [6425, 12465, 3558];
    public pieChartType = 'pie';
    constructor() { }
    ngOnInit() {
    }
}
