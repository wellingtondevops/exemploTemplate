import { Component, Input, SimpleChanges, Output, EventEmitter, HostListener, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { IMAGEVIEWER_CONFIG, ImageViewerConfig, createButtonConfig } from '@hallysonh/ngx-imageviewer';
const MY_IMAGEVIEWER_CONFIG: ImageViewerConfig = {
  width: 800, // component default width
  height: 700, // component default height
  bgStyle: '#ECEFF1', // component background style
  scaleStep: 0.1, // zoom scale step (using the zoom in/out buttons)
  rotateStepper: false, // touch rotate should rotate only 90 to 90 degrees
  loadingMessage: 'Loading...',
  buttonStyle: {
    iconFontFamily: 'Material Icons', // font used to render the button icons
    alpha: 0.5, // buttons' transparence value
    hoverAlpha: 0.7, // buttons' transparence value when mouse is over
    bgStyle: '#000000', //  buttons' background style
    iconStyle: '#ffffff', // buttons' icon colors
    borderStyle: '#000000', // buttons' border style
    borderWidth: 0, // buttons' border width (0 == disabled)
  },
  tooltips: {
    enabled: true, // enable or disable tooltips for buttons
    bgStyle: '#000000', // tooltip background style
    bgAlpha: 0.5, // tooltip background transparence
    textStyle: '#ffffff', // tooltip's text style
    textAlpha: 0.9, // tooltip's text transparence
    padding: 15, // tooltip padding
    radius: 20, // tooltip border radius
  },
  zoomOutButton: {
    // zoomOut button config
    icon: 'zoom_out', // icon text
    tooltip: 'Zoom out', // button tooltip
    sortId: 0, // number used to determine the order of the buttons
    show: true, // used to show/hide the button
  },

  // shorter button configuration style
  nextPageButton: createButtonConfig('navigate_next', 'Next page', 0),
  beforePageButton: createButtonConfig('navigate_before', 'Previous page', 1),
  zoomInButton: createButtonConfig('zoom_in', 'Zoom in', 1),
  rotateLeftButton: createButtonConfig('rotate_left', 'Rotate left', 2),
  rotateRightButton: createButtonConfig('rotate_right', 'Rotate right', 3),
  resetButton: createButtonConfig('autorenew', 'Reset', 4),
};


const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss'],
  providers: [
    {
      provide: [NG_VALUE_ACCESSOR],
      useExisting: FormUploadComponent,
      multi: true
    },
    {
      provide: [IMAGEVIEWER_CONFIG],
      useValue: MY_IMAGEVIEWER_CONFIG
    }
  ],

})

export class FormUploadComponent {
  @Input() archive;
  @Input() savedFile;
  progress: boolean = true;
  onChange: Function;
  file: File = null;
  url: any = '';
  urlFile: any = '';
  isPdf: boolean = false;
  urlGoogle: any;
  @Output() postFile = new EventEmitter();
  @Output() deleteFile = new EventEmitter();
  nameFile: string;
  // @ViewChild('imagewrapper', { static: false }) wrapper: ElementRef;

  private _canvasDim = { width: 800, height: 600 };

  constructor(
    private host: ElementRef<HTMLInputElement>,
    public sanitizer: DomSanitizer
  ) {
  }

/*   get canvasDim() {
    return this._canvasDim;
  }

  ngAfterViewInit() {
    this.updateCanvasDim();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateCanvasDim();
  }

  private updateCanvasDim() {
    const el = this.wrapper && this.wrapper.nativeElement ? this.wrapper.nativeElement : null;
    if (el && (el.offsetWidth !== this._canvasDim.width || el.offsetHeight !== this._canvasDim.height)) {
      const newDim = { width: el.offsetWidth - 2, height: el.offsetHeight - 2 };
      setTimeout(() => this._canvasDim = newDim, 0);
    }
    console.log(this._canvasDim)
  } */


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

  removeFile() {
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
        if(change.currentValue.url){
          this.urlFile = change.currentValue.url;
          this.urlFile.indexOf('.pdf') !== -1 ? this.isPdf = true : '';
        }
       
        var url = `https://docs.google.com/viewer?url=${this.archive.url}&embedded=true`;
        this.urlGoogle = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    }
  }


  saveFile() {
    this.progress = true;
    this.postFile.emit(this.file)
  }

  deletFile() {
    console.log('deletFile');
    console.log(this.file);
    this.deleteFile.emit(this.file)
  }

}
