/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatestampComponent } from './datestamp.component';

describe('DatestampComponent', () => {
  let component: DatestampComponent;
  let fixture: ComponentFixture<DatestampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatestampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
