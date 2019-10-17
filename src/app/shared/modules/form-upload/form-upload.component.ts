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
  onChange: Function;
  private file: File | null = null;
  @Output() postFile = new EventEmitter();

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    this.postFile.emit(this.file)
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }
}
