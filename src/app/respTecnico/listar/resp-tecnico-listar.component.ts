import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpRespTecnicoService } from 'src/app/shared/interfaces/IHttpRespTecnicoService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RespTecnicoListViewModel } from 'src/app/shared/viewModels/respTecnico/RespTecnicoListViewModel';

@Component({
  selector: 'app-resp-tecnico-listar',
  templateUrl: './resp-tecnico-listar.component.html',
  styleUrls: ['./resp-tecnico-listar.component.css']
})
export class RespTecnicoListarComponent implements OnInit {

  

  listaRespTecnicosTotal: RespTecnicoListViewModel[];
  listaRespTecnicos: RespTecnicoListViewModel[];
  respTecnicoSelecionado: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private router: Router,
    @Inject('IHttpRespTecnicoServiceToken') private servicoRespTecnico: IHttpRespTecnicoService,
    private servicoModal: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.obter();
  }

  obter(): void {
    this.servicoRespTecnico.obter()
      .subscribe(obj => {
        this.listaRespTecnicosTotal = obj;
        this.atualizar();
      });
  }

  atualizar() {
    this.listaRespTecnicos = this.listaRespTecnicosTotal
      .map((obj, i) => ({ u: i + 1, ...obj }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    this.collectionSize = this.listaRespTecnicosTotal.length;
  }

  abrirConfirmacao(modal: any) {
    this.servicoModal.open(modal).result.then((resultado) => {
      if (resultado == 'Excluir') {
        this.servicoRespTecnico.excluir(this.respTecnicoSelecionado)
          .subscribe(
            () => {
              this.toastService.show('Resp. Técnico removido com sucesso!',
                { classname: 'bg-success text-light', delay: 5000 });

              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['respTecnico/listar']);
                });
              }, 5000);
            },
            erro => {
              this.toastService.show('Erro ao remover Resp. Técnico: ' + erro.error.errors["Nome"].toString(),
                { classname: 'bg-danger text-light', delay: 5000 });
            }
          );
      }
    }).catch(erro => erro);
  }
}
