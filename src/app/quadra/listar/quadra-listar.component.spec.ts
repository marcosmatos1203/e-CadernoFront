import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraListarComponent } from './quadra-listar.component';

describe('QuadraListarComponent', () => {
  let component: QuadraListarComponent;
  let fixture: ComponentFixture<QuadraListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadraListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadraListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
