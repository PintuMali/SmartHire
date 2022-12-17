import { Injectable } from "@angular/core";
import { Cities } from "./cities.model";

@Injectable({providedIn:'root'})
export class CitiesService{
  private _cities:Cities[]=[
    new Cities('c1','Mumbai','../../assets/images/boyonwork.svg'),
    new Cities('c2','Chennei','../../assets/images/boyonwork.svg'),
    new Cities('c3','Kolkata','../../assets/images/boyonwork.svg'),
    new Cities('c4','Banglore','../../assets/images/boyonwork.svg'),
    new Cities('c5','Hyderabad','../../assets/images/boyonwork.svg'),
    new Cities('c6','Delhi','../../assets/images/boyonwork.svg'),
    new Cities('c7','Jaipur','../../assets/images/boyonwork.svg')
  ];
  constructor(){
  }
  get cities(){
    return[...this._cities];
  }
}
