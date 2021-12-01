import { Observable } from "rxjs";
import { CultivarQuadraCreateViewModel } from "../viewModels/cultivarQuadra/CultivarQuadraCreateViewModel";
import { CultivarQuadraDetailsViewModel } from "../viewModels/cultivarQuadra/CultivarQuadraDetailsViewModel";
import { CultivarQuadraEditViewModel } from "../viewModels/cultivarQuadra/CultivarQuadraEditViewModel";
import { CultivarQuadraListViewModel } from "../viewModels/cultivarQuadra/CultivarQuadraListViewModel";


export interface IHttpCultivarQuadraService {

    obterCultivaresPorIdQuadra(id: number): Observable<CultivarQuadraListViewModel[]>

    obter(): Observable<CultivarQuadraListViewModel[]>

    adicionar(obj: CultivarQuadraCreateViewModel): Observable<CultivarQuadraCreateViewModel>

    obterPorId(id: number): Observable<CultivarQuadraDetailsViewModel>

    editar(obj: CultivarQuadraEditViewModel): Observable<CultivarQuadraEditViewModel>

    excluir(id: number): Observable<number>
}