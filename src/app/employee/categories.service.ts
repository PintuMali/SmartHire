import { Injectable } from "@angular/core";
import { Categories } from "./categories.model";

@Injectable({providedIn:'root'})
export class CategorieServive{
  private _categories:Categories[]=[
    new Categories('ca1','Java','../../assets/images/Java.svg'),
    new Categories('ca2','C++','../../assets/images/C++.svg'),
    new Categories('ca3','Python','../../assets/images/Python.svg'),
    new Categories('ca4','NodeJs','../../assets/images/Nodejs.svg'),
    new Categories('ca5','NLP','../../assets/images/NLP.svg'),
    new Categories('ca6','AWS','../../assets/images/AWS.svg')
  ]
  constructor(){}
  get categories(){
    return [...this._categories]
  }
}
