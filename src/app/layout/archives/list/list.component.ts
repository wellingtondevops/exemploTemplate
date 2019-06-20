import { Component, OnInit } from '@angular/core';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { routerTransition } from '../../../router.animations';
import { Archive } from 'src/app/models/archive';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  archives: Archive[];

  constructor(
    private archiveSrv: ArquivesService
  ) { }

  ngOnInit() {
    this.listArquives()
  }

  listArquives(){
    this.archiveSrv.archives().subscribe( (data) => {
      console.log('Arquives', data);
      this.archives = data.items;
    },
    (error) => {
      console.log('ERROR:', error);
    })
  }

}
