import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpPragaService } from 'src/app/shared/interfaces/IHttpPragaService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PragaListViewModel } from 'src/app/shared/viewModels/praga/PragaListViewModel';

@Component({
  selector: 'app-praga-listar',
  templateUrl: './praga-listar.component.html',
})
export class PragaListarComponent implements OnInit {

   
  listaPragaTotal: PragaListViewModel[];
  listaPragas: PragaListViewModel[];
  pragaSelecionado: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private router: Router,
    @Inject('IHttpPragaServiceToken') private servicoPraga: IHttpPragaService,
    private servicoModal: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.obterPragas();
  }

  obterPragas(): void {
    this.servicoPraga.obter()
      .subscribe(resposta => {
        this.listaPragaTotal= resposta;
        this.atualizar();
      });
  }

  atualizar() {
    this.listaPragas = this.listaPragaTotal
      .map((praga, i) => ({ u: i + 1, ...praga }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    this.collectionSize = this.listaPragaTotal.length;
  }

  abrirConfirmacao(modal: any) {
    this.servicoModal.open(modal).result.then((resultado) => {
      if (resultado == 'Excluir') {
        this.servicoPraga.excluir(this.pragaSelecionado)
          .subscribe(
            () => {
              this.toastService.show('Praga removido com sucesso!',
                { classname: 'bg-success text-light', delay: 5000 });

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['praga/listar']);
                });
              }, 5000);
            },
            erro => {
              this.toastService.show('Erro ao remover Praga: ' + erro.error.errors["Nome"].toString(),
                { classname: 'bg-danger text-light', delay: 5000 });
            }
          );
      }
    }).catch(erro => erro);
  }
}
