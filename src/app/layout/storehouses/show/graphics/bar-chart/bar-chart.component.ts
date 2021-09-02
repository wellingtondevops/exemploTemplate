import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
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
  public barChartLabels: Label[] = ['',];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
    { data: [65,], label: 'Rua A' },
    { data: [2854,], label: 'Rua B' },
    { data: [2458,], label: 'Rua C' },
    { data: [5428,], label: 'Rua D' },
    { data: [2218,], label: 'Rua E' },
    { data: [328,], label: 'Rua F' },
    { data: [2458,], label: 'Rua G' },
    { data: [7284,], label: 'Rua H' },
    { data: [2488,], label: 'Rua I' },
    { data: [2298,], label: 'Rua J' },
    { data: [7848,], label: 'Rua K' },
    { data: [6284,], label: 'Rua L' },
    { data: [6225,], label: 'Rua M' },
    { data: [285,], label: 'Rua N' },
    { data: [6228,], label: 'Rua O' },
    { data: [2168,], label: 'Rua P' },
    { data: [2162,], label: 'Rua Q' },
];

  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }
}
