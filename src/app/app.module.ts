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
    { provide: 'IHttpCupomServiceToken', useClass: HttpCupomService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
