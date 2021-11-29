import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { IHttpQuadraService } from 'src/app/shared/interfaces/IHttpQuadraService';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PomarListViewModel } from 'src/app/shared/viewModels/Pomar/PomarListViewModel';
import { QuadraListViewModel } from 'src/app/shared/viewModels/Quadra/QuadraListViewModel';

@Component({
  selector: 'app-quadra-criar',
  templateUrl: './quadra-criar.component.html',
  styleUrls: ['./quadra-criar.component.css']
})
export class QuadraCriarComponent implements OnInit { constructor() { }

ngOnInit(): void {
}

}
