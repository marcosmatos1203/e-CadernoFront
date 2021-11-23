import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpProdutorService } from 'src/app/shared/interfaces/IHttpProdutorService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ProdutorListViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorListViewModel';

@Component({
  selector: 'app-produtor-listar',
  templateUrl: './produtor-listar.component.html',
  styleUrls: ['./produtor-listar.component.css']
})
export class ProdutorListarComponent implements OnInit {

  listaProdutorTotal: ProdutorListViewModel[];
  listaProdutores: ProdutorListViewModel[];
  produtorSelecionado: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private router: Router,
    @Inject('IHttpProdutorServiceToken') private servicoProdutor: IHttpProdutorService,
    private servicoModal: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.obter();
  }

  obter(): void {
    this.servicoProdutor.obter()
      .subscribe(produtores => {
        this.listaProdutorTotal = produtores;
        this.atualizar();
      });
  }

  atualizar() {
    this.listaProdutores = this.listaProdutorTotal
      .map((parceiro, i) => ({ u: i + 1, ...parceiro }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    this.collectionSize = this.listaProdutorTotal.length;
  }

  abrirConfirmacao(modal: any) {
    this.servicoModal.open(modal).result.then((resultado) => {
      if (resultado == 'Excluir') {
        this.servicoProdutor.excluir(this.produtorSelecionado)
          .subscribe(
            () => {
              this.toastService.show('Produtor removido com sucesso!',
                { classname: 'bg-success text-light', delay: 5000 });

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['produtor/listar']);
                });
              }, 5000);
            },
            erro => {
              this.toastService.show('Erro ao remover produtor: ' + erro.error.errors["Nome"].toString(),
                { classname: 'bg-danger text-light', delay: 5000 });
            }
          );
      }
    }).catch(erro => erro);
  }
}
