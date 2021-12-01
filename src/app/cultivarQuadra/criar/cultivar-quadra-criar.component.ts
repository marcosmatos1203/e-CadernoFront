import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpCultivarQuadraService } from 'src/app/shared/interfaces/IHttpCultivarQuadraService';
import { IHttpCultivarService } from 'src/app/shared/interfaces/IHttpCultivarService';
import { IHttpPortaEnxertoService } from 'src/app/shared/interfaces/IHttpPortaEnxertoService';
import { IHttpQuadraService } from 'src/app/shared/interfaces/IHttpQuadraService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CultivarListViewModel } from 'src/app/shared/viewModels/cultivar/CultivarListViewModel';
import { CultivarQuadraCreateViewModel } from 'src/app/shared/viewModels/cultivarQuadra/CultivarQuadraCreateViewModel';
import { PortaEnxertoListViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoListViewModel';
import { QuadraDetailsViewModel } from 'src/app/shared/viewModels/Quadra/QuadraDetailsViewModel';

@Component({
  selector: 'app-cultivar-quadra-criar',
  templateUrl: './cultivar-quadra-criar.component.html'
})
export class CultivarQuadraCriarComponent implements OnInit {

  cadastroForm: FormGroup;
  id: any;
  cultivarQuadra: CultivarQuadraCreateViewModel;
  listaPortaEnxerto: PortaEnxertoListViewModel[];
  listaCultivar: CultivarListViewModel[];
  quadra: QuadraDetailsViewModel;


  constructor(private _Activatedroute: ActivatedRoute,
    @Inject('IHttpPortaEnxertoServiceToken') private servicoPortaEnxerto: IHttpPortaEnxertoService,
    @Inject('IHttpCultivarServiceToken') private servicoCultivar: IHttpCultivarService,
    @Inject('IHttpCultivarQuadraServiceToken') private servicoCultivarQuadra: IHttpCultivarQuadraService,
    @Inject('IHttpQuadraServiceToken') private servicoQuadra: IHttpQuadraService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {

    this.id = this._Activatedroute.snapshot.paramMap.get("id");

    this.cadastroForm = new FormGroup({
      cultivar: new FormControl('', Validators.required),
      portaEnxerto: new FormControl('', Validators.required),
      quantidade: new FormControl('', Validators.required)
    });
    this.getQuadraSelecionado();
    this.carregarPortaEnxerto();
    this.carregarCultivar();
  }
  getQuadraSelecionado(): void {
    this.servicoQuadra.obterPorId(this.id)
      .subscribe(obj => {
        this.quadra = obj;
      });
  }
  carregarPortaEnxerto(): void {
    this.servicoPortaEnxerto.obter()
      .subscribe(obj => {
        this.listaPortaEnxerto = obj;
      });
  }
  carregarCultivar(): void {
    this.servicoCultivar.obter()
      .subscribe(obj => {
        this.listaCultivar = obj;
      });
  }
  addQuadra(): void {
    this.cultivarQuadra.quadra = this.quadra;
  }
  
  adicionar() {

    this.cultivarQuadra = Object.assign({}, this.cultivarQuadra, this.cadastroForm.value);
    this.addQuadra();
    this.registrarCultivarQuadra();
  }

  registrarCultivarQuadra() {
    this.servicoCultivarQuadra.adicionar(this.cultivarQuadra)
      .subscribe(
        obj => {
          this.toastService.show('cultivarQuadra adicionado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['cultivarQuadra/' + this.id]);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao adicionar Cultivar Quadra: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        }
      );
  }

  
  

  cancelar(): void {
    this.router.navigate(['cultivarQuadra/' + this.id]);
  }
}
