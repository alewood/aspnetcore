import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import * as moment from 'moment';
import { BIService } from 'src/app/shared/bi.service';
import {Chart} from 'chart.js';
const SAMPLE_BARCHART_DATA: any[] =
  [
    { data: [65, 59, 80, 81, 56, 54, 30], label: 'Fall Orders ' },
    { data: [25, 39, 60, 91, 36, 54, 50], label: 'Winter Orders' }

  ];
const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  colors:any[]=[
    {
      backgroundColor:['rgba(10,10,245,0.8)','rgba(10,10,245,0.8)','rgba(10,10,245,0.8)'],
      borderColor:'#111'
    },
    {
      backgroundColor:['rgba(245,10,10,0.8)','rgba(245,10,10,0.8)','rgba(245,10,10,0.8)'],
      borderColor:'#111'
    },
    {
      backgroundColor:['rgba(230, 245, 10, 0.8)','rgba(230, 245, 10, 0.8)','rgba(230, 245, 10, 0.8)',],
      borderColor:'#111'
    }
  ];
  constructor(private service: BIService) { }
  prenotazioni: any;
  prenotazioniLabels: string[];
  prenotazioniData: number[];

  public barChartData: any[];
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      scaleShowVerticalLines: false,
    responsive: true
  }
  //ascissa: Gruppo ,ordinata :numero Ordinazioni di uno specifico Strumento 
  ngOnInit() {
    Chart.defaults.global.defaultFontColor = '#fff';
    this.service.getTop3Strumenti().subscribe(
      res => {
        console.log(res);
        const localChartData = this.getChartData(res);
        console.log(localChartData)
        this.barChartLabels = localChartData.labels;
        this.barChartData = localChartData.data;


        console.log(res);
      }

    );
  }
  getChartData(res) {
    this.prenotazioni = res;
    const strumenti = [];
    this.prenotazioni.map(p => {
      if (!strumenti.includes(p.idStrumento))
        strumenti.push(p.idStrumento)
    });
    console.log(strumenti);

    const labels = [];
    const gruppoStrumento = this.prenotazioni.reduce((r, e) => {
      r.push([e.prenotazione.utente.group, e.idStrumento]);
      if (!labels.includes(e.prenotazione.utente.group))
        labels.push(e.prenotazione.utente.group);
      return r;
    }, []);
    console.log(gruppoStrumento);
    console.log(labels);


    const chartData = [];
    strumenti.forEach(str => {
      var value = gruppoStrumento.filter((e) => e[1] == str).reduce((r, e) => {
        const key = e[0];
        if (!r[key])
          r[key] = 0;
        r[key]++;

        return r;

      }
        , []);
      chartData[str] = value
    });


    console.log(chartData);
    const values = [];
    strumenti.forEach(str => {
      var column = chartData[str];
      var groupPre = [];
      labels.forEach(l => {

        groupPre.push(column[l]);

      });
      var data = { 'data': groupPre, 'label': "ID: "+str };
      values.push(data);
    });
    console.log(values);


    return {
      'data': values,
      'labels': labels
    };









  }
}
