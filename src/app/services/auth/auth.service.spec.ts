import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
}
  from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('LoginService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    });
  });

  describe('Authenticated', () => {
    function setup() {
      const authService = TestBed.get(AuthService);
      const httpTestingController = TestBed.get(HttpTestingController);
      return { authService, httpTestingController };
    }

    it('should logged user', () => {
      const { authService, httpTestingController } = setup();
      authService.login({ email: 'vanessasoutoc@gmail.com', password: '@Vane5060' }).subscribe(data => {
        console.log(data)
      });

      const req = httpTestingController.expectOne('http://localhost:3000/users/authenticate');

      expect(req.request.method).toBe('POST');
    });

    it('should not logged user', () => {
      const { authService, httpTestingController } = setup();
      authService.login({ email: 'vanessasoutoc@gmail.com', password: '@Vane50' }).subscribe(data => {
      }, error => {
        console.log('data is ', error);
        expect(error).toThrowError();
        // done();
      });
      const req = httpTestingController.expectOne('http://localhost:3000/users/authenticate');

      expect(req.request.method).toBe('POST');
    });

    afterEach(() => {
      const { httpTestingController } = setup();
      httpTestingController.verify();
    });
  });

});
