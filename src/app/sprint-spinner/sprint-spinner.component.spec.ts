import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintSpinnerComponent } from './sprint-spinner.component';

describe('SprintSpinnerComponent', () => {
  let component: SprintSpinnerComponent;
  let fixture: ComponentFixture<SprintSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
