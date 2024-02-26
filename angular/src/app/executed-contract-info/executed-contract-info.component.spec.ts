import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutedContractInfoComponent } from './executed-contract-info.component';

describe('ExecutedContractInfoComponent', () => {
  let component: ExecutedContractInfoComponent;
  let fixture: ComponentFixture<ExecutedContractInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutedContractInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutedContractInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
