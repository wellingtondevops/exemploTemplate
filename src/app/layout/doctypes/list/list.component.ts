import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DoctypesService } from 'src/app/services/doctypes/doctypes.service';
import { Doctype } from 'src/app/models/doctype';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  doctypes: Doctype[];

  constructor(
    private doctypeSrv: DoctypesService,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {
    this.doctypesList()
  }

  doctypesList(){
    this.doctypeSrv.doctypes().subscribe(
      (data) => { console.log(data); this.doctypes = data.items },
      (error) => {
        this.errorMsg.errorMessages(error)
        console.log('ERROR: ', error)
      }
    )
  }
}
