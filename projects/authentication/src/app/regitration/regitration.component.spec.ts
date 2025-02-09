import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegitrationComponent } from './regitration.component';

describe('RegitrationComponent', () => {
  let component: RegitrationComponent;
  let fixture: ComponentFixture<RegitrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegitrationComponent]
    });
    fixture = TestBed.createComponent(RegitrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
