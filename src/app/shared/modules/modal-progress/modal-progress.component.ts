import { Component, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-progress',
  templateUrl: './modal-progress.component.html',
  styleUrls: ['./modal-progress.component.scss']
})
export class ModalProgressComponent {
  @Input() progress: any = null;
  closeResult: string;
  first: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal
  ) { }


  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      const change = changes[propName];
      console.log('propName', propName);
      if (propName === 'progress' && change.currentValue.status === 'progress') {
        if (!this.first) {
          this.first = true;
        }
      }
      console.log(change);
    }
  }
}
