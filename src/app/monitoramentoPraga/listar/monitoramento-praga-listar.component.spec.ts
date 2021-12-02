import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoPragaListarComponent } from './monitoramento-praga-listar.component';

describe('MonitoramentoPragaListarComponent', () => {
  let component: MonitoramentoPragaListarComponent;
  let fixture: ComponentFixture<MonitoramentoPragaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoramentoPragaListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoPragaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
