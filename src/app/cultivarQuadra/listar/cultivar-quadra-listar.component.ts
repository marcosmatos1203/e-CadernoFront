import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpCultivarQuadraService } from 'src/app/shared/interfaces/IHttpCultivarQuadraService';
import { IHttpQuadraService } from 'src/app/shared/interfaces/IHttpQuadraService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CultivarQuadraListViewModel } from 'src/app/shared/viewModels/cultivarQuadra/CultivarQuadraListViewModel';
import { QuadraListViewModel } from 'src/app/shared/viewModels/Quadra/QuadraListViewModel';

@Component({
  selector: 'app-cultivar-quadra-listar',
  templateUrl: './cultivar-quadra-listar.component.html'
})
export class CultivarQuadraListarComponent implements OnInit {

  listaCultivarQuadra: CultivarQuadraListViewModel[];
  listaCultivarQuadraTotal: CultivarQuadraListViewModel[];
  cultivarQuadraSelecionado: any;
  quadra:QuadraListViewModel;
  id:any;
 

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private router: Router,private _Activatedroute: ActivatedRoute,
    @Inject('IHttpCultivarQuadraServiceToken') private servicoCultivarQuadra: IHttpCultivarQuadraService,
    @Inject('IHttpQuadraServiceToken') private servicoQuadra: IHttpQuadraService,
    private servicoModal: NgbModal,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.obterQuadra(this.id);
    this.obterCultivarQuadras(this.id);
  }
  obterQuadra(id:number): void {
    this.servicoQuadra.obterPorId(id)
      .subscribe(obj => {
        this.quadra = obj;       
      });
  }

  obterCultivarQuadras(id:number): void {
    this.servicoCultivarQuadra.obterCultivaresPorIdQuadra(id)
      .subscribe(obj => {
        this.listaCultivarQuadraTotal = obj;
        this.atualizar();
      });
  }

  atualizar() {
    this.listaCultivarQuadra = this.listaCultivarQuadraTotal
      .map((obj, i) => ({ u: i + 1, ...obj }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    this.collectionSize = this.listaCultivarQuadraTotal.length;
  }

  abrirConfirmacao(modal: any) {
    this.servicoModal.open(modal).result.then((resultado) => {
      if (resultado == 'Excluir') {
        this.servicoCultivarQuadra.excluir(this.cultivarQuadraSelecionado)
          .subscribe(
            () => {
              this.toastService.show('Cultivar removido com sucesso!',
                { classname: 'bg-success text-light', delay: 5000 });

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['cultivarQuadra/'+this.id]);
                });
              }, 5000);
            },
            erro => {
              this.toastService.show('Erro ao remover pomar: ' + erro.error.errors["Nome"].toString(),
                { classname: 'bg-danger text-light', delay: 5000 });
            }
          );
      }
    }).catch(erro => erro);
  }
}
