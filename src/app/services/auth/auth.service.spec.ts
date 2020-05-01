import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule(
    {
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: []
    }
  ));

  it('should be login user', () => {
    const service: AuthService = TestBed.get(AuthService);
    let logged = false;
    service.login({email: 'gedearchive@gmail.com', password: '1c922d'}).subscribe(res => {
      if (res.accessToken) {
        logged = true;
      }
    }, error => {

    });
    expect(logged).toBeTruthy();
  });
});
