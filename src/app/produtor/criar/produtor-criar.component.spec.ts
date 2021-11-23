import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutorCriarComponent } from './produtor-criar.component';

describe('ProdutorCriarComponent', () => {
  let component: ProdutorCriarComponent;
  let fixture: ComponentFixture<ProdutorCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutorCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutorCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
