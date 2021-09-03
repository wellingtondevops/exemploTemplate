import { map, subscribeOn } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SaveLocal } from 'src/app/storage/saveLocal';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { FormGroup } from '@angular/forms';
import { ChartsData } from './../../../../../models/charts';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';


@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
    id: string;
    chartstreet: string;
    bars: any = [];
    Street: string;
    x: string;
    y: number;
    loading: Boolean = true;
    chartBarForm: FormGroup;
    storeHouse: any;

    //barchart: ChartsData = {
        //items: []
   // };



    public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
        datalabels: {
            anchor: 'end',
            align: 'end',
        }
    }
};
    public barChartLabels: Label[] = [''];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;



    public barChartData: ChartDataSets[] = [
        { data: [], label: '[y]' },
    ];


    constructor(
        private _route: Router,
        private storeHouseSrv: StorehousesService,
        private errorMsg: ErrorMessagesService,
        private route: ActivatedRoute,
        private localStorageSrv: SaveLocal,
    ) { }


    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');


        const archive = JSON.parse(this.localStorageSrv.get('archive'));

    if (archive && archive.chartstreet) {
        this.chartBarForm.patchValue({
        x: archive.x,
        y: archive.y,
        Street: archive.Street,
        });
    }
    this.getChartData(this.id, this.chartstreet);
}

    getChartData(id, chartstreet) {
        this.storeHouseSrv.chartsData(id, chartstreet).subscribe(
            res => {
                const Street = res[''].map(res => res.Street);
                const y = res[''].map(res => res.y);
            },
            data => {
                this.bars = data;
                },
            //error => {
                //this.errorMsg.errorMessages(error);
                //console.log('ERROR: ', error);
                //this.loading = false;
            //}
        );
}


public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
}

getBarCharts(chartstreet) {
    this._route.navigate(['/chartstreet/get', chartstreet.chartstreet]);


}
}
