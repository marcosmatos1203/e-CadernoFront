import { Observable } from "rxjs";
import { PomarCreateViewModel } from "../viewModels/Pomar/PomarCreateViewModel";
import { PomarDetailsViewModel } from "../viewModels/Pomar/PomarDetailsViewModel";
import { PomarEditViewModel } from "../viewModels/Pomar/PomarEditViewModel";
import { PomarListViewModel } from "../viewModels/Pomar/PomarListViewModel";


export interface IHttpPomarService {

    obter(): Observable<PomarListViewModel[]>

    adicionar(obj: PomarCreateViewModel): Observable<PomarCreateViewModel>

    obterPorId(id: number): Observable<PomarDetailsViewModel>

    editar(obj: PomarEditViewModel): Observable<PomarEditViewModel>

    excluir(id: number): Observable<number>

    obterPomaresPorIdProdutor(id: number):Observable<PomarListViewModel[]>
      
}