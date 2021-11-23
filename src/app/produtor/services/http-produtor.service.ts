import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpProdutorService } from 'src/app/shared/interfaces/IHttpProdutorService';
import { ProdutorCreateViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorCreateViewModel';
import { ProdutorDetailsViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorDetailsViewModel';
import { ProdutorEditViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorEditViewModel';
import { ProdutorListViewModel } from 'src/app/shared/viewModels/Produtor/ProdutorListViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpProdutorService implements IHttpProdutorService {

  url: string = environment.UrlBase+'produtor';

  constructor(private http: HttpClient) { }

  obter(): Observable<ProdutorListViewModel[]> {
    return this.http.get<ProdutorListViewModel[]>(`${this.url}`);
  }
  adicionar(obj: ProdutorCreateViewModel): Observable<ProdutorCreateViewModel> {    
    return this.http.post<ProdutorCreateViewModel>(this.url, obj);
  }
  obterPorId(id: number): Observable<ProdutorDetailsViewModel> {
    return this.http.get<ProdutorDetailsViewModel>(`${this.url}/${id}`);
  }
  editar(obj: ProdutorEditViewModel): Observable<ProdutorEditViewModel> {
    return this.http.put<ProdutorEditViewModel>(`${this.url}/${obj.id}`, obj);
  }
  excluir(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
}
