import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker') filePickerRef:ElementRef<HTMLInputElement>
  @Output() imagePick =new EventEmitter<File>();
  @Input() showPreview=false;
selectedImage:string;

  constructor() { }

  ngOnInit() {
  }
  onPickImage(){
      this.filePickerRef.nativeElement.click();
  }
  onFileChosen(event:Event){
    const pickedFile=(event.target as HTMLInputElement).files[0];
    if(!pickedFile){
      return;
    }
    const fr = new FileReader();
    fr.onload=()=>{
      const dataUrl=fr.result.toString();
      this.selectedImage=dataUrl;
      this.imagePick.emit(pickedFile);
    }
    fr.readAsDataURL(pickedFile);
  }

}
