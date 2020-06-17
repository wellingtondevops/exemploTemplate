import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-errors-volumes',
  templateUrl: './errors-volumes.component.html',
  styleUrls: ['./errors-volumes.component.scss']
})
export class ErrorsVolumesComponent implements OnInit {
  id: string;
  constructor(
    private _route: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
  }

}
