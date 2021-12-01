import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpQuadraService } from 'src/app/shared/interfaces/IHttpQuadraService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarListViewModel } from 'src/app/shared/viewModels/Pomar/PomarListViewModel';
import { QuadraListViewModel } from 'src/app/shared/viewModels/Quadra/QuadraListViewModel';

@Component({
  selector: 'app-quadra-listar',
  templateUrl: './quadra-listar.component.html'
})
export class QuadraListarComponent implements OnInit {

  listaQuadrasTotal:QuadraListViewModel[];
  listaQuadras:QuadraListViewModel[];
  pomar:PomarListViewModel;
  quadraSelecionado: any;
  id:any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private servicoModal: NgbModal, 
    @Inject('IHttpQuadraServiceToken') private servicoQuadra: IHttpQuadraService,
    @Inject('IHttpPomarServiceToken') private servicoPomar: IHttpPomarService,
  private router: Router,private _Activatedroute: ActivatedRoute, private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.obterPomar(this.id);
    this.obterQuadras(this.id);
  }
  obterPomar(id:any){
    this.servicoPomar.obterPorId(id)
    .subscribe(resposta => {
      this.pomar = resposta;       
    });
  }
  obterQuadras(id:any){
    this.servicoQuadra.obterQuadraPorIdPomar(id)
    .subscribe(resposta => {
      this.listaQuadrasTotal = resposta;
      this.atualizar();
    });
  }
  atualizar() {
    this.listaQuadras = this.listaQuadrasTotal
      .map((obj, i) => ({ u: i + 1, ...obj }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    this.collectionSize = this.listaQuadrasTotal.length;
  }
  abrirConfirmacao(modal: any) {
    this.servicoModal.open(modal).result.then((resultado) => {
      if (resultado == 'Excluir') {
        this.servicoQuadra.excluir(this.quadraSelecionado)
          .subscribe(
            () => {
              this.toastService.show('Quadra removido com sucesso!',
                { classname: 'bg-success text-light', delay: 5000 });

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['quadra/pomar/'+this.id]);
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
