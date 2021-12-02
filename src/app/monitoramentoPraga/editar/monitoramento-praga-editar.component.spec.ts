import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoPragaEditarComponent } from './monitoramento-praga-editar.component';

describe('MonitoramentoPragaEditarComponent', () => {
  let component: MonitoramentoPragaEditarComponent;
  let fixture: ComponentFixture<MonitoramentoPragaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoramentoPragaEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoPragaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
