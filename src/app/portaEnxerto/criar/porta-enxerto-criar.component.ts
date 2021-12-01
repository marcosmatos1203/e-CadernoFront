import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IHttpCultivarService } from 'src/app/shared/interfaces/IHttpCultivarService';
import { IHttpPortaEnxertoService } from 'src/app/shared/interfaces/IHttpPortaEnxertoService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CultivarCreateViewModel } from 'src/app/shared/viewModels/cultivar/CultivarCreateViewModel';
import { PortaEnxertoCreateViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoCreateViewModel';

@Component({
  selector: 'app-porta-enxerto-criar',
  templateUrl: './porta-enxerto-criar.component.html'
})
export class PortaEnxertoCriarComponent implements OnInit {

  cadastroForm: FormGroup;
  portaEnxerto: PortaEnxertoCreateViewModel;

  constructor(@Inject('IHttpPortaEnxertoServiceToken') private servicoPortaEnxerto: IHttpPortaEnxertoService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', Validators.required)
    });
  }

  adicionar() {
    this.portaEnxerto = Object.assign({}, this.portaEnxerto, this.cadastroForm.value);

    this.servicoPortaEnxerto.adicionar(this.portaEnxerto)
      .subscribe(
        resposta => {
          this.toastService.show('Porta Enxerto [' + resposta.nome + '] adicionado com sucesso!',
            { classname: 'bg-success text-light', delay: 5000 });
          setTimeout(() => {
            this.router.navigate(['portaEnxerto/listar']);
          }, 5000);
        },
        erro => {
          this.toastService.show('Erro ao adicionar Porta Enxerto: ' + erro.error.errors["Nome"].toString(),
            { classname: 'bg-danger text-light', delay: 5000 });
        });
  }

  cancelar(): void {
    this.router.navigate(['portaEnxerto/listar']);
  }
}
