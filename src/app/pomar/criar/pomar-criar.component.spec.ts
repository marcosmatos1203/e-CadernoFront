import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomarCriarComponent } from './pomar-criar.component';

describe('PomarCriarComponent', () => {
  let component: PomarCriarComponent;
  let fixture: ComponentFixture<PomarCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomarCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomarCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
