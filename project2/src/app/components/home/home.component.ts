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
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
globalData: GlobalDataSummary[];
pieChart: GoogleChartInterface={
  chartType:'PieChart'
}
columnChart: GoogleChartInterface={
  chartType:'ColumnChart'
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
  let datatable=[];
  datatable.push(["Country","Cases"])
  this.globalData.forEach(cs=>{
    let value:number;
    if(caseType=='c')
       if(cs.confirmed>2000)
         value=cs.confirmed
    if(caseType=='d')
      if(cs.death>1000)
         value=cs.death
    if(caseType=='r')
      if(cs.recovered>2000)
          value=cs.recovered
    if(caseType=='a')  
         if(cs.active>2000)
         value=cs.active
    datatable.push([
cs.country,value
    ])
  })
  //console.log(dataTable);
this.pieChart = {
    chartType: 'PieChart',
    dataTable: datatable,
    options: { height:500,'Country': 'Cases'},
  };
  this.columnChart = {
    chartType: 'ColumnChart',
    dataTable: datatable,
    options: {height:500,'Country': 'Cases'},
  };
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

