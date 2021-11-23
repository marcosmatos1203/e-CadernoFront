import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpProdutorService } from 'src/app/shared/interfaces/IHttpProdutorService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarListViewModel } from 'src/app/shared/viewModels/Pomar/PomarListViewModel';
import { ProdutorDetailsViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorDetailsViewModel';
import { ProdutorEditViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorEditViewModel';

@Component({
  selector: 'app-produtor-editar',
  templateUrl: './produtor-editar.component.html',
  styleUrls: ['./produtor-editar.component.css']
})
export class ProdutorEditarComponent implements OnInit {

  sub: any;
  id: any;
  produtor: ProdutorEditViewModel;
  pomares: PomarListViewModel[];
  cadastroForm: FormGroup;

  constructor(private _Activatedroute: ActivatedRoute,
    @Inject('IHttpProdutorServiceToken') private servicoProdutor: IHttpProdutorService,
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
      cidade: new FormControl(''),
      estado: new FormControl(''),
      cep: new FormControl(''),
      email: new FormControl(''),
      telefone1: new FormControl(''),
      telefone2: new FormControl('')
    });

    this.carregarProdutor();
  }

  carregarProdutor() {
    this.servicoProdutor.obterPorId(this.id)
      .subscribe((obj: ProdutorDetailsViewModel) => {
        this.carregarFormulario(obj);
      });
  }

  atualizar() {
    this.produtor = Object.assign({}, this.produtor, this.cadastroForm.value);
    this.produtor.id = this.id;

    this.servicoProdutor.editar(this.produtor)
      .subscribe(
        obj => {
          this.toastService.show('produtor ' + obj.nome + ' editado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['produtor/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao editar produtor: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['produtor/listar']);
  }

  carregarFormulario(obj: ProdutorDetailsViewModel) {

    this.cadastroForm = new FormGroup({
      id: new FormControl(obj.id),
      nome: new FormControl(obj.nome, Validators.required),
      logradouro: new FormControl(obj.logradouro, Validators.required),
      bairro_localidade: new FormControl(obj.bairro_localidade, Validators.required),
      cidade: new FormControl(obj.cidade, Validators.required),
      estado: new FormControl(obj.estado, Validators.required),
      cep: new FormControl(obj.cep, Validators.required),
      email: new FormControl(obj.email, Validators.required),
      telefone1: new FormControl(obj.telefone1, Validators.required),
      telefone2: new FormControl(obj.telefone2, Validators.required),
    });

    this.obterPomarIdProdutor(obj.id);
  }
  obterPomarIdProdutor(id:number): void {
    this.servicoPomar.obterPomaresPorIdProdutor(id)
      .subscribe(obj => {
        this.pomares = obj;
        console.log(this.pomares);
      });
  }

  
}
