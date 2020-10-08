import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePostagensComponent } from './delete-postagens.component';

describe('DeletePostagensComponent', () => {
  let component: DeletePostagensComponent;
  let fixture: ComponentFixture<DeletePostagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePostagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePostagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
