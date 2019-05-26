import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediadetailsPage } from './mediadetails.page';

describe('MediadetailsPage', () => {
  let component: MediadetailsPage;
  let fixture: ComponentFixture<MediadetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediadetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediadetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
