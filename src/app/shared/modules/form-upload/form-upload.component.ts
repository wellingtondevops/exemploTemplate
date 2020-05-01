import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';

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
  progress = true;
  onChange: Function;
  file: File | null = null;
  url: any = '';
  urlFile: any = '';
  isPdf = false;
  urlGoogle: any;
  @Output() postFile = new EventEmitter();
  @Output() deleteFile = new EventEmitter();
  nameFile: string;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    public sanitizer: DomSanitizer,
    private errorMsg: ErrorMessagesService,
  ) {
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.nameFile = event.item(0).name;
    const file = event && event.item(0);
    if (!file.name.match(/\.(JPG|JPEG|TIFF|PNG|TIF|PJPEG|PDF|GIF|jpg|jpeg|png|tiff|pjpeg|pdf|gif|tif)$/)) {
      this.removeFile();
      const error = {
        status: 404,
        message: 'Formato de arquivo não suportado.'
      };
      this.errorMsg.showError(error);

    } else {
      this.onChange(file);
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(event[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.currentTarget;
        this.url = this.url.result;

      };
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      const change = changes[propName];
      if (propName === 'archive') {
        this.file = change.currentValue;
        this.urlFile = change.currentValue.url;
        this.urlFile.indexOf('.pdf') !== -1 ? this.isPdf = true : '';
        const url = `https://docs.google.com/viewer?url=${this.archive.url}&embedded=true`;
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
    this.postFile.emit(this.file);
  }

  deletFile() {
    console.log('deletFile');
    console.log(this.file);
    this.deleteFile.emit(this.file);
  }

  removeFile() {
    this.host.nativeElement.value = '';
    this.file = null;
    this.url = null;
    this.nameFile = null;
  }

}
