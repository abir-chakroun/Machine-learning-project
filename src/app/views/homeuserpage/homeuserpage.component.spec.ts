import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeuserpageComponent } from './homeuserpage.component';

describe('HomeuserpageComponent', () => {
  let component: HomeuserpageComponent;
  let fixture: ComponentFixture<HomeuserpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeuserpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeuserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
