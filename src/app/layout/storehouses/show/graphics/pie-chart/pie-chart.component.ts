import { Label } from './../../../../../models/register';
import { FormGroup } from '@angular/forms';
import { SaveLocal } from './../../../../../storage/saveLocal';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PositionSearchList } from 'src/app/models/position';



@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
    id: string;
    loading: Boolean = true;
    chartcompany: string;
    company: any;
    positions: any;
    posi: string;
    result: any;
    chartPieForm: FormGroup;
    pies: any;
    storeHouse: any;


    canvas: any;
    ctx: any;

    constructor(
        private _route: Router,
        private storeHouseSrv: StorehousesService,
        private route: ActivatedRoute,
        private localStorageSrv: SaveLocal,

    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.loading = false;


    function dynamicColors() {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
        }
    function poolColors(a) { let pool = []; let i; for (i = 0; i < a ; i++) { pool.push(dynamicColors()); } return pool; }


        this.storeHouseSrv
        .chartsPieData(this.id, this.chartcompany)
        .toPromise()
        .then((res) => {
            this.result = res;
            console.log(this.result);

            this.company = this.result.data.map((data: any) => data.company);
            this.positions = this.result.data.map((data: any) => data.positions);
            //console.log(this.company, this.positions);


        // SHOW CHARDS
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        const myChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: this.company,
                datasets: [
                    {
                        label: 'Quantidade',
                        data: this.positions,

                        backgroundColor: poolColors(this.positions.length),
                        },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'left'
                },
                title: {
                    display: false,
                    text: 'asdasda',
                    position: 'bottom',
                },
            },
        });
    });

    const archive = JSON.parse(this.localStorageSrv.get('archive'));

    if (archive && archive.chartcompany) {
        this.chartPieForm.patchValue({
            positions: archive.positions,
            company: archive.company,
        });
    }
}

getChartPieData(id, chartcompany) {
    this.storeHouseSrv.chartsData(id, chartcompany).subscribe(
        (data) => {
            this.loading = false;
            (this.pies = data),
                this.chartPieForm.patchValue({
                    company: this.storeHouse.company,
                    positions: this.storeHouse.positions,
                });
        }
        // error => {
        // this.errorMsg.errorMessages(error);
        // console.log('ERROR: ', error);
        // this.loading = false;
        // }
    );
}

getPieCharts(chartcompany) {
    this._route.navigate(['/chartcompany/get', chartcompany.chartcompany]);
}

}
