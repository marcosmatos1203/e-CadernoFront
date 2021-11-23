import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpProdutorService } from 'src/app/shared/interfaces/IHttpProdutorService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarListViewModel } from 'src/app/shared/viewModels/Pomar/PomarListViewModel';
import { ProdutorListViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorListViewModel';

@Component({
  selector: 'app-pomar-listar',
  templateUrl: './pomar-listar.component.html',
  styleUrls: ['./pomar-listar.component.css']
})
export class PomarListarComponent implements OnInit {

  listaPomares: PomarListViewModel[];
  listaPomaresTotal: PomarListViewModel[];
  pomarSelecionado: any;
  produtor:ProdutorListViewModel;
  id:any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private router: Router,private _Activatedroute: ActivatedRoute,
    @Inject('IHttpPomarServiceToken') private servicoPomar: IHttpPomarService,
    @Inject('IHttpProdutorServiceToken') private servicoProdutor: IHttpProdutorService,
    private servicoModal: NgbModal,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.obterProdutor(this.id);
    this.obterPomares(this.id);
  }
  obterProdutor(id:number): void {
    this.servicoProdutor.obterPorId(id)
      .subscribe(obj => {
        this.produtor = obj;       
      });
  }

  obterPomares(id:number): void {
    this.servicoPomar.obterPomaresPorIdProdutor(id)
      .subscribe(obj => {
        this.listaPomaresTotal = obj;
        this.atualizarPomares();
      });
  }

  atualizarPomares() {
    this.listaPomares = this.listaPomaresTotal
      .map((obj, i) => ({ u: i + 1, ...obj }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    this.collectionSize = this.listaPomaresTotal.length;
  }

  abrirConfirmacao(modal: any) {
    this.servicoModal.open(modal).result.then((resultado) => {
      if (resultado == 'Excluir') {
        this.servicoPomar.excluir(this.pomarSelecionado)
          .subscribe(
            () => {
              this.toastService.show('Pomar removido com sucesso!',
                { classname: 'bg-success text-light', delay: 5000 });

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['pomar/listar']);
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
