import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpCultivarService } from 'src/app/shared/interfaces/IHttpCultivarService';
import { IHttpPortaEnxertoService } from 'src/app/shared/interfaces/IHttpPortaEnxertoService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CultivarDetailsViewModel } from 'src/app/shared/viewModels/cultivar/CultivarDetailsViewModel';
import { CultivarEditViewModel } from 'src/app/shared/viewModels/cultivar/CultivarEditViewModel';
import { PortaEnxertoCreateViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoCreateViewModel';
import { PortaEnxertoDetailsViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoDetailsViewModel';
import { PortaEnxertoEditViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoEditViewModel';

@Component({
  selector: 'app-porta-enxerto-editar',
  templateUrl: './porta-enxerto-editar.component.html'
})
export class PortaEnxertoEditarComponent implements OnInit {

  cadastroForm: FormGroup;
  id: any;
  portaEnxerto: PortaEnxertoEditViewModel;

  constructor(private _Activatedroute: ActivatedRoute,
    @Inject('IHttpPortaEnxertoServiceToken') private servicoPortaEnxerto: IHttpPortaEnxertoService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");

    this.cadastroForm = new FormGroup({
      id: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required)
    });

    this.carregarPortaEnxerto();
  }
  carregarPortaEnxerto(): void {
    this.servicoPortaEnxerto.obterPorId(this.id)
      .subscribe((portaEnxerto: PortaEnxertoDetailsViewModel) => {
        this.carregarFormulario(portaEnxerto);
      });
  }
  compareWith(a: any, b: any): boolean {
    return a && b ? a.id === b.id : a === b;
  }
  carregarFormulario(portaEnxerto: PortaEnxertoDetailsViewModel) {
    this.cadastroForm = new FormGroup({
      id: new FormControl(portaEnxerto.id, Validators.required),
      nome: new FormControl(portaEnxerto.nome, Validators.required)
    });
  }

  atualizar() {
    this.portaEnxerto = Object.assign({}, this.portaEnxerto, this.cadastroForm.value);
    this.portaEnxerto.id = this.id;
    this.servicoPortaEnxerto.editar(this.portaEnxerto)
      .subscribe(
        resposta => {
          this.toastService.show('Porta Enxerto [' + resposta.nome + '] editado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['portaEnxerto/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao editar Porta Enxerto: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['portaEnxerto/listar']);
  }
}
