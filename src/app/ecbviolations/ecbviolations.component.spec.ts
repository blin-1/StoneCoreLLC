import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcbviolationsComponent } from './ecbviolations.component';

describe('EcbviolationsComponent', () => {
  let component: EcbviolationsComponent;
  let fixture: ComponentFixture<EcbviolationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcbviolationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcbviolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
