import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpProdutorService } from 'src/app/shared/interfaces/IHttpProdutorService';
import { IHttpRespTecnicoService } from 'src/app/shared/interfaces/IHttpRespTecnicoService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarCreateViewModel } from 'src/app/shared/viewModels/Pomar/PomarCreateViewModel';
import { ProdutorDetailsViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorDetailsViewModel';
import { ProdutorListViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorListViewModel';
import { RespTecnicoListViewModel } from 'src/app/shared/viewModels/respTecnico/RespTecnicoListViewModel';

@Component({
  selector: 'app-pomar-criar',
  templateUrl: './pomar-criar.component.html',
  styleUrls: ['./pomar-criar.component.css']
})
export class PomarCriarComponent implements OnInit {

  cadastroForm: FormGroup;
  id: any;
  pomar: PomarCreateViewModel;
  listaProdutores: ProdutorListViewModel[];
  listaRespTecnicos: RespTecnicoListViewModel[];
  produtor: ProdutorDetailsViewModel;


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
      produtorId: new FormControl('', Validators.required),
      respTecnicoId: new FormControl('', Validators.required)
    });

    this.carregarProdutores();
    this.carregarRespTecnico();
  }

  adicionar() {

    this.pomar = Object.assign({}, this.pomar, this.cadastroForm.value);

    this.servicoPomar.adicionar(this.pomar)
      .subscribe(
        obj => {
          this.toastService.show('Pomar ' + obj.nome + ' adicionado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['pomar/produtor/' + this.id]);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao adicionar pomar: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        }
      );
  }

  carregarProdutores(): void {
    this.servicoProdutor.obter()
      .subscribe(obj => {
        this.listaProdutores = obj;
      });
  }
  carregarRespTecnico(): void {
    this.servicoRespTecnico.obter()
      .subscribe(obj => {
        this.listaRespTecnicos = obj;
      });
  }

  cancelar(): void {
    this.router.navigate(['pomar/listar']);
  }
}
