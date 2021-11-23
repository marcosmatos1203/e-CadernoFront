import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutorListarComponent } from './produtor-listar.component';

describe('ProdutorListarComponent', () => {
  let component: ProdutorListarComponent;
  let fixture: ComponentFixture<ProdutorListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutorListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutorListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
