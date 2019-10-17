import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { Archive } from 'src/app/models/archive';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { toFormData } from '../../../utils/form-data/form-data';
import { FilesService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  id: string;
  archive: Archive;
  loading: Boolean = false;

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private archiveSrv: ArquivesService,
    private filesSrv: FilesService
  ) { }

  uploadFile = new FormGroup({
    storehouse: new FormControl(''),
    volume: new FormControl(''),
    archive: new FormControl(''),
    file: new FormControl(null, [Validators.required])
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getArquive();
  }

  getArquive(){
    this.archiveSrv.archive(this.id).subscribe(data => {
      this.archive = data;
      this.uploadFile.patchValue({
        archive: this.archive._id,
        volume: this.archive.volume._id,
        storehouse: this.archive.storehouse._id
      })
    }, error => {
      console.log('ERROR: ', error)
    })
  }

  mapLabel(labels, tags) {
    var obj = ''
    labels.map((item, i) => {
      if (i === (labels.length - 1)) {
        obj += `${item.namefield}: ${tags[i]}`
      } else {
        obj += `${item.namefield}: ${tags[i]} | `
      }
    })
    return obj
  }

  postFile(data){
    console.log('data');
    this.submit();
  }

  submit() {
/*     var up = toFormData(this.uploadFile.value)
    console.log('up', up) */
    console.log('file', this.uploadFile)
    const formData = new FormData();
    formData.append('file', this.uploadFile.get('file').value);
    formData.append('storehouse', this.uploadFile.get('storehouse').value);
    formData.append('volume', this.uploadFile.get('volume').value);
    formData.append('archive', this.uploadFile.get('archive').value);
    this.filesSrv.file(toFormData(this.uploadFile.value)).subscribe(data => {
      console.log('success', data);
    }, error => {
      console.log("ERROR ", error)
    })

  }
}
