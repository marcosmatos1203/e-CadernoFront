import { Observable } from "rxjs";
import { MonitoramentoPragaCreateViewModel } from "../viewModels/monitoramentoPraga/MonitoramentoPragaCreateViewModel";
import { MonitoramentoPragaDetailsViewModel } from "../viewModels/monitoramentoPraga/MonitoramentoPragaDetailsViewModel";
import { MonitoramentoPragaEditViewModel } from "../viewModels/monitoramentoPraga/MonitoramentoPragaEditViewModel";
import { MonitoramentoPragaListViewModel } from "../viewModels/monitoramentoPraga/MonitoramentoPragaListViewModel";


export interface IHttpMonitoramentoPragaService {

    obter(): Observable<MonitoramentoPragaListViewModel[]>

    adicionar(obj: MonitoramentoPragaCreateViewModel): Observable<MonitoramentoPragaCreateViewModel>

    obterPorId(id: number): Observable<MonitoramentoPragaDetailsViewModel>

    editar(obj: MonitoramentoPragaEditViewModel): Observable<MonitoramentoPragaEditViewModel>

    excluir(id: number): Observable<number>
}