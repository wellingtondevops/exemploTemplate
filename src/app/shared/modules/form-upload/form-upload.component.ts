import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';


@Component({
    selector: 'app-form-upload',
    templateUrl: './form-upload.component.html',
    styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent {
  @Input() progress;
  
  private file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    console.log(file)
    this.file = file;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  postFile(){
    
  }
  
}
