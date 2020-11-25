import { TestBed } from '@angular/core/testing';

import { MenuServicesService } from './menu-services.service';

describe('MenuServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuServicesService = TestBed.get(MenuServicesService);
    expect(service).toBeTruthy();
  });
});
