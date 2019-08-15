import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCustomComponent } from './buttons-custom.component';

describe('ButtonsComponent', () => {
    let component: ButtonsCustomComponent;
    let fixture: ComponentFixture<ButtonsCustomComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonsCustomComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonsCustomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
