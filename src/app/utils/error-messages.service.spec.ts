import { TestBed } from '@angular/core/testing';

import { ErrorMessagesService } from './error-messages.service';
import { ToastrModule } from 'ngx-toastr';

describe('ErrorMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrModule.forRoot()]
  }));

  it('should be created', () => {
    const service: ErrorMessagesService = TestBed.get(ErrorMessagesService);
    expect(service).toBeTruthy();
  });
});
