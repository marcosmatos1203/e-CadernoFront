import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpQuadraService } from 'src/app/shared/interfaces/IHttpQuadraService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarEditViewModel } from 'src/app/shared/viewModels/Pomar/PomarEditViewModel';

@Component({
  selector: 'app-quadra-listar',
  templateUrl: './quadra-listar.component.html',
  styleUrls: ['./quadra-listar.component.css']
})
export class QuadraListarComponent implements OnInit {

  pomar:PomarEditViewModel;
  quadraSelecionado: any;
  id:any;
  constructor(private servicoModal: NgbModal, 
    @Inject('IHttpQuadraServiceToken') private servicoQuadra: IHttpQuadraService,
    @Inject('IHttpPomarServiceToken') private servicoPomar: IHttpPomarService,
  private router: Router,private _Activatedroute: ActivatedRoute, private toastService: ToastService) { }

  ngOnInit(): void {
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
                  this.router.navigate(['pomar/produtor/'+this.id]);
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
