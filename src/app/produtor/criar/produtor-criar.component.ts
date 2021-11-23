import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IHttpProdutorService } from 'src/app/shared/interfaces/IHttpProdutorService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ProdutorCreateViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorCreateViewModel';

@Component({
  selector: 'app-produtor-criar',
  templateUrl: './produtor-criar.component.html',
  styleUrls: ['./produtor-criar.component.css']
})
export class ProdutorCriarComponent implements OnInit {
  cadastroForm: FormGroup;
  produtor: ProdutorCreateViewModel;

  constructor(@Inject('IHttpProdutorServiceToken') private servicoProdutor: IHttpProdutorService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      bairro_localidade: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefone1: new FormControl('', Validators.required),
      telefone2: new FormControl('', Validators.required)
    });
  }

  adicionar() {
    this.produtor = Object.assign({}, this.produtor, this.cadastroForm.value);

    this.servicoProdutor.adicionar(this.produtor)
      .subscribe(
        produtor => {
          this.toastService.show('Produtor ' + produtor.nome + ' adicionado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['produtor/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao adicionar produtor: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['parceiro/listar']);
  }
}
