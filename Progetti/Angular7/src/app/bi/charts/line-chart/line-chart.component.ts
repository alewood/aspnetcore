import { Component, OnInit } from '@angular/core';
import {LINE_CHART_COLORS} from '../../../shared/chart.colors'
const LINE_CHART_SAMPLE_DATA :any[]=[
{data:[32,14,46,23,38,40],label:'Analysis'},
{data:[22,10,23,40,21,30],label:'Recognition'},
{data:[40,43,43,34,21,11],label:'Forecasting'}
];
const LINE_CHART_LABELS:string[]=['Jan','Feb','Mar','Apr','May','Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }
  lineChartData=LINE_CHART_SAMPLE_DATA;
  lineChartLabels=LINE_CHART_LABELS;
  lineChartOptions:any={
    responsive: true,
    maintainAspectRatio:false
    
  };
  lineChartLegend:true;
  lineChartType='line';
  lineChartColors=LINE_CHART_COLORS;
  ngOnInit() {
  }

}
