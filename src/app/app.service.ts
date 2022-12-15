import { Injectable } from "@angular/core";
import { Images } from "./app.model";
@Injectable({providedIn:'root'})
export class HomeService{
    private _images:Images[]=[
        new Images('1','../../assets/icon/Work.svg'),
        new Images('2','../../assets/icon/SmartHire.svg'),
        new Images('3','../../assets/icon/boyonwork.svg')
    ]
    constructor(){}
    get images(){
        return [...this._images]
    }
}
