import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialPage } from './official.page';

describe('OfficialPage', () => {
  let component: OfficialPage;
  let fixture: ComponentFixture<OfficialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
