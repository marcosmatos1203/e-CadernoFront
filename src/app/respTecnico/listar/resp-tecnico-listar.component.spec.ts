import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespTecnicoListarComponent } from './resp-tecnico-listar.component';

describe('RespTecnicoListarComponent', () => {
  let component: RespTecnicoListarComponent;
  let fixture: ComponentFixture<RespTecnicoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespTecnicoListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespTecnicoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
