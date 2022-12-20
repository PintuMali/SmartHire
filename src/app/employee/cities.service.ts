import { Injectable } from "@angular/core";
import { Cities } from "./cities.model";

@Injectable({providedIn:'root'})
export class CitiesService{
  private _cities:Cities[]=[
    new Cities('ci1','Mumbai','../../assets/images/boyonwork.svg'),
    new Cities('ci2','Chennei','../../assets/images/boyonwork.svg'),
    new Cities('ci3','Kolkata','../../assets/images/boyonwork.svg'),
    new Cities('ci4','Banglore','../../assets/images/boyonwork.svg'),
    new Cities('ci5','Hyderabad','../../assets/images/boyonwork.svg'),
    new Cities('ci6','Delhi','../../assets/images/boyonwork.svg'),
    new Cities('ci7','Jaipur','../../assets/images/boyonwork.svg')
  ];
  constructor(){
  }
  get cities(){
    return[...this._cities];
  }
}
