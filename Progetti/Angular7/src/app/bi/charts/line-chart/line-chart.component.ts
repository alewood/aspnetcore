import { Component, OnInit } from '@angular/core';
import {LINE_CHART_COLORS} from '../../../shared/chart.colors'
import { BIService } from 'src/app/shared/bi.service';
import * as moment from 'moment';
import { group } from '@angular/animations';
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
 prenotazioni;
  constructor(private service:BIService) { }
  lineChartData;
  lineChartLabels;
  lineChartOptions:any={
    responsive: true,
    maintainAspectRatio:false
    
  };
  lineChartLegend:true;
  lineChartType='line';
  lineChartColors=LINE_CHART_COLORS;
  ngOnInit() {
    this.service.getPrenotazioniPerStrumento(localStorage.getItem("idStr")).subscribe(
      res=>{
        const localChartData=this.getChartData(res);
        console.log(res);
       this.lineChartData=localChartData.data;
       this.lineChartLabels=localChartData.labels;
      }
    );
    
  }
getChartData(res)
{
  this.prenotazioni=res;
  const groups=[];
  this.prenotazioni.map(p=>{
    if(!groups.includes(p.prenotazione.utente.group))
      groups.push(p.prenotazione.utente.group)
  });
  console.log(groups);
  const labels=[];
  var obj= new Date();
   var yearNow=obj.getUTCFullYear();
   var monthNow=obj.getUTCMonth();
var monthYearNow= new Date();
monthYearNow.setFullYear(yearNow);
monthYearNow.setMonth(monthNow);
var date= new Date();
date.setMonth(monthYearNow.getMonth());
date.setFullYear(monthYearNow.getFullYear()-1);
labels.push(moment( date).format("MM/YYYY"));
console.log(labels);
yearNow--;
for (let i = 1; i < 12; i++) {
  var date=new Date();
  if((monthNow+1)<12)
    monthNow++;
    else{
      yearNow++;
      monthNow=0;
}
date.setMonth(monthNow);
date.setFullYear(yearNow);
    labels.push(moment(date).format("MM/YYYY")); 
}
labels.push(moment(monthYearNow).format("MM/YYYY"));
const gruppoCount = this.prenotazioni.reduce((r, e) => {
  r.push([moment(e.dataInizio).format("MM/YYYY"),e.prenotazione.utente.group]);
  return r;
},[]);
console.log(gruppoCount);

const chartData=[];
groups.forEach(g=>{
  var value = gruppoCount.filter(e => e[1] == g).reduce((r, e) => {
    const key = e[0];
    if (!r[key])
     r[key] = 0;
     r[key]++;

    return r;
  },[]);

chartData[g]=value;

});
console.log(chartData);
const values = [];
groups.forEach(g=>{
  var column = chartData[g];
  var groupPre = [];
  labels.forEach(l=>{
    if(column[l]==undefined)
    groupPre.push(0);
    else
    groupPre.push(column[l]);
  });
  var data={'data':groupPre,'label': g};
  values.push(data);


});
console.log(values);
return{
  'data':values,
  'labels':labels
}


}
}
