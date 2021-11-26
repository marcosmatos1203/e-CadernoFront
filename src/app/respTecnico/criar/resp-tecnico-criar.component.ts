import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IHttpRespTecnicoService } from 'src/app/shared/interfaces/IHttpRespTecnicoService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RespTecnicoCreateViewModel } from 'src/app/shared/viewModels/respTecnico/RespTecnicoCreateViewModel';

@Component({
  selector: 'app-resp-tecnico-criar',
  templateUrl: './resp-tecnico-criar.component.html',
  styleUrls: ['./resp-tecnico-criar.component.css']
})
export class RespTecnicoCriarComponent implements OnInit {

  cadastroForm: FormGroup;
  respTecnico: RespTecnicoCreateViewModel;

  constructor(@Inject('IHttpRespTecnicoServiceToken') private servicoRespTecnico: IHttpRespTecnicoService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      bairro_localidade: new FormControl('', Validators.required),
      crea: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefone1: new FormControl('', Validators.required),
      telefone2: new FormControl('', Validators.required)
    });
  }

  adicionar() {
    this.respTecnico = Object.assign({}, this.respTecnico, this.cadastroForm.value);

    this.servicoRespTecnico.adicionar(this.respTecnico)
      .subscribe(
        respTecnico => {
          this.toastService.show('Responsável Tecnico ' + respTecnico.nome + ' adicionado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['respTecnico/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao adicionar Responsável Tecnico: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['respTecnico/listar']);
  }
}
