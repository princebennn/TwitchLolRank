/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LolAccountComponent } from './lol-account.component';

describe('LolAccountComponent', () => {
  let component: LolAccountComponent;
  let fixture: ComponentFixture<LolAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LolAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LolAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
