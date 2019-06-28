import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { Volume, VolumeList } from 'src/app/models/volume';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/pagination';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  volumes: VolumeList;
  page = {
    currentPage: 0,
    totalPage: 0
  };
  columns = [
    {name: 'Empresa', prop: 'company.name'},
    {name: 'Descrição', prop: 'description'},
    {name: 'Ármazem', prop: 'storehouse.name'},
    {name: 'Localização', prop: 'location'},
    {name: 'Guarda', prop: 'guardType', pipe: { transform: this.pipes.guardType }},
    {name: 'Status', prop: 'status', pipe: {transform: this.pipes.status }},
    {name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];

  constructor(
    private volumeSrv: VolumesService,
    private _route: Router,
    private pipes: Pipes,
    private errorMsg: ErrorMessagesService,
  ) { }

  ngOnInit() {
    this.setPage({offset: 1});
    this.listVolumes();
  }

  listVolumes() {
    this.volumeSrv.volumes(null).subscribe(
      (data) => {
        this.volumes = data;
        this.page = data._links;
      },
      (error) => { console.log('ERROR: ', error); }
    );
  }

  getVolume(volume) {
    this._route.navigate(['ShowComponent'], volume);
  }

  setPage(pageInfo) {
    this.page.currentPage = pageInfo.offset;

    if (pageInfo.offset >= 1) {
      this.page.currentPage = pageInfo.offset + 1;
    }

    this.volumeSrv.volumes(this.page).subscribe(
      (data) => {
        this.volumes = data;
        this.page = data._links;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

}
