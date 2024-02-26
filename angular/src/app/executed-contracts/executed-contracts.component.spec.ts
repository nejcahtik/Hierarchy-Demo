import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutedContractsComponent } from './executed-contracts.component';

describe('ExecutedContractsComponent', () => {
  let component: ExecutedContractsComponent;
  let fixture: ComponentFixture<ExecutedContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutedContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutedContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
