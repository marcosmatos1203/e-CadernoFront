import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpRespTecnicoService } from 'src/app/shared/interfaces/IHttpRespTecnicoService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarListViewModel } from 'src/app/shared/viewModels/Pomar/PomarListViewModel';
import { RespTecnicoEditViewModel } from 'src/app/shared/viewModels/respTecnico/RespTecnicoEditViewModel';

@Component({
  selector: 'app-resp-tecnico-editar',
  templateUrl: './resp-tecnico-editar.component.html',
  styleUrls: ['./resp-tecnico-editar.component.css']
})
export class RespTecnicoEditarComponent implements OnInit {

  sub: any;
  id: any;
  respTecnico: RespTecnicoEditViewModel;
  pomares: PomarListViewModel[];
  cadastroForm: FormGroup;

  constructor(private _Activatedroute: ActivatedRoute,
    @Inject('IHttpRespTecnicoServiceToken') private servicoRespTecnico: IHttpRespTecnicoService,
    @Inject('IHttpPomarServiceToken') private servicoPomar: IHttpPomarService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");

    this.cadastroForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
      logradouro: new FormControl(''),
      bairro_localidade: new FormControl(''),
      crea: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      cep: new FormControl(''),
      email: new FormControl(''),
      telefone1: new FormControl(''),
      telefone2: new FormControl('')
    });

    this.carregarRespTecnico();
  }

  carregarRespTecnico() {
    this.servicoRespTecnico.obterPorId(this.id)
      .subscribe((resposta: RespTecnicoEditViewModel) => {
        this.carregarFormulario(resposta);
      });
  }

  atualizar() {
    this.respTecnico = Object.assign({}, this.respTecnico, this.cadastroForm.value);
    this.respTecnico.id = this.id;

    this.servicoRespTecnico.editar(this.respTecnico)
      .subscribe(
        resposta => {
          this.toastService.show('Responsável Técnico ' + resposta.nome + ' editado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['respTecnico/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao editar Responsável Técnico: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['respTecnico/listar']);
  }

  carregarFormulario(obj: RespTecnicoEditViewModel) {

    this.cadastroForm = new FormGroup({
      id: new FormControl(obj.id),
      nome: new FormControl(obj.nome, Validators.required),
      logradouro: new FormControl(obj.logradouro, Validators.required),
      bairro_localidade: new FormControl(obj.bairro_localidade, Validators.required),
      crea: new FormControl(obj.crea, Validators.required),
      cidade: new FormControl(obj.cidade, Validators.required),
      estado: new FormControl(obj.estado, Validators.required),
      cep: new FormControl(obj.cep, Validators.required),
      email: new FormControl(obj.email, Validators.required),
      telefone1: new FormControl(obj.telefone1, Validators.required),
      telefone2: new FormControl(obj.telefone2, Validators.required),
    });

    //this.obterPomarIdProdutor(obj.id);
  }
  /*
  obterPomarIdProdutor(id:number): void {
    this.servicoPomar.obterPomaresPorIdProdutor(id)
      .subscribe(obj => {
        this.pomares = obj;
        console.log(this.pomares);
      });
  }
  */

}
