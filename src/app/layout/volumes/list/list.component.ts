import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { Volume } from 'src/app/models/volume';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  volumes: Volume[];

  constructor(
    private volumeSrv: VolumesService,
    private _route: Router
  ) { }

  ngOnInit() {
    console.log('volumes');
    this.listVolumes();
  }

  listVolumes() {
    this.volumeSrv.volumes().subscribe(
      (data) => { this.volumes = data.items; console.log(data); },
      (error) => { console.log('ERROR: ', error); }
    );
  }

  getVolume(user) {
    console.log(user);
    this._route.navigate(['ShowComponent'], user);
  }

  guardType(type) {
    let res = '';
    switch (type) {
      case 'GERENCIADA':
        res = 'G';
        break;
      case 'SIMPLES':
        res = 'S';
        break;
    }
    return res;
  }

}
