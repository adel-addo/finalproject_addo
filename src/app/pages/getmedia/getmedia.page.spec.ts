import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetmediaPage } from './getmedia.page';

describe('GetmediaPage', () => {
  let component: GetmediaPage;
  let fixture: ComponentFixture<GetmediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetmediaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetmediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
