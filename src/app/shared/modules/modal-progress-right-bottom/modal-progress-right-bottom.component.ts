import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal-progress-right-bottom',
  templateUrl: './modal-progress-right-bottom.component.html',
  styleUrls: ['./modal-progress-right-bottom.component.scss']
})
export class ModalProgressRightBottomComponent implements OnInit {
  @Input() progress: any;
  returnColorProgress = 'primary';
  closeResult: string;
  first = false;
  @Input() error = false;

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
      if (this.error) {
        this.returnColorProgress = 'danger';
      }
      if (this.progress.message === 100 && !this.error) {
        this.returnColorProgress = 'success';
      }
      this.progress.message !== 0 ? this.openModal() : '';

    }
  }

}
