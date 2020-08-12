import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import{map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-03-2020.csv";

  constructor( private http:HttpClient) { }
  getGlobalData()
  {
    return this.http.get(this.globalDataUrl).pipe(
      map(result=>{
        console.log(result);
      })
    )

    }
  }

