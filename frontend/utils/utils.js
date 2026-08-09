import {formatDistance} from "date-fns";
import {ptBR} from "date-fns/locale";

export function formattedData(date) {
    return formatDistance(new Date(date || new Date()), new Date(), {
        addSuffix: true,
        locale: ptBR
    });
}