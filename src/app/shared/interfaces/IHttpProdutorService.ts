import { Observable } from "rxjs";
import { ProdutorCreateViewModel } from "../viewModels/Produtor/ProdutorCreateViewModel";
import { ProdutorDetailsViewModel } from "../viewModels/Produtor/ProdutorDetailsViewModel";
import { ProdutorEditViewModel } from "../viewModels/Produtor/ProdutorEditViewModel";
import { ProdutorListViewModel } from "../viewModels/Produtor/ProdutorListViewModel";


export interface IHttpProdutorService {

    obter(): Observable<ProdutorListViewModel[]>

    adicionar(obj: ProdutorCreateViewModel): Observable<ProdutorCreateViewModel>

    obterPorId(id: number): Observable<ProdutorDetailsViewModel>

    editar(obj: ProdutorEditViewModel): Observable<ProdutorEditViewModel>

    excluir(id: number): Observable<number>
}