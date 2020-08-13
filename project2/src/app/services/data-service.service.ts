import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {GlobalDataSummary} from '../models/global-data';
import{map} from 'rxjs/operators';
import { templateJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
private globalDataUrl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-10-2020.csv";

  constructor(private http:HttpClient) { }
getGlobalData()
{

  return this.http.get(this.globalDataUrl,{responseType:'text'}).pipe(
    map(result=>{
      // to merge all the values into a single  and remove redundancy
     // create a object  of type globalDataSummary  for assign and store  a key value pair 
    
     
      let data : GlobalDataSummary[]=[];
      let raw={} 
      let row={}
      let rows=result.split("\n");
      rows.splice(0,1);
      // to remove header row and start the array from 1 index
      rows.forEach(row=>{
        let cols=row.split(/,(?=\S)/) // this regular expression is to consider all the names which are seperated with comma as a single name



        // create a object for globaldatasummary
       let  cs={
        country : cols[3],
        confirmed : +cols[7],
        deaths : +cols[8],
        recovered : +cols[9],
        active : +cols[10] //  + to convert the data into number
        }
        let temp:GlobalDataSummary = raw[cs.country];
        if(temp)
        {
          temp.confirmed=temp.confirmed+cs.confirmed;
          temp.active=temp.active+cs.active;
          temp.deaths=temp.deaths+cs.deaths;
          temp.recovered=temp.recovered+cs.recovered;
          raw[cs.country]=temp;
        }
        else
         raw[cs.country]=cs;
       

      //   console.log (cs.deaths);

// data.push({
 
// })
      //console.log(cols);
       //console.log(data);
      })
     
  return <GlobalDataSummary[]>Object.values(raw);
// to return only values not key
  // typecast the value to globalData summary
}
      ))

  }
  }