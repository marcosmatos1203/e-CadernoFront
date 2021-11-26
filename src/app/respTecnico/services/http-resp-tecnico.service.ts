import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpRespTecnicoService } from 'src/app/shared/interfaces/IHttpRespTecnicoService';
import { RespTecnicoCreateViewModel } from 'src/app/shared/viewModels/respTecnico/RespTecnicoCreateViewModel';
import { RespTecnicoDetailsViewModel } from 'src/app/shared/viewModels/respTecnico/RespTecnicoDetailsViewModel';
import { RespTecnicoEditViewModel } from 'src/app/shared/viewModels/respTecnico/RespTecnicoEditViewModel';
import { RespTecnicoListViewModel } from 'src/app/shared/viewModels/respTecnico/RespTecnicoListViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRespTecnicoService implements IHttpRespTecnicoService{

  url: string = environment.UrlBase+'respTecnico';
  
  constructor(private http: HttpClient) { }

  obterCompleto(): Observable<RespTecnicoDetailsViewModel[]> {
    return this.http.get<RespTecnicoDetailsViewModel[]>(`${this.url}`);
  }

  obter(): Observable<RespTecnicoListViewModel[]> {
    return this.http.get<RespTecnicoListViewModel[]>(`${this.url}`);
  }
  adicionar(obj: RespTecnicoCreateViewModel): Observable<RespTecnicoCreateViewModel> {
    return this.http.post<RespTecnicoCreateViewModel>(this.url, obj);
  }
  obterPorId(id: number): Observable<RespTecnicoDetailsViewModel> {
    return this.http.get<RespTecnicoDetailsViewModel>(`${this.url}/${id}`);
  }
  editar(obj: RespTecnicoEditViewModel): Observable<RespTecnicoEditViewModel> {
    return this.http.put<RespTecnicoEditViewModel>(`${this.url}/${obj.id}`, obj);
  }
  excluir(id: number): Observable<number> {
    throw new Error('Method not implemented.');
  }
}
