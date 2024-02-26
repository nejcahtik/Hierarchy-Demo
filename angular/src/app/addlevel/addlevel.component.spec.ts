import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlevelComponent } from './addlevel.component';

describe('AddlevelComponent', () => {
  let component: AddlevelComponent;
  let fixture: ComponentFixture<AddlevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
