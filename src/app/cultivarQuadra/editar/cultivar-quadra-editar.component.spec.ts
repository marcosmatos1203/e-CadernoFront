import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivarQuadraEditarComponent } from './cultivar-quadra-editar.component';

describe('CultivarQuadraEditarComponent', () => {
  let component: CultivarQuadraEditarComponent;
  let fixture: ComponentFixture<CultivarQuadraEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultivarQuadraEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivarQuadraEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
