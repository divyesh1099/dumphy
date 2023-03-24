import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPagesComponent } from './default-pages.component';

describe('DefaultPagesComponent', () => {
  let component: DefaultPagesComponent;
  let fixture: ComponentFixture<DefaultPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
