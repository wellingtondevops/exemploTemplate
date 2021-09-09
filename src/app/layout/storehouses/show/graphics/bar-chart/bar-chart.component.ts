import { SaveLocal } from "src/app/storage/saveLocal";
import { ErrorMessagesService } from "src/app/utils/error-messages/error-messages.service";
import { FormGroup } from "@angular/forms";

import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { StorehousesService } from "src/app/services/storehouses/storehouses.service";
import { Chart } from "chart.js";

@Component({
    selector: "app-bar-chart",
    templateUrl: "./bar-chart.component.html",
    styleUrls: ["./bar-chart.component.scss"],
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
    q: any = [];
    canvas: any;
    ctx: any;

    constructor(
        private storeHouseSrv: StorehousesService,
        private errorMsg: ErrorMessagesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get("id");
        this.loading = true;
        this.storeHouseSrv
            .chartsData(this.id, this.chartstreet)
            .toPromise()
            .then((res) => {
                this.result = res;
                this.street = this.result.data.map((data: any) => data.Street);
                this.qtdY = this.result.data.map((data: any) => data.y);
                this.y = this.result.totalPositions.map(
                    (totalPositions: any) => totalPositions.y
                );
                this.Street = this.result.totalPositions.map(
                    (totalPositions: any) => totalPositions.Street
                );

                // SHOW CHARDS
                for (
                    let i = 0;
                    this.y.length > i && this.qtdY.length > i;
                    i++
                ) {
                    let a = this.y[i] - this.qtdY[i];
                    this.q.push(a);
                }
                this.canvas = document.getElementById("myChart");
                this.ctx = this.canvas.getContext("2d");
                this.loading = false;
                let myChart = new Chart(this.ctx, {
                    type: "bar",
                    data: {
                        labels: this.Street,
                        datasets: [
                            {
                                label: "Quantidade Ocupada",
                                data: this.qtdY,
                                backgroundColor: "rgba(255,0,0,0.3)",
                                borderColor: "rgb(255,0,0)",
                                borderWidth: 1,
                            },
                            {
                                label: "Quantidade Total",
                                data: this.q,
                                backgroundColor: "rgba(0,255,0,0.3)",
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: false,
                        },
                        scales: {
                            xAxes: [
                                {
                                    stacked: true,
                                },
                            ],
                            yAxes: [
                                {
                                    stacked: true,
                                },
                            ],
                        },
                        title: {
                            display: true,
                            text: "Ruas",
                            position: "bottom",
                        },
                    },
                });
            }, (error) => {
                console.log('ERROR: ', error);
                this.loading = false;
                }
            );
    }
}
