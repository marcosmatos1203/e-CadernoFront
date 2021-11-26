import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpProdutorService } from 'src/app/shared/interfaces/IHttpProdutorService';
import { IHttpRespTecnicoService } from 'src/app/shared/interfaces/IHttpRespTecnicoService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarDetailsViewModel } from 'src/app/shared/viewModels/Pomar/PomarDetailsViewModel';
import { PomarEditViewModel } from 'src/app/shared/viewModels/Pomar/PomarEditViewModel';
import { ProdutorDetailsViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorDetailsViewModel';
import { RespTecnicoListViewModel } from 'src/app/shared/viewModels/respTecnico/RespTecnicoListViewModel';

@Component({
  selector: 'app-pomar-editar',
  templateUrl: './pomar-editar.component.html',
  styleUrls: ['./pomar-editar.component.css']
})
export class PomarEditarComponent implements OnInit {

  cadastroForm: FormGroup;
  id: any;
  pomar: PomarEditViewModel;
  produtor: ProdutorDetailsViewModel;
  listaRespTecnicos: RespTecnicoListViewModel[];

  constructor(private _Activatedroute: ActivatedRoute,
    @Inject('IHttpPomarServiceToken') private servicoPomar: IHttpPomarService,
    @Inject('IHttpProdutorServiceToken') private servicoProdutor: IHttpProdutorService,
    @Inject('IHttpRespTecnicoServiceToken') private servicoRespTecnico: IHttpRespTecnicoService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");

    this.cadastroForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      bairro_localidade: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      respTecnico: new FormControl('', Validators.required)
    });

    this.carregarRespTecnico();
    this.carregarPomar();
  }

  carregarRespTecnico(): void {
    this.servicoRespTecnico.obter()
      .subscribe(resposta => {
        this.listaRespTecnicos = resposta;
      });
  }

  carregarPomar(): void {
    this.servicoPomar.obterPorId(this.id)
      .subscribe((pomar: PomarDetailsViewModel) => {
        this.carregarFormulario(pomar);
        this.carregaProdutor(pomar.produtor.id);
      });
  }
  compareWith(a: any, b: any): boolean {
    return a && b ? a.id === b.id : a === b;
  }
  carregaProdutor(id: number) {
    this.servicoProdutor.obterPorId(id)
      .subscribe(resposta => {
        this.produtor = resposta;
      });
  }
  carregarFormulario(pomar: PomarDetailsViewModel) {
    this.cadastroForm = new FormGroup({
      nome: new FormControl(pomar.nome, Validators.required),
      logradouro: new FormControl(pomar.logradouro, Validators.required),
      bairro_localidade: new FormControl(pomar.bairro_localidade, Validators.required),
      cidade: new FormControl(pomar.cidade, Validators.required),
      estado: new FormControl(pomar.estado, Validators.required),
      cep: new FormControl(pomar.cep, Validators.required),
      respTecnico: new FormControl(pomar.respTecnico, Validators.required)
    });
  }

  atualizar() {
    this.pomar = Object.assign({}, this.pomar, this.cadastroForm.value);
    this.pomar.id = this.id;
    this.pomar.produtor = this.produtor;

    this.servicoPomar.editar(this.pomar)
      .subscribe(
        pomar => {
          this.toastService.show('Pomar ' + pomar.nome + ' editado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['pomar/produtor/' + this.produtor.id]);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao editar pomar: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['pomar/produtor/' + this.produtor.id]);
  }
}
