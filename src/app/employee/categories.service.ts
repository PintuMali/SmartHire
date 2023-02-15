import { Injectable } from "@angular/core";
import { Categories } from "./categories.model";

@Injectable({providedIn:'root'})
export class CategorieServive{
  private _categories:Categories[]=[
    new Categories('ca1','React','../../assets/images/glassBall.svg'),
    new Categories('ca2','Java','../../assets/images/glassBall.svg'),
    new Categories('ca3','Python','../../assets/images/glassBall.svg'),
    new Categories('ca4','React','../../assets/images/glassBall.svg'),
    new Categories('ca5','Angular','../../assets/images/glassBall.svg'),
    new Categories('ca6','Asp.net','../../assets/images/glassBall.svg'),
    new Categories('ca7','C#','../../assets/images/glassBall.svg'),
    new Categories('ca8','NodeJs','../../assets/images/glassBall.svg')
  ]
  constructor(){}
  get categories(){
    return [...this._categories]
  }
}
