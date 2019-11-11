import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormUploadComponent,
      multi: true
    }
  ],
})
export class FormUploadComponent implements ControlValueAccessor {
  @Input() archive;
  @Input() savedFile;
  progress: boolean = true;
  onChange: Function;
  file: File | null = null;
  url: any = '';
  @Output() postFile = new EventEmitter();

  constructor(
    private host: ElementRef<HTMLInputElement>
  ) {
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    var reader = new FileReader();
    reader.readAsDataURL(event[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.currentTarget;
        this.url = this.url.result;
      
    }
  }



  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

  saveFile() {
    this.progress = true;
    this.postFile.emit(this.file)
  }
}
