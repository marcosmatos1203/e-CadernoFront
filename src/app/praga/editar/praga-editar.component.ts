import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpPragaService } from 'src/app/shared/interfaces/IHttpPragaService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PragaDetailsViewModel } from 'src/app/shared/viewModels/praga/PragaDetailsViewModel';
import { PragaEditViewModel } from 'src/app/shared/viewModels/praga/PragaEditViewModel';

@Component({
  selector: 'app-praga-editar',
  templateUrl: './praga-editar.component.html'
})
export class PragaEditarComponent implements OnInit {

  cadastroForm: FormGroup;
  id: any;
  praga: PragaEditViewModel;

  constructor(private _Activatedroute: ActivatedRoute,
    @Inject('IHttpPragaServiceToken') private servicoPraga: IHttpPragaService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");

    this.cadastroForm = new FormGroup({
      id: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required)
    });

    this.carregarPraga();
  }
  carregarPraga(): void {
    this.servicoPraga.obterPorId(this.id)
      .subscribe((praga: PragaDetailsViewModel) => {
        this.carregarFormulario(praga);
      });
  }
  compareWith(a: any, b: any): boolean {
    return a && b ? a.id === b.id : a === b;
  }
  carregarFormulario(praga: PragaDetailsViewModel) {
    this.cadastroForm = new FormGroup({
      id: new FormControl(praga.id, Validators.required),
      nome: new FormControl(praga.nome, Validators.required)
    });
  }

  atualizar() {
    this.praga = Object.assign({}, this.praga, this.cadastroForm.value);
    this.praga.id = this.id;
    this.servicoPraga.editar(this.praga)
      .subscribe(
        resposta => {
          this.toastService.show('Praga [' + resposta.nome + '] editado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['praga/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao editar Praga: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['praga/listar']);
  }
}
