import { hourToMilliseconds, minutesToMilliseconds } from "./utilities/functions/TimeUtil";

/*
THIS FILE IS FOR GLOBAL AND SPECIFIC INFORMATION OF REACT-QUERY
staleTime = Tiempo en que la informacion sera considerada fresca o valida;
cacheTime = Tiempo en que la informacion inactiva (que no se estre mostrando/visualizando o consumiendo) sera mantenida en cache
*/

export const cacheConfig = {
    staleTimeGeneral:hourToMilliseconds(24),
    staleTimeForRequestedServicesList:minutesToMilliseconds(9),
    staleTimeForRequestedServiceDetail:minutesToMilliseconds(9),
    cacheTime:hourToMilliseconds(24)
}