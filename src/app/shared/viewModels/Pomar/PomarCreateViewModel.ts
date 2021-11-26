import { ProdutorDetailsViewModel } from "../Produtor/ProdutorDetailsViewModel";
import { RespTecnicoDetailsViewModel } from "../respTecnico/RespTecnicoDetailsViewModel";

export class PomarCreateViewModel{
    nome: string;
    logradouro: string;
    bairro_localidade: string;
    cidade: string;
    estado: string;
    cep: string;
    produtor:ProdutorDetailsViewModel;
    respTecnico: RespTecnicoDetailsViewModel;
}