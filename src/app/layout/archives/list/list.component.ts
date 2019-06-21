import { Component, OnInit, ViewChild } from '@angular/core';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { routerTransition } from '../../../router.animations';
import { Archive } from 'src/app/models/archive';
import { Page } from 'src/app/models/page';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  archives: Archive[];
  archivesCol: any[];
  page: any;

  constructor(
    private archiveSrv: ArquivesService
  ) { }

  ngOnInit() {
    this.listArquives()
  }

  listArquives(){
    this.archiveSrv.archives(null).subscribe( (data) => {
      console.log('Arquives', data);
      this.page = data._links
      this.archives = data.items;
    },
    (error) => {
      console.log('ERROR:', error);
    })
  }

  setPage(pageInfo){
    console.log(pageInfo)
    this.page.currentPage = pageInfo.offset;
    this.archiveSrv.archives(this.page).subscribe(data => {
      this.page = data._links;
      this.archives = data.items;
    });
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}
