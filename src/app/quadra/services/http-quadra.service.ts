import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpQuadraService } from 'src/app/shared/interfaces/IHttpQuadraService';
import { QuadraCreateViewModel } from 'src/app/shared/viewModels/Quadra/QuadraCreateViewModel';
import { QuadraDetailsViewModel } from 'src/app/shared/viewModels/Quadra/QuadraDetailsViewModel';
import { QuadraEditViewModel } from 'src/app/shared/viewModels/Quadra/QuadraEditViewModel';
import { QuadraListViewModel } from 'src/app/shared/viewModels/Quadra/QuadraListViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpQuadraService implements IHttpQuadraService {

  url: string = environment.UrlBase+'quadra';

  constructor(private http: HttpClient) { }

  obter(): Observable<QuadraListViewModel[]> {
    return this.http.get<QuadraListViewModel[]>(`${this.url}`);
  }
  adicionar(obj: QuadraCreateViewModel): Observable<QuadraCreateViewModel> {    
    return this.http.post<QuadraCreateViewModel>(this.url, obj);
  }
  obterPorId(id: number): Observable<QuadraDetailsViewModel> {
    return this.http.get<QuadraDetailsViewModel>(`${this.url}/${id}`);
  }
  editar(obj: QuadraEditViewModel): Observable<QuadraEditViewModel> {
    return this.http.put<QuadraEditViewModel>(`${this.url}/${obj.id}`, obj);
  }
  excluir(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
}
