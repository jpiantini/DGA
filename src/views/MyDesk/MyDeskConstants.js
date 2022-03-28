export const requestFilterTypes = [
    {
        value:1,
        label:'En proceso',
        variantTypes:[1,2,3,4,5,6,9]
    },
    {
        value:2,
        label:'Completadas',
        variantTypes:[7]
    },
    {
        value:3,
        label:'Rechazadas',
        variantTypes:[8,10]
    },
]

export const MockupInProcessRequests = [
    {
        id:1,
        percent:'60%',
        title:'Solicitud de no objeción de suelo',
        status:'actionRequired',
        serviceID:1
    },
    {
        id:2,
        percent:'90%',
        title:'Solicitud de prueba ABC',
        status:'inProcess',
        serviceID:2
    },
]

export const MockupCompletedRequests = [
    {
        id:1,
        title:'Clasificación Provisional',
        status:'success',
        serviceID:3
    },
    {
        id:2,
        title:'Guías Turísticos',
        status:'success',
        serviceID:4
    },
]

export const MockupRejectedRequests = [
    {
        id:1,
        title:'Solicitud de ejemplo',
        status:'rejected',
        serviceID:5
    },
]