import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraEditarComponent } from './quadra-editar.component';

describe('QuadraEditarComponent', () => {
  let component: QuadraEditarComponent;
  let fixture: ComponentFixture<QuadraEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadraEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadraEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
