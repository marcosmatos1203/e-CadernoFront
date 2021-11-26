import { Observable } from "rxjs";
import { QuadraCreateViewModel } from "../viewModels/Quadra/QuadraCreateViewModel";
import { QuadraDetailsViewModel } from "../viewModels/Quadra/QuadraDetailsViewModel";
import { QuadraEditViewModel } from "../viewModels/Quadra/QuadraEditViewModel";
import { QuadraListViewModel } from "../viewModels/Quadra/QuadraListViewModel";


export interface IHttpQuadraService {

    obter(): Observable<QuadraListViewModel[]>

    adicionar(obj: QuadraCreateViewModel): Observable<QuadraCreateViewModel>

    obterPorId(id: number): Observable<QuadraDetailsViewModel>

    editar(obj: QuadraEditViewModel): Observable<QuadraEditViewModel>

    excluir(id: number): Observable<number>
      
}