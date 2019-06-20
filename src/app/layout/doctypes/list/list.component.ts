import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DoctypesService } from 'src/app/services/doctypes/doctypes.service';
import { Doctype } from 'src/app/models/doctype';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  doctypes: Doctype[];

  constructor(
    private doctypeSrv: DoctypesService
  ) { }

  ngOnInit() {
    this.doctypesList()
  }

  doctypesList(){
    this.doctypeSrv.doctypes().subscribe(
      (data) => { console.log(data); this.doctypes = data.items },
      (error) => { console.log('ERROR: ', error) }
    )
  }
}
