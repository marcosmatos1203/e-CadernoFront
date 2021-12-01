import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './navegacao/footer/footer.component';
import { HeaderComponent } from './navegacao/header/header.component';
import { MenuComponent } from './navegacao/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ParceiroListarComponent } from './parceiro/listar/parceiro-listar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ParceiroCriarComponent } from './parceiro/criar/parceiro-criar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParceiroEditarComponent } from './parceiro/editar/parceiro-editar.component';
import { CupomListarComponent } from './cupom/listar/cupom-listar.component';
import { CupomCriarComponent } from './cupom/criar/cupom-criar.component';
import { CupomEditarComponent } from './cupom/editar/cupom-editar.component';
import { HttpParceiroService } from './parceiro/services/http-parceiro.service';
import { HttpCupomService } from './cupom/services/http-cupom.service';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FormatarEnumPipe } from './shared/pipes/formatar-enum.pipe';
import { ProdutorCriarComponent } from './produtor/criar/produtor-criar.component';
import { ProdutorListarComponent } from './produtor/listar/produtor-listar.component';
import { ProdutorEditarComponent } from './produtor/editar/produtor-editar.component';
import { HttpProdutorService } from './produtor/services/http-produtor.service';
import { HttpPomarService } from './pomar/services/http-pomar.service';
import { PomarCriarComponent } from './pomar/criar/pomar-criar.component';
import { PomarEditarComponent } from './pomar/editar/pomar-editar.component';
import { PomarListarComponent } from './pomar/listar/pomar-listar.component';
import { RespTecnicoListarComponent } from './respTecnico/listar/resp-tecnico-listar.component';
import { RespTecnicoCriarComponent } from './respTecnico/criar/resp-tecnico-criar.component';
import { RespTecnicoEditarComponent } from './respTecnico/editar/resp-tecnico-editar.component';
import { HttpRespTecnicoService } from './respTecnico/services/http-resp-tecnico.service';
import { HttpQuadraService } from './quadra/services/http-quadra.service';
import { QuadraListarComponent } from './quadra/listar/quadra-listar.component';
import { QuadraCriarComponent } from './quadra/criar/quadra-criar.component';
import { QuadraEditarComponent } from './quadra/editar/quadra-editar.component';
import { CultivarEditarComponent } from './cultivar/editar/cultivar-editar.component';
import { CultivarListarComponent } from './cultivar/listar/cultivar-listar.component';
import { CultivarCriarComponent } from './cultivar/criar/cultivar-criar.component';
import { HttpCultivarService } from './cultivar/services/http-cultivar.service';
import { PortaEnxertoCriarComponent } from './portaEnxerto/criar/porta-enxerto-criar.component';
import { PortaEnxertoListarComponent } from './portaEnxerto/listar/porta-enxerto-listar.component';
import { PortaEnxertoEditarComponent } from './portaEnxerto/editar/porta-enxerto-editar.component';
import { HttpPortaEnxertoService } from './portaEnxerto/services/http-porta-enxerto.service';
import { CultivarQuadraEditarComponent } from './cultivarQuadra/editar/cultivar-quadra-editar.component';
import { CultivarQuadraListarComponent } from './cultivarQuadra/listar/cultivar-quadra-listar.component';
import { HttpCultivarQuadraService } from './cultivarQuadra/services/http-cultivar-quadra.service';
import { CultivarQuadraCriarComponent } from './cultivarQuadra/criar/cultivar-quadra-criar.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    ParceiroListarComponent,
    ParceiroCriarComponent,
    ParceiroEditarComponent,
    CupomListarComponent,
    CupomCriarComponent,
    CupomEditarComponent,
    ToastContainerComponent,
    FormatarEnumPipe,
    ProdutorCriarComponent,
    ProdutorListarComponent,
    ProdutorEditarComponent,
    PomarCriarComponent,
    PomarEditarComponent,
    PomarListarComponent,
    RespTecnicoListarComponent,
    RespTecnicoCriarComponent,
    RespTecnicoEditarComponent,
    QuadraListarComponent,
    QuadraCriarComponent,
    QuadraEditarComponent,
    CultivarEditarComponent,
    CultivarListarComponent,
    CultivarCriarComponent,
    PortaEnxertoCriarComponent,
    PortaEnxertoListarComponent,
    PortaEnxertoEditarComponent,
    CultivarQuadraEditarComponent,
    CultivarQuadraCriarComponent,
    CultivarQuadraListarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: 'IHttpParceiroServiceToken', useClass: HttpParceiroService },
    { provide: 'IHttpCupomServiceToken', useClass: HttpCupomService },
    { provide: 'IHttpProdutorServiceToken', useClass: HttpProdutorService },
    { provide: 'IHttpQuadraServiceToken', useClass: HttpQuadraService },
    { provide: 'IHttpPomarServiceToken', useClass: HttpPomarService },
    { provide: 'IHttpRespTecnicoServiceToken', useClass: HttpRespTecnicoService},
    { provide: 'IHttpCultivarQuadraServiceToken', useClass: HttpCultivarQuadraService},
    { provide: 'IHttpPortaEnxertoServiceToken', useClass: HttpPortaEnxertoService},
    { provide: 'IHttpCultivarServiceToken', useClass: HttpCultivarService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
