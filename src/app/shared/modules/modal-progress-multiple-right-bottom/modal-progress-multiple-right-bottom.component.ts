import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal-progress-multiple-right-bottom',
  templateUrl: './modal-progress-multiple-right-bottom.component.html',
  styleUrls: ['./modal-progress-multiple-right-bottom.component.scss']
})
export class ModalProgressMultipleRightBottomComponent implements OnInit {
  @Input() progressInfos: any;
  returnColorProgress = 'primary';
  closeResult: string;
  first = false;
  // @Input() error = false;

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
      const change = changes[propName];
      console.log(change);
      console.log(this.progressInfos);
      this.progressInfos.length > 0 ? this.openModal() : '';
    }

    
  }

}
