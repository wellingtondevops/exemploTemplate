import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  id: String;
  user: Object;

  constructor(
    private route: ActivatedRoute,
    private userSrv: UsersService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id)
    this.getUser()
  }

  getUser() {
    this.userSrv.user(this.id).subscribe(
      data => {
        console.log(data);
        this.user = data
      }
    )
  }

}
