// import { Component, OnInit } from '@angular/core';
// import { DataServiceService } from '../../services/data-service.service';
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   constructor(private dataService :DataServiceService) { }

//   ngOnInit(): void {
//     this.dataService.getGlobalData().subscribe(
//       {
//         next:(result)=>{
//       console.log(result);
//         }
//     })
//      }
// }
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import {GlobalDataSummary} from '../../models/global-data';
import {formatNumber} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
globalData: GlobalDataSummary[];
datatable=[];
chart={
PieChart:'PieChart',
ColumnChart:'ColumnChart',
height:500,
options: {  
  animation:{
  duration: 1000,
  easing: 'out',
},
is3D:true
}
}
totalConfirmed=0;
totalActive=0;
totalRecovered=0;
totalDeath=0;
  constructor(private dataService : DataServiceService) { }
  updateChart(input:HTMLInputElement)
      {
        console.log(input.value);
        this.initChart(input.value)
      }


initChart(caseType:string){
  
  // this.datatable.push(["Country","Cases"])
  this.datatable=[];
  this.globalData.forEach(cs=>{
    let value:number;
    if(caseType=='c')
       if(cs.confirmed>2000)
         value=cs.confirmed
    if(caseType=='d')
      if(cs.deaths>1000)
         value=cs.deaths
    if(caseType=='r')
      if(cs.recovered>2000)
          value=cs.recovered
    if(caseType=='a')  
         if(cs.active>2000)
         value=cs.active
    this.datatable.push([
cs.country,value

    ])
  })
   console.log(this.datatable);
// this.pieChart = {
//     chartType: 'PieChart',
}
  ngOnInit(): void {
   
    this.dataService.getGlobalData().
    subscribe(
  result=>{
        console.log(result);
        this.globalData=result;
        result.forEach(cs => {
          if(!Number.isNaN(cs.confirmed))
          {
          this.totalActive+=cs.active;
          this.totalConfirmed+=cs.confirmed;
          this.totalDeath+=cs.deaths;
          this.totalRecovered+=cs.recovered;
          }
          //console.log(this.totalConfirmed);
        })
        this.initChart('c');
      })
          }
            }

