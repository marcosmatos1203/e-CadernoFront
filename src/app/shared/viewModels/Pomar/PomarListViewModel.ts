import { ProdutorListViewModel } from "../Produtor/ProdutorListViewModel";
import { RespTecnicoListViewModel } from "../respTecnico/RespTecnicoListViewModel";

export class PomarListViewModel{
    id:number;
    nome: string;
    cidade: string;
    produtor:ProdutorListViewModel;
    respTecnico:RespTecnicoListViewModel;
}