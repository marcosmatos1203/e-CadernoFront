import { Observable } from "rxjs";
import { PragaCreateViewModel } from "../viewModels/praga/PragaCreateViewModel";
import { PragaDetailsViewModel } from "../viewModels/praga/PragaDetailsViewModel";
import { PragaEditViewModel } from "../viewModels/praga/PragaEditViewModel";
import { PragaListViewModel } from "../viewModels/praga/PragaListViewModel";


export interface IHttpPragaService {

    obter(): Observable<PragaListViewModel[]>

    adicionar(obj: PragaCreateViewModel): Observable<PragaCreateViewModel>

    obterPorId(id: number): Observable<PragaDetailsViewModel>

    editar(obj: PragaEditViewModel): Observable<PragaEditViewModel>

    excluir(id: number): Observable<number>
}