import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IHttpPragaService } from 'src/app/shared/interfaces/IHttpPragaService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PragaCreateViewModel } from 'src/app/shared/viewModels/praga/PragaCreateViewModel';

@Component({
  selector: 'app-praga-criar',
  templateUrl: './praga-criar.component.html'
})
export class PragaCriarComponent implements OnInit {

  
  cadastroForm: FormGroup;
  praga: PragaCreateViewModel;

  constructor(@Inject('IHttpPragaServiceToken') private servicoPraga: IHttpPragaService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', Validators.required)
    });
  }

  adicionar() {
    this.praga = Object.assign({}, this.praga, this.cadastroForm.value);

    this.servicoPraga.adicionar(this.praga)
      .subscribe(
        resposta => {
          this.toastService.show('Praga [' + resposta.nome + '] adicionado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['praga/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao adicionar Praga: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['praga/listar']);
  }
}
