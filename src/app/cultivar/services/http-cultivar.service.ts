import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpCultivarService } from 'src/app/shared/interfaces/IHttpCultivarService';
import { CultivarCreateViewModel } from 'src/app/shared/viewModels/cultivar/CultivarCreateViewModel';
import { CultivarDetailsViewModel } from 'src/app/shared/viewModels/cultivar/CultivarDetailsViewModel';
import { CultivarEditViewModel } from 'src/app/shared/viewModels/cultivar/CultivarEditViewModel';
import { CultivarListViewModel } from 'src/app/shared/viewModels/cultivar/CultivarListViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCultivarService implements IHttpCultivarService{

  url: string = environment.UrlBase+'cultivar';
  
  constructor(private http: HttpClient) { }
  obter(): Observable<CultivarListViewModel[]> {
    return this.http.get<CultivarListViewModel[]>(`${this.url}`);
  }
  adicionar(obj: CultivarCreateViewModel): Observable<CultivarCreateViewModel> {
    return this.http.post<CultivarCreateViewModel>(this.url, obj);
  }
  obterPorId(id: number): Observable<CultivarDetailsViewModel> {
    return this.http.get<CultivarDetailsViewModel>(`${this.url}/${id}`);
  }
  editar(obj: CultivarEditViewModel): Observable<CultivarEditViewModel> {
    return this.http.put<CultivarEditViewModel>(`${this.url}/${obj.id}`, obj);
  }
  excluir(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
}
