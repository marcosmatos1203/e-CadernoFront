import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpPortaEnxertoService } from 'src/app/shared/interfaces/IHttpPortaEnxertoService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PortaEnxertoListViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoListViewModel';

@Component({
  selector: 'app-porta-enxerto-listar',
  templateUrl: './porta-enxerto-listar.component.html'
})
export class PortaEnxertoListarComponent implements OnInit {

  
  listaPortaEnxertoTotal: PortaEnxertoListViewModel[];
  listaPortaEnxertos: PortaEnxertoListViewModel[];
  portaEnxertoSelecionado: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private router: Router,
    @Inject('IHttpPortaEnxertoServiceToken') private servicoPortaEnxerto: IHttpPortaEnxertoService,
    private servicoModal: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.obterCultivares();
  }

  obterCultivares(): void {
    this.servicoPortaEnxerto.obter()
      .subscribe(resposta => {
        this.listaPortaEnxertoTotal= resposta;
        this.atualizar();
      });
  }

  atualizar() {
    this.listaPortaEnxertos = this.listaPortaEnxertoTotal
      .map((portaEnxerto, i) => ({ u: i + 1, ...portaEnxerto }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    this.collectionSize = this.listaPortaEnxertoTotal.length;
  }

  abrirConfirmacao(modal: any) {
    this.servicoModal.open(modal).result.then((resultado) => {
      if (resultado == 'Excluir') {
        this.servicoPortaEnxerto.excluir(this.portaEnxertoSelecionado)
          .subscribe(
            () => {
              this.toastService.show('Porta Enxerto removido com sucesso!',
                { classname: 'bg-success text-light', delay: 5000 });

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['portaEnxerto/listar']);
                });
              }, 5000);
            },
            erro => {
              this.toastService.show('Erro ao remover Porta Enxerto: ' + erro.error.errors["Nome"].toString(),
                { classname: 'bg-danger text-light', delay: 5000 });
            }
          );
      }
    }).catch(erro => erro);
  }
}
