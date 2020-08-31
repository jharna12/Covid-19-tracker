import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {GlobalDataSummary} from '../models/global-data';
import {DateWiseData} from '../models/date-wise-data';
import{map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
private globalDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
private extension='.csv';
month;
date;
year ;
getDate(date:number){
if(date<10){
return '0'+date;}
return date;
}
private dateWiseDataUrl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
///github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
  constructor(private http:HttpClient) { 
let now = new Date();
this.month=now.getMonth();
this.year=now.getFullYear();
this.date =now.getDate();
console.log(
{date:this.date,
  month:this.month,
  year:this.year
  });
this.globalDataUrl=this.globalDataUrl+this.getDate(this.month)+'-'+this.getDate(this.date)+'-'+this.year+this.extension;
console.log(this.globalDataUrl);
  }
// access data date wise  
  getDateWiseData(){
    return this.http.get(this.dateWiseDataUrl,{responseType:'text'}).pipe(
      map(result=>{
        let rows=result.split('\n');
//console.log(rows);
let mainData={};
let header=rows[0];
let dates=header.split(/,(?=\S)/);
dates.splice(0,4); // to access only dates
rows.splice(0,1);// to remove heaader section from data 
rows.forEach(row=>{
  let cols=row.split(/,(?=\S)/) // access data values
  let con=cols[1];     // to acess country  values
cols.splice(0,4);       // to access only dates
mainData[con]=[];  // generate a key pair basis on country
cols.forEach((value , index)=>{
  let dw :DateWiseData={
    cases: +value  ,
    country :  con,
    date : new Date (Date.parse(dates[index]))
  }
  mainData[con].push(dw)
  })
})
//console.log(mainData);
return mainData;
}))
}  
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