import { Injectable } from "@angular/core";
import { Cities } from "./cities.model";
import { JobsService } from "./jobs.service";

@Injectable({providedIn:'root'})
export class CitiesService{
  private _cities:Cities[]=[
    new Cities('ci1','Remote','../../assets/images/Remote.svg'),
    new Cities('ci2','Mumbai','../../assets/images/Mumbai.svg'),
    new Cities('ci3','Chennei','../../assets/images/Chennai.svg'),
    new Cities('ci4','Banglore','../../assets/images/Banglore.svg'),
    new Cities('ci5','Hyderabad','../../assets/images/Hyderabad.svg'),
    new Cities('ci6','Delhi','../../assets/images/Delhi.svg'),
  ];
  constructor(private jobService:JobsService){

  }
  get cities(){
    return[...this._cities];
  }
}
