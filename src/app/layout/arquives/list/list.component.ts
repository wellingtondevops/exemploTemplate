import { Component, OnInit } from '@angular/core';
import { ArquivesService } from 'src/app/services/arquives/arquives.service';
import { routerTransition } from '../../../router.animations';
import { Arquive } from 'src/app/models/arquive';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  arquives: Arquive[];

  constructor(
    private arquiveSrv: ArquivesService
  ) { }

  ngOnInit() {
    this.listArquives()
  }

  listArquives(){
    this.arquiveSrv.arquives().subscribe( (data) => {
      console.log('Arquives', data);
      this.arquives = data.items;
    },
    (error) => {
      console.log('ERROR:', error);
    })
  }

}
