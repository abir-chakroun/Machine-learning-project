import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpropositionComponent } from './addproposition.component';

describe('AddpropositionComponent', () => {
  let component: AddpropositionComponent;
  let fixture: ComponentFixture<AddpropositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpropositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
