import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { UserList } from 'src/app/models/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: []
    }
  ));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });

  it('should be list users', () => {
    let usersList: UserList;
    const service: UsersService = TestBed.get(UsersService);
    service.users(null).subscribe(data => {
      usersList = data;
    });
    expect(usersList.items).toBeTruthy();
  });
});
