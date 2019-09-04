import { Component, OnInit } from '@angular/core';
import { BIService } from 'src/app/shared/bi.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
 prenotazioni;
  constructor(private service:BIService) { }
  pieChartData:number[];
  colors:any[]=[
    {
      backgroundColor:['rgba(10,10,245,0.8)','rgba(245,10,10,0.8)','rgba(230, 245, 10, 0.8)'],
      borderColor:'#111'
    }
  ];
  pieChartLabels:string[];
  pieChartType='pie';
  ngOnInit() {
    this.service.getTop3Strumenti().subscribe(
      res=>{
        const localChartData=this.getChartData(res);
       this.pieChartLabels=localChartData.labels;
       this.pieChartData=localChartData.data;
      }
    )
  }
  getChartData(res)
  {
    this.prenotazioni=res;
    const strumenti=[];
  this.prenotazioni.map(p=>{
    if(!strumenti.includes(p.strumento.id))
    strumenti.push(p.strumento.id)});
  console.log(strumenti);
  const data=[];
  strumenti.forEach(str=>{
   data.push(this.prenotazioni.filter(p=>p.strumento.id==str).length);
  });
 const labels=[];
 strumenti.forEach(str=>{
   labels.push("ID: "+str);
 });

return {
  'data':data,
  'labels':labels
}


  }

}
