import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpQuadraService } from 'src/app/shared/interfaces/IHttpQuadraService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarDetailsViewModel } from 'src/app/shared/viewModels/Pomar/PomarDetailsViewModel';
import { QuadraCreateViewModel } from 'src/app/shared/viewModels/Quadra/QuadraCreateViewModel';

@Component({
  selector: 'app-quadra-criar',
  templateUrl: './quadra-criar.component.html',
  styleUrls: ['./quadra-criar.component.css']
})
export class QuadraCriarComponent implements OnInit {
  cadastroForm: FormGroup;
  id: any;
  pomar: PomarDetailsViewModel;
  quadra: QuadraCreateViewModel;


  constructor(private _Activatedroute: ActivatedRoute,
    @Inject('IHttpPomarServiceToken') private servicoPomar: IHttpPomarService,
    @Inject('IHttpQuadraServiceToken') private servicoQuadra: IHttpQuadraService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {

    this.id = this._Activatedroute.snapshot.paramMap.get("id");

    this.cadastroForm = new FormGroup({
      anoPlantio: new FormControl('', Validators.required),
      distanciaFilas: new FormControl('', Validators.required),
      distanciaPlantas: new FormControl('', Validators.required),
      quantidadeColmeias: new FormControl('', Validators.required)
    });
    this.getPomarSelecionado();
  }

  addPomar(): void {
    this.quadra.pomar = this.pomar;
  }
  adicionar() {

    this.quadra = Object.assign({}, this.quadra, this.cadastroForm.value);
    this.addPomar();
    this.registrarQuadra();
  }

  registrarQuadra() {
    this.servicoQuadra.adicionar(this.quadra)
      .subscribe(
        obj => {
          this.toastService.show('Quadra ' + obj.anoPlantio + ' adicionado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['quadra/pomar/' + this.id]);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao adicionar quadra: ' + erro.error.errors["anoPlantio"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        }
      );
  }

  getPomarSelecionado(): void {
    this.servicoPomar.obterPorId(this.id)
      .subscribe(obj => {
        this.pomar = obj;
      });
  }
  cancelar(): void {
    this.router.navigate(['quadra/pomar/' + this.id]);
  }
}
