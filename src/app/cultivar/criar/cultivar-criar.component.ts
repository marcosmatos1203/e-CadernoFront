import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IHttpCultivarService } from 'src/app/shared/interfaces/IHttpCultivarService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CultivarCreateViewModel } from 'src/app/shared/viewModels/cultivar/CultivarCreateViewModel';

@Component({
  selector: 'app-cultivar-criar',
  templateUrl: './cultivar-criar.component.html'
})
export class CultivarCriarComponent implements OnInit {

  cadastroForm: FormGroup;
  cultivar: CultivarCreateViewModel;

  constructor(@Inject('IHttpCultivarServiceToken') private servicoCultivar: IHttpCultivarService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', Validators.required)
    });
  }

  adicionar() {
    this.cultivar = Object.assign({}, this.cultivar, this.cadastroForm.value);

    this.servicoCultivar.adicionar(this.cultivar)
      .subscribe(
        resposta => {
          this.toastService.show('Cultivar [' + resposta.nome + '] adicionado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['cultivar/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao adicionar cultivar: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['cultivar/listar']);
  }
}
