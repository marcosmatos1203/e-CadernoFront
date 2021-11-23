import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpPomarService } from 'src/app/shared/interfaces/IHttpPomarService';
import { PomarCreateViewModel } from 'src/app/shared/viewModels/Pomar/PomarCreateViewModel';
import { PomarDetailsViewModel } from 'src/app/shared/viewModels/Pomar/PomarDetailsViewModel';
import { PomarEditViewModel } from 'src/app/shared/viewModels/Pomar/PomarEditViewModel';
import { PomarListViewModel } from 'src/app/shared/viewModels/Pomar/PomarListViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpPomarService implements IHttpPomarService{

  url: string = environment.UrlBase+'pomar';

  constructor(private http: HttpClient) { }

  obterPomaresPorIdProdutor(id: number): Observable<PomarListViewModel[]> {
    return this.http.get<PomarListViewModel[]>( `${this.url}?produtor=${id}`);
  }

  obter(): Observable<PomarListViewModel[]> {
    return this.http.get<PomarListViewModel[]>(`${this.url}`);
  }
  adicionar(obj: PomarCreateViewModel): Observable<PomarCreateViewModel> {
    console.log(obj);
    return this.http.post<PomarCreateViewModel>(this.url, obj);
  }
  obterPorId(id: number): Observable<PomarDetailsViewModel> {
    return this.http.get<PomarDetailsViewModel>(`${this.url}/${id}`);
  }
  editar(obj: PomarEditViewModel): Observable<PomarEditViewModel> {
    return this.http.put<PomarEditViewModel>(`${this.url}/${obj.id}`, obj);
  }
  excluir(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
}
