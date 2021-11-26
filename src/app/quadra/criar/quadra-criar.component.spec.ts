import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraCriarComponent } from './quadra-criar.component';

describe('QuadraCriarComponent', () => {
  let component: QuadraCriarComponent;
  let fixture: ComponentFixture<QuadraCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadraCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadraCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
