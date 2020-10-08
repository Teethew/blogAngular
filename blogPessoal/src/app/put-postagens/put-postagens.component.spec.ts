import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PutPostagensComponent } from './put-postagens.component';

describe('PutPostagensComponent', () => {
  let component: PutPostagensComponent;
  let fixture: ComponentFixture<PutPostagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutPostagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PutPostagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
