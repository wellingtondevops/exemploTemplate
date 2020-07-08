import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal-import-right-bottom',
  templateUrl: './modal-import-right-bottom.component.html',
  styleUrls: ['./modal-import-right-bottom.component.scss']
})
export class ModalImportRightBottomComponent implements OnInit {
  @Input() visible: any;
  @Input() errors: any;
  @Input() imported: any;
  returnColorProgress = 'primary';
  closeResult: string;
  first = false;
  @Input() urlErrors: any;
  errorTotal: any;
  importedTotal: any;
  urlErrorsString: any;
  @Output() closeModl: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      // var $modal = $('#right-bottom');
      $('.cus-modal').click(function () {
        $('body').removeClass('cus-modal-open');
        $('.in').removeClass('in');
      });
    });
  }

  getFile(){
    window.location = this.urlErrors;
  }

  openModal() {
    $('body').addClass('cus-modal-open');
    const target = 'right-bottom';
    $(`#${target}`).addClass('in');
  }

  closeModal(){
    $('body').removeClass('cus-modal-open');
    const target = 'right-bottom';
    $(`#${target}`).removeClass('in');
  }

  setVisible(){
    this.closeModl.emit(false);
  }

  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      const change = changes[propName];
      this.visible ? this.openModal() : this.closeModal() ;
    }
  }

}
