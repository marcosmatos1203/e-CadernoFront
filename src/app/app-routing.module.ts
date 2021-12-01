import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CultivarCriarComponent } from './cultivar/criar/cultivar-criar.component';
import { CultivarEditarComponent } from './cultivar/editar/cultivar-editar.component';
import { CultivarListarComponent } from './cultivar/listar/cultivar-listar.component';
import { CultivarQuadraCriarComponent } from './cultivarQuadra/criar/cultivar-quadra-criar.component';
import { CultivarQuadraEditarComponent } from './cultivarQuadra/editar/cultivar-quadra-editar.component';
import { CultivarQuadraListarComponent } from './cultivarQuadra/listar/cultivar-quadra-listar.component';
import { CupomCriarComponent } from './cupom/criar/cupom-criar.component';
import { CupomEditarComponent } from './cupom/editar/cupom-editar.component';
import { CupomListarComponent } from './cupom/listar/cupom-listar.component';
import { HomeComponent } from './home/home.component';
import { ParceiroCriarComponent } from './parceiro/criar/parceiro-criar.component';
import { ParceiroEditarComponent } from './parceiro/editar/parceiro-editar.component';
import { ParceiroListarComponent } from './parceiro/listar/parceiro-listar.component';
import { PomarCriarComponent } from './pomar/criar/pomar-criar.component';
import { PomarEditarComponent } from './pomar/editar/pomar-editar.component';
import { PomarListarComponent } from './pomar/listar/pomar-listar.component';
import { PortaEnxertoCriarComponent } from './portaEnxerto/criar/porta-enxerto-criar.component';
import { PortaEnxertoEditarComponent } from './portaEnxerto/editar/porta-enxerto-editar.component';
import { PortaEnxertoListarComponent } from './portaEnxerto/listar/porta-enxerto-listar.component';
import { ProdutorCriarComponent } from './produtor/criar/produtor-criar.component';
import { ProdutorEditarComponent } from './produtor/editar/produtor-editar.component';
import { ProdutorListarComponent } from './produtor/listar/produtor-listar.component';
import { QuadraCriarComponent } from './quadra/criar/quadra-criar.component';
import { QuadraEditarComponent } from './quadra/editar/quadra-editar.component';
import { QuadraListarComponent } from './quadra/listar/quadra-listar.component';
import { RespTecnicoCriarComponent } from './respTecnico/criar/resp-tecnico-criar.component';
import { RespTecnicoEditarComponent } from './respTecnico/editar/resp-tecnico-editar.component';
import { RespTecnicoListarComponent } from './respTecnico/listar/resp-tecnico-listar.component';
import { CultivarQuadraCreateViewModel } from './shared/viewModels/cultivarQuadra/CultivarQuadraCreateViewModel';
import { CultivarQuadraEditViewModel } from './shared/viewModels/cultivarQuadra/CultivarQuadraEditViewModel';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'parceiro/listar', component: ParceiroListarComponent },
  { path: 'parceiro/criar', component: ParceiroCriarComponent },
  { path: 'parceiro/editar/:id', component: ParceiroEditarComponent },
  { path: 'cupom/listar', component: CupomListarComponent },
  { path: 'cupom/criar', component: CupomCriarComponent },
  { path: 'cupom/editar/:id', component: CupomEditarComponent },
  { path: 'produtor/criar', component: ProdutorCriarComponent },
  { path: 'produtor/listar', component: ProdutorListarComponent },
  { path: 'produtor/editar/:id', component: ProdutorEditarComponent },
  { path: 'pomar/produtor/:id', component: PomarListarComponent },
  { path: 'pomar/editar/:id', component: PomarEditarComponent },
  { path: 'pomar/criar/:id', component: PomarCriarComponent },
  { path: 'respTecnico/listar', component: RespTecnicoListarComponent },
  { path: 'respTecnico/criar', component: RespTecnicoCriarComponent },
  { path: 'respTecnico/editar/:id', component: RespTecnicoEditarComponent },
  { path: 'quadra/pomar/:id', component: QuadraListarComponent },
  { path: 'quadra/editar/:id', component: QuadraEditarComponent },
  { path: 'quadra/criar/:id', component: QuadraCriarComponent },
  { path: 'cultivar/listar', component: CultivarListarComponent },
  { path: 'cultivar/criar', component: CultivarCriarComponent },
  { path: 'cultivar/editar/:id', component: CultivarEditarComponent },
  { path: 'portaEnxerto/listar', component: PortaEnxertoListarComponent },
  { path: 'portaEnxerto/criar', component: PortaEnxertoCriarComponent },
  { path: 'portaEnxerto/editar/:id', component: PortaEnxertoEditarComponent },
  { path: 'cultivarQuadra/:id', component: CultivarQuadraListarComponent },
  { path: 'cultivarQuadra/criar/:id', component: CultivarQuadraCriarComponent },
  { path: 'cultivarQuadra/editar/:id', component: CultivarQuadraEditarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
