import { Observable } from "rxjs";
import { RespTecnicoCreateViewModel } from "../viewModels/respTecnico/RespTecnicoCreateViewModel";
import { RespTecnicoDetailsViewModel } from "../viewModels/respTecnico/RespTecnicoDetailsViewModel";
import { RespTecnicoEditViewModel } from "../viewModels/respTecnico/RespTecnicoEditViewModel";
import { RespTecnicoListViewModel } from "../viewModels/respTecnico/RespTecnicoListViewModel";


export interface IHttpRespTecnicoService {

    obter(): Observable<RespTecnicoListViewModel[]>

    obterCompleto(): Observable<RespTecnicoDetailsViewModel[]>

    adicionar(obj: RespTecnicoCreateViewModel): Observable<RespTecnicoCreateViewModel>

    obterPorId(id: number): Observable<RespTecnicoDetailsViewModel>

    editar(obj: RespTecnicoEditViewModel): Observable<RespTecnicoEditViewModel>

    excluir(id: number): Observable<number>
}