import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpQuadraService } from 'src/app/shared/interfaces/IHttpQuadraService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarDetailsViewModel } from 'src/app/shared/viewModels/Pomar/PomarDetailsViewModel';
import { QuadraDetailsViewModel } from 'src/app/shared/viewModels/Quadra/QuadraDetailsViewModel';
import { QuadraEditViewModel } from 'src/app/shared/viewModels/Quadra/QuadraEditViewModel';

@Component({
  selector: 'app-quadra-editar',
  templateUrl: './quadra-editar.component.html'
})
export class QuadraEditarComponent implements OnInit {
  
  cadastroForm: FormGroup;
  id: any;
  quadra: QuadraEditViewModel;
  pomar: PomarDetailsViewModel;

  constructor(private _Activatedroute: ActivatedRoute,
    @Inject('IHttpPomarServiceToken') private servicoPomar: IHttpPomarService,
    @Inject('IHttpQuadraServiceToken') private servicoQuadra: IHttpQuadraService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");

    this.cadastroForm = new FormGroup({
      id: new FormControl('', Validators.required),
      anoPlantio: new FormControl('', Validators.required),
      distanciaFilas: new FormControl('', Validators.required),
      distanciaPlantas: new FormControl('', Validators.required),
      quantidadeColmeias: new FormControl('', Validators.required),
    });

    this.carregarQuadra();
  }
  carregarQuadra(): void {
    this.servicoQuadra.obterPorId(this.id)
      .subscribe((quadra: QuadraDetailsViewModel) => {
        this.carregarFormulario(quadra);
        this.carregaPomar(quadra.pomar.id);
      });
  }
  compareWith(a: any, b: any): boolean {
    return a && b ? a.id === b.id : a === b;
  }
  carregaPomar(id: number) {
    this.servicoPomar.obterPorId(id)
      .subscribe(resposta => {
        this.pomar = resposta;
      });
  }
  carregarFormulario(quadra: QuadraDetailsViewModel) {
    this.cadastroForm = new FormGroup({
      id: new FormControl(quadra.id, Validators.required),
      anoPlantio: new FormControl(quadra.anoPlantio, Validators.required),
      distanciaFilas: new FormControl(quadra.distanciaFilas, Validators.required),
      distanciaPlantas: new FormControl(quadra.distanciaPlantas, Validators.required),
      quantidadeColmeias: new FormControl(quadra.quantidadeColmeias, Validators.required),
    });
  }

  atualizar() {
    this.quadra = Object.assign({}, this.quadra, this.cadastroForm.value);
    this.quadra.id = this.id;
    this.servicoQuadra.editar(this.quadra)
      .subscribe(
        resposta => {
          this.toastService.show('Quadra ' + resposta.anoPlantio + ' editado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['quadra/pomar/' + this.pomar.id]);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao editar quadra: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['quadra/pomar/' + this.pomar.id]);
  }
}
