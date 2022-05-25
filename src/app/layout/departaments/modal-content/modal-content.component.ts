import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from 'src/app/router.animations';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  animations: [routerTransition()]
})
export class ModalContentComponent implements OnInit {

  @Input() public dep;

  loading: Boolean = false;

  constructor(
    private introService: IntroJsService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log("PRIMEIRO TESTE: ", this.dep);
  }

  close() {
    this.activeModal.close();
  }

  help() {
    this.introService.ShowDepartment();
  }

}
