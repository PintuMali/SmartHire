import { Injectable } from "@angular/core";
import { Categories } from "./categories.model";

@Injectable({providedIn:'root'})
export class CategorieServive{
  private _categories:Categories[]=[
    new Categories('ca1','Java','../../assets/images/glassBall.svg'),
    new Categories('ca2','C++','../../assets/images/glassBall.svg'),
    new Categories('ca3','Python','../../assets/images/glassBall.svg'),
    new Categories('ca4','NodeJs','../../assets/images/glassBall.svg'),
    new Categories('ca5','NLP','../../assets/images/glassBall.svg'),
    new Categories('ca6','AWS','../../assets/images/glassBall.svg')
  ]
  constructor(){}
  get categories(){
    return [...this._categories]
  }
}
