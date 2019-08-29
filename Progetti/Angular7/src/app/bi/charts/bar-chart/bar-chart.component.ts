import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import * as moment from 'moment';
const SAMPLE_BARCHART_DATA: any [] =
[
  {data:[65,59,80,81,56,54,30],label :'Fall Orders '},
  {data:[25,39,60,91,36,54,50],label :'Winter Orders '}
  
];
const SAMPLE_BARCHART_LABELS: string[]= ['W1','W2','W3','W4','W5','W6','W7'];
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private service: PrenotazioneService) { }
  prenotazioni:any;
  prenotazioniLabels:string[];
  prenotazioniData: number[];

  public barChartData :any[];
  public barChartLabels:string[];
  public barChartType= 'bar';
  public barChartLegend= true;
  public barChartOptions :any ={
    scaleShowVerticalLines:false,
    responsive: true
  }
  //ascissa: Gruppo ,ordinata :numero Ordinazioni di uno specifico Strumento 
  ngOnInit() {
    this.service.getPrenotazioni(1,100).subscribe(
      res=> {
        const localChartData=this.getChartData(res.body);
        console.log(localChartData)
        this.barChartLabels=localChartData.labels;
        this.barChartData=[{'data':localChartData.data,'label':'Prenotazioni per gruppo'}];

     
        console.log(res.body.page)
      }

    );
  }
  getChartData(res: {page:{data:any[],total:number},totalPages:number})
{
  this.prenotazioni=res.page.data;
  const strumenti=this.prenotazioni.map(p=>p.strumento.id);
  console.log(strumenti)
  
  
 const gruppoStrumento= this.prenotazioni.reduce((r, e)=>{ 
   r.push([e.prenotazione.utente.group,e.strumento.id]);
   return r;      
 },[]);
 console.log(gruppoStrumento);

 const labels=[];
 //gruppoStrumento.reduce((r,e)=>{
   //const key=e[1];
   //if(!r.contains(key)){
     //r.push(key);
   //  labels.push(key);
   //}
 //},[]);
 //console.log(labels)

const str1Data=[];
const chartData = gruppoStrumento.reduce((r,e)=> {
  const key=e[0];
  if(!r[key]){
    var a=e[1];
    r[key]=a;
    labels.push(key)
 
  }
  else{
    r[key]++;
  }
  return r;
  
},[]);
console.log(chartData);
const values=[];
labels.forEach(l=>{
           values.push(chartData[l]);
      });
 
  return {
    'data': values,
    'labels':labels
  };
  

     
   



 
  
  console.log(strumenti);
  console.log(labels);
  console.log(values)
}
}
