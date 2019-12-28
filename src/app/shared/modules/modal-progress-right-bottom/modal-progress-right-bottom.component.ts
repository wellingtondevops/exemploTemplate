import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal-progress-right-bottom',
  templateUrl: './modal-progress-right-bottom.component.html',
  styleUrls: ['./modal-progress-right-bottom.component.scss']
})
export class ModalProgressRightBottomComponent implements OnInit {
  @Input() progress: any;
  returnColorProgress: string = 'primary'
  closeResult: string;
  first: boolean = false;
  @Input() error: boolean = false;

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      // var $modal = $('#right-bottom');
      $(".cus-modal").click(function () {
        $('body').removeClass('cus-modal-open')
        $(".in").removeClass("in");
      })
    });
  }

  openModal() {
    $('body').addClass('cus-modal-open');
    var target = "#right-bottom";
    $("#" + $(target).addClass("in"));
  }

  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      const change = changes[propName];
      if (this.error) {
        this.returnColorProgress = 'danger'
      }

      if (this.progress.message === 100 && !this.error) {
        this.returnColorProgress = 'success'
      }
      console.log(propName);
      console.log(this.progress);
      this.progress.message !== 0 ? this.openModal() : '';
      
    }
  }

}
