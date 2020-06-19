import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-errors-volumes',
  templateUrl: './errors-volumes.component.html',
  styleUrls: ['./errors-volumes.component.scss'],
  animations: [routerTransition()]
})
export class ErrorsVolumesComponent implements OnInit {
  searchForm: FormGroup;
  
  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.searchForm = this.fb.group({
      sheet: this.fb.control(null),
      endDate: this.fb.control(null),
      initDate: this.fb.control(null),
    });
  }

  getErrors(){

  }

}
