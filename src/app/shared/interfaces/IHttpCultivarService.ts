import { Observable } from "rxjs";
import { CultivarCreateViewModel } from "../viewModels/cultivar/CultivarCreateViewModel";
import { CultivarDetailsViewModel } from "../viewModels/cultivar/CultivarDetailsViewModel";
import { CultivarEditViewModel } from "../viewModels/cultivar/CultivarEditViewModel";
import { CultivarListViewModel } from "../viewModels/cultivar/CultivarListViewModel";


export interface IHttpCultivarService {

    obter(): Observable<CultivarListViewModel[]>

    adicionar(obj: CultivarCreateViewModel): Observable<CultivarCreateViewModel>

    obterPorId(id: number): Observable<CultivarDetailsViewModel>

    editar(obj: CultivarEditViewModel): Observable<CultivarEditViewModel>

    excluir(id: number): Observable<number>
}