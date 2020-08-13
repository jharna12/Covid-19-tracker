import { Component, OnInit } from '@angular/core';
import{DataServiceService} from '../../services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
data:GlobalDataSummary[];
totalConfirmed;
totalActive;
totalRecovered;
totalDeath;
countries:string[]=[];
  constructor(private service:DataServiceService) { }

  ngOnInit(): void {

    //to fetch all the countries from the globalData 
    this.service.getGlobalData().subscribe(result=>{
      this.data =result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      //  console.log(this.countries);
      })
    })
  }
    updateValues(country:String){
      this.data.forEach(cs=>{
        if(cs.country==country)
        {
          this.totalConfirmed=cs.confirmed;
          this.totalActive=cs.active; 
          this.totalDeath=cs.deaths;
           this.totalRecovered=cs.recovered;
        }
      })
      console.log(country);
    }

}
