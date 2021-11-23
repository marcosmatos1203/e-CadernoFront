import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomarListarComponent } from './pomar-listar.component';

describe('PomarListarComponent', () => {
  let component: PomarListarComponent;
  let fixture: ComponentFixture<PomarListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomarListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomarListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
