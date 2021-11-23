import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutorEditarComponent } from './produtor-editar.component';

describe('ProdutorEditarComponent', () => {
  let component: ProdutorEditarComponent;
  let fixture: ComponentFixture<ProdutorEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutorEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
