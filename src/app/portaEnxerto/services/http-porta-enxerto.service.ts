import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpPortaEnxertoService } from 'src/app/shared/interfaces/IHttpPortaEnxertoService';
import { PortaEnxertoCreateViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoCreateViewModel';
import { PortaEnxertoDetailsViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoDetailsViewModel';
import { PortaEnxertoEditViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoEditViewModel';
import { PortaEnxertoListViewModel } from 'src/app/shared/viewModels/PortaEnxerto/PortaEnxertoListViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpPortaEnxertoService implements IHttpPortaEnxertoService{

  url: string = environment.UrlBase+'portaEnxerto';
  
  constructor(private http: HttpClient) { }
  
  obter(): Observable<PortaEnxertoListViewModel[]> {
    return this.http.get<PortaEnxertoListViewModel[]>(`${this.url}`);
  }
  adicionar(obj: PortaEnxertoCreateViewModel): Observable<PortaEnxertoCreateViewModel> {
    return this.http.post<PortaEnxertoCreateViewModel>(this.url, obj);
  }
  obterPorId(id: number): Observable<PortaEnxertoDetailsViewModel> {
    return this.http.get<PortaEnxertoDetailsViewModel>(`${this.url}/${id}`);
  }
  editar(obj: PortaEnxertoEditViewModel): Observable<PortaEnxertoEditViewModel> {
    return this.http.put<PortaEnxertoEditViewModel>(`${this.url}/${obj.id}`, obj);
  }
  excluir(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }
}
