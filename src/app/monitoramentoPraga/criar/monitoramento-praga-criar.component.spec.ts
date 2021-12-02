import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoPragaCriarComponent } from './monitoramento-praga-criar.component';

describe('MonitoramentoPragaCriarComponent', () => {
  let component: MonitoramentoPragaCriarComponent;
  let fixture: ComponentFixture<MonitoramentoPragaCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoramentoPragaCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoPragaCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
