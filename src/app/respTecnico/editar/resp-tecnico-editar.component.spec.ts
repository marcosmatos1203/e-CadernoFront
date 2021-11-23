import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespTecnicoEditarComponent } from './resp-tecnico-editar.component';

describe('RespTecnicoEditarComponent', () => {
  let component: RespTecnicoEditarComponent;
  let fixture: ComponentFixture<RespTecnicoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespTecnicoEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespTecnicoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
