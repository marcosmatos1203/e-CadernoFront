import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespTecnicoCriarComponent } from './resp-tecnico-criar.component';

describe('RespTecnicoCriarComponent', () => {
  let component: RespTecnicoCriarComponent;
  let fixture: ComponentFixture<RespTecnicoCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespTecnicoCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespTecnicoCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
