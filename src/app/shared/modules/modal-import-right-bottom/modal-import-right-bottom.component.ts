import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal-import-right-bottom',
  templateUrl: './modal-import-right-bottom.component.html',
  styleUrls: ['./modal-import-right-bottom.component.scss']
})
export class ModalImportRightBottomComponent implements OnInit {
  @Input() visible: any;
  returnColorProgress = 'primary';
  closeResult: string;
  first = false;
  @Input() urlErrors: string;

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

  openModal() {
    $('body').addClass('cus-modal-open');
    const target = '#right-bottom';
    $('#' + $(target).addClass('in'));
  }

  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      console.log(propName)
      const change = changes[propName];
      console.log(change)
      this.visible ? this.openModal() : '';
      console.log(this.urlErrors)
    }
  }

}
