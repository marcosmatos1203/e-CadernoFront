import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpCultivarQuadraService } from 'src/app/shared/interfaces/IHttpCultivarQuadraService';
import { CultivarQuadraCreateViewModel } from 'src/app/shared/viewModels/cultivarQuadra/CultivarQuadraCreateViewModel';
import { CultivarQuadraDetailsViewModel } from 'src/app/shared/viewModels/cultivarQuadra/CultivarQuadraDetailsViewModel';
import { CultivarQuadraEditViewModel } from 'src/app/shared/viewModels/cultivarQuadra/CultivarQuadraEditViewModel';
import { CultivarQuadraListViewModel } from 'src/app/shared/viewModels/cultivarQuadra/CultivarQuadraListViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCultivarQuadraService implements IHttpCultivarQuadraService{

  url: string = environment.UrlBase+'cultivarQuadra';

  constructor(private http: HttpClient) { }

  obterCultivaresPorIdQuadra(id: number): Observable<CultivarQuadraListViewModel[]> {
    return this.http.get<CultivarQuadraListViewModel[]>( `${this.url}?quadra=${id}`);
  }
  obter(): Observable<CultivarQuadraListViewModel[]> {
    return this.http.get<CultivarQuadraListViewModel[]>(`${this.url}`);
  }
  adicionar(obj: CultivarQuadraCreateViewModel): Observable<CultivarQuadraCreateViewModel> {
    return this.http.post<CultivarQuadraCreateViewModel>(this.url, obj);
  }
  obterPorId(id: number): Observable<CultivarQuadraDetailsViewModel> {
    return this.http.get<CultivarQuadraDetailsViewModel>(`${this.url}/${id}`);
  }
  editar(obj: CultivarQuadraEditViewModel): Observable<CultivarQuadraEditViewModel> {
    return this.http.put<CultivarQuadraEditViewModel>(`${this.url}/${obj.id}`, obj);
  }
  excluir(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
}
