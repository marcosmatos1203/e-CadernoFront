import { ProdutorListViewModel } from "../Produtor/ProdutorListViewModel";
import { RespTecnicoListViewModel } from "../respTecnico/RespTecnicoListViewModel";

export class PomarDetailsViewModel{
    id: number;
    nome: string;
    logradouro: string;
    bairro_localidade: string;
    cidade: string;
    estado: string;
    cep: string;
    produtor:ProdutorListViewModel;
    respTecnico: RespTecnicoListViewModel;
}