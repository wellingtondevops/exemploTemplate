import { TestBed } from '@angular/core/testing';

import { SuccessMessagesService } from './success-messages.service';
import { ToastrModule } from 'ngx-toastr';

describe('SuccessMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrModule.forRoot()]
  }));

  it('should be created', () => {
    const service: SuccessMessagesService = TestBed.get(SuccessMessagesService);
    expect(service).toBeTruthy();
  });
});
