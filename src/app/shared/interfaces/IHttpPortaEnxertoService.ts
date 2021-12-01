import { Observable } from "rxjs";
import { PortaEnxertoCreateViewModel } from "../viewModels/PortaEnxerto/PortaEnxertoCreateViewModel";
import { PortaEnxertoDetailsViewModel } from "../viewModels/PortaEnxerto/PortaEnxertoDetailsViewModel";
import { PortaEnxertoEditViewModel } from "../viewModels/PortaEnxerto/PortaEnxertoEditViewModel";
import { PortaEnxertoListViewModel } from "../viewModels/PortaEnxerto/PortaEnxertoListViewModel";


export interface IHttpPortaEnxertoService {

    obter(): Observable<PortaEnxertoListViewModel[]>

    adicionar(obj: PortaEnxertoCreateViewModel): Observable<PortaEnxertoCreateViewModel>

    obterPorId(id: number): Observable<PortaEnxertoDetailsViewModel>

    editar(obj: PortaEnxertoEditViewModel): Observable<PortaEnxertoEditViewModel>

    excluir(id: number): Observable<number>
}