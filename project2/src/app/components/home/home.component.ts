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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
globalData: GlobalDataSummary[];
totalConfirmed=0;
totalActive=0;
totalRecovered=0;
totalDeath=0;
  constructor(private dataService : DataServiceService) { }

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
          console.log(this.totalConfirmed);
        
        });
      })
    }
  }

