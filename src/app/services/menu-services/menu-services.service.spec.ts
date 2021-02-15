import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu-services.service';

describe('MenuServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuService = TestBed.get(MenuService);
    expect(service).toBeTruthy();
  });
});
