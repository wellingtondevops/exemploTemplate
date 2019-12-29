import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};


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
  urlFile: any = '';
  isPdf: boolean = false;
  urlGoogle: any;
  @Output() postFile = new EventEmitter();
  @Output() deleteFile = new EventEmitter();
  nameFile: string;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    public sanitizer: DomSanitizer
  ) {
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.nameFile = file.name;
    this.onChange(file);
    this.file = file;
    var reader = new FileReader();
    reader.readAsDataURL(event[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      console.log(event);
      this.url = event.currentTarget;
      this.url = this.url.result;
    }
  }

  removeFile(){
    this.file = null;
    this.nameFile = '';
    this.url = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      const change = changes[propName];
      if (propName === 'archive') {
        this.file = change.currentValue;
        this.urlFile = change.currentValue.url;
        this.urlFile.indexOf('.pdf') !== -1 ? this.isPdf = true : '';
        var url = `https://docs.google.com/viewer?url=${this.archive.url}&embedded=true`;
        console.log(url);
        this.urlGoogle = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        console.log('urlGoogle', this.urlGoogle);
      }
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

  deletFile(){
    console.log('deletFile');
    console.log(this.file);
    this.deleteFile.emit(this.file)
  }
  
}
