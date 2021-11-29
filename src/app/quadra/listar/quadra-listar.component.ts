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
  templateUrl: './quadra-listar.component.html',
  styleUrls: ['./quadra-listar.component.css']
})
export class QuadraListarComponent implements OnInit {

  listaQuadras: QuadraListViewModel[];
  listaQuadrasTotal: QuadraListViewModel[];
  quadraSelecionado: any;
  Pomar:PomarListViewModel;
  id:any;
 

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private router: Router,private _Activatedroute: ActivatedRoute,
    @Inject('IHttpPomarServiceToken') private servicoPomar: IHttpPomarService,
    @Inject('IHttpQuadrsServiceToken') private servicoQuadra: IHttpQuadraService,
    private servicoModal: NgbModal,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.obterPomar(this.id);
    this.obterQuadras(this.id);
  }
  obterPomar(id:number): void {
    this.servicoPomar.obterPorId(id)
      .subscribe(retorno => {
        this.Pomar = retorno;       
      });
  }

  obterQuadras(id:number): void {
    this.servicoQuadra.obterQuadraPorIdPomar(id)
      .subscribe(obj => {
        this.listaQuadrasTotal = obj;
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
        this.servicoPomar.excluir(this.quadraSelecionado)
          .subscribe(
            () => {
              this.toastService.show('Quadra removida com sucesso!',
                { classname: 'bg-success text-light', delay: 5000 });

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['quadra/pomar/'+this.id]);
                });
              }, 5000);
            },
            erro => {
              this.toastService.show('Erro ao remover quadra: ' + erro.error.errors["Nome"].toString(),
                { classname: 'bg-danger text-light', delay: 5000 });
            }
          );
      }
    }).catch(erro => erro);
  }
}
