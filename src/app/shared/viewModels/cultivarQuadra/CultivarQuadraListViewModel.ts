import { CultivarDetailsViewModel } from "../cultivar/CultivarDetailsViewModel";
import { PortaEnxertoDetailsViewModel } from "../PortaEnxerto/PortaEnxertoDetailsViewModel";

export class CultivarQuadraListViewModel {
    id: number;
    quantidade: number;
    portaEnxerto:PortaEnxertoDetailsViewModel;
    cultivar:CultivarDetailsViewModel;
}