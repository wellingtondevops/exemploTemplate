import { TestBed, getTestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoginService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        declarations: [],
        imports: [HttpClientTestingModule],
        providers: [AuthService]
      }
    )

    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });  

  it('should be login user', () => {
    const service: AuthService = TestBed.get(AuthService);
    let logged = false;
    service.login({ email: 'gedearchive@gmail.com', password: '1c922d' }).subscribe(res => {
      if (res.accessToken) {
        logged = true;
      }
    }, error => {

    });
    console.log(logged)
    expect(logged).toBeTruthy();
  });
});
