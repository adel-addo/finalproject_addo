import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithtabsPage } from './withtabs.page';

describe('WithtabsPage', () => {
  let component: WithtabsPage;
  let fixture: ComponentFixture<WithtabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithtabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithtabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
