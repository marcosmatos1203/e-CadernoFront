import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomarEditarComponent } from './pomar-editar.component';

describe('PomarEditarComponent', () => {
  let component: PomarEditarComponent;
  let fixture: ComponentFixture<PomarEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomarEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
