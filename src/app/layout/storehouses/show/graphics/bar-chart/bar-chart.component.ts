
import { SaveLocal } from 'src/app/storage/saveLocal';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { FormGroup } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
    id: string;
    chart: any = [];
    chartstreet: string;
    bars: any;
    loading: Boolean = true;
    chartBarForm: FormGroup;
    storeHouse: any;
    result: any;
    street: any;
    Street: any;
    y: any;
    qtdY: any;

    canvas: any;
    ctx: any;

    constructor(
        private _route: Router,
        private storeHouseSrv: StorehousesService,
        private errorMsg: ErrorMessagesService,
        private route: ActivatedRoute,
        private localStorageSrv: SaveLocal
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.loading = false;

        function dynamicColors() {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return 'rgba(' + r + ',' + g + ',' + b + ', 0.3)';
        }

        this.storeHouseSrv
            .chartsData(this.id, this.chartstreet)
            .toPromise()
            .then((res) => {
                this.result = res;
                // console.log(this.result);

                this.street = this.result.data.map((data: any) => data.Street);
                this.qtdY = this.result.data.map((data: any) => data.y);
                this.y = this.result.totalPositions.map((totalPositions: any) => totalPositions.y);
                this.Street = this.result.totalPositions.map((totalPositions: any) => totalPositions.Street);
                // console.log(this.street, this.qtdY);

                // SHOW CHARDS
                this.canvas = document.getElementById('myChart');
                this.ctx = this.canvas.getContext('2d');
                let myChart = new Chart(this.ctx, {
                    type: 'bar',
                    data: {
                        labels: this.Street,
                        datasets: [
                            {
                                label: 'Quantidade',
                                data: this.qtdY,
                                backgroundColor: 'rgba(255,0,0,0.3)',
                                borderColor: 'rgb(255,0,0)',
                                borderWidth: 1
                            },
                            {
                            label: 'Quantidade',
                                data: this.y,
                                backgroundColor: 'rgba(0,255,0,0.3)',
                                //borderColor: 'rgb(0,255,0)',
                                //borderWidth: 1
                            },
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: false,
                        },
                        scales:{
                            xAxes:[{
                                stacked: true,

                            }],
                            yAxes:[{
                                stacked: true,
                            }]
                        },
                        title: {
                            display: true,
                            text: 'Ruas',
                            position: 'bottom',
                        },
                    },
                });
            });

        const archive = JSON.parse(this.localStorageSrv.get('archive'));

        if (archive && archive.chartstreet) {
            this.chartBarForm.patchValue({
                x: archive.x,
                y: archive.y,
                Street: archive.Street,
            });
        }
    }

    getChartData(id, chartstreet) {
        this.storeHouseSrv.chartsData(id, chartstreet).subscribe(
            (data) => {
                this.loading = false;
                (this.bars = data),
                    this.chartBarForm.patchValue({
                        y: this.storeHouse.y,
                        Street: this.storeHouse.Street,
                    });
            }
            // error => {
            // this.errorMsg.errorMessages(error);
            // console.log('ERROR: ', error);
            // this.loading = false;
            // }
        );
    }

    getBarCharts(chartstreet) {
        this._route.navigate(['/chartstreet/get', chartstreet.chartstreet]);
    }

}
