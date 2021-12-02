import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpPragaService } from 'src/app/shared/interfaces/IHttpPragaService';
import { PragaCreateViewModel } from 'src/app/shared/viewModels/praga/PragaCreateViewModel';
import { PragaDetailsViewModel } from 'src/app/shared/viewModels/praga/PragaDetailsViewModel';
import { PragaEditViewModel } from 'src/app/shared/viewModels/praga/PragaEditViewModel';
import { PragaListViewModel } from 'src/app/shared/viewModels/praga/PragaListViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpPragaService implements IHttpPragaService{

  url: string = environment.UrlBase+'praga';

  constructor(private http: HttpClient) { }
  
  obter(): Observable<PragaListViewModel[]> {
    return this.http.get<PragaListViewModel[]>(`${this.url}`);
  }
  adicionar(obj: PragaCreateViewModel): Observable<PragaCreateViewModel> {
    return this.http.post<PragaCreateViewModel>(this.url, obj);
  }
  obterPorId(id: number): Observable<PragaDetailsViewModel> {
    return this.http.get<PragaDetailsViewModel>(`${this.url}/${id}`);
  }
  editar(obj: PragaEditViewModel): Observable<PragaEditViewModel> {
    return this.http.put<PragaEditViewModel>(`${this.url}/${obj.id}`, obj);
  }
  excluir(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
}
