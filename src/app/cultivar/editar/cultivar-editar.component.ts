import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpCultivarService } from 'src/app/shared/interfaces/IHttpCultivarService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CultivarDetailsViewModel } from 'src/app/shared/viewModels/cultivar/CultivarDetailsViewModel';
import { CultivarEditViewModel } from 'src/app/shared/viewModels/cultivar/CultivarEditViewModel';

@Component({
  selector: 'app-cultivar-editar',
  templateUrl: './cultivar-editar.component.html',
})
export class CultivarEditarComponent implements OnInit {

  cadastroForm: FormGroup;
  id: any;
  cultivar: CultivarEditViewModel;

  constructor(private _Activatedroute: ActivatedRoute,
    @Inject('IHttpCultivarServiceToken') private servicoCultivar: IHttpCultivarService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");

    this.cadastroForm = new FormGroup({
      id: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required)
    });

    this.carregarCultivar();
  }
  carregarCultivar(): void {
    this.servicoCultivar.obterPorId(this.id)
      .subscribe((cultivar: CultivarDetailsViewModel) => {
        this.carregarFormulario(cultivar);
      });
  }
  compareWith(a: any, b: any): boolean {
    return a && b ? a.id === b.id : a === b;
  }
  carregarFormulario(cultivar: CultivarDetailsViewModel) {
    this.cadastroForm = new FormGroup({
      id: new FormControl(cultivar.id, Validators.required),
      nome: new FormControl(cultivar.nome, Validators.required)
    });
  }

  atualizar() {
    this.cultivar = Object.assign({}, this.cultivar, this.cadastroForm.value);
    this.cultivar.id = this.id;
    this.servicoCultivar.editar(this.cultivar)
      .subscribe(
        resposta => {
          this.toastService.show('Cultivar ' + resposta.nome + ' editado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['cultivar/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao editar cultivar: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['cultivar/listar']);
  }
}
