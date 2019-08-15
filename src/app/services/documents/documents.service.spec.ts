import { TestBed } from '@angular/core/testing';
import { DocumentsService } from './documents.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DocumentsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: []
        })
    );

    it('should be created', () => {
        const service: DocumentsService = TestBed.get(DocumentsService);
        expect(service).toBeTruthy();
    });
});
