import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpCultivarService } from 'src/app/shared/interfaces/IHttpCultivarService';
import { IHttpParceiroService } from 'src/app/shared/interfaces/IHttpParceiroService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CultivarListViewModel } from 'src/app/shared/viewModels/cultivar/CultivarListViewModel';

@Component({
  selector: 'app-cultivar-listar',
  templateUrl: './cultivar-listar.component.html'
})
export class CultivarListarComponent implements OnInit {

 
  listaCultivaresTotal: CultivarListViewModel[];
  listaCultivares: CultivarListViewModel[];
  cultivarSelecionado: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private router: Router,
    @Inject('IHttpCultivarServiceToken') private servicoCultivar: IHttpCultivarService,
    private servicoModal: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.obterCultivares();
  }

  obterCultivares(): void {
    this.servicoCultivar.obter()
      .subscribe(resposta => {
        this.listaCultivaresTotal = resposta;
        this.atualizar();
      });
  }

  atualizar() {
    this.listaCultivares = this.listaCultivaresTotal
      .map((cultivar, i) => ({ u: i + 1, ...cultivar }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    this.collectionSize = this.listaCultivaresTotal.length;
  }

  abrirConfirmacao(modal: any) {
    this.servicoModal.open(modal).result.then((resultado) => {
      if (resultado == 'Excluir') {
        this.servicoCultivar.excluir(this.cultivarSelecionado)
          .subscribe(
            () => {
              this.toastService.show('Cultivar removido com sucesso!',
                { classname: 'bg-success text-light', delay: 5000 });

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['cultivar/listar']);
                });
              }, 5000);
            },
            erro => {
              this.toastService.show('Erro ao remover cultivar: ' + erro.error.errors["Nome"].toString(),
                { classname: 'bg-danger text-light', delay: 5000 });
            }
          );
      }
    }).catch(erro => erro);
  }
}
