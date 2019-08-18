import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: string;
  document: Document

  constructor(
    private route: ActivatedRoute,
    private documentsSrv: DocumentsService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService
  ) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.getDocument();
   }

  ngOnInit() {
  }

  getDocument() {
    this.documentsSrv.document(this.id).subscribe(data => {
      console.log(data)
    })
  }

}
