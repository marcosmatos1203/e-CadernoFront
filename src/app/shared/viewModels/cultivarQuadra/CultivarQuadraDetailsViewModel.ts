import { CultivarDetailsViewModel } from "../cultivar/CultivarDetailsViewModel";
import { PortaEnxertoDetailsViewModel } from "../PortaEnxerto/PortaEnxertoDetailsViewModel";
import { QuadraDetailsViewModel } from "../Quadra/QuadraDetailsViewModel";

export class CultivarQuadraDetailsViewModel {
    id: number;
    quantidade: number;
    quadra:QuadraDetailsViewModel;
    portaEnxerto:PortaEnxertoDetailsViewModel;
    cultivar:CultivarDetailsViewModel;
}