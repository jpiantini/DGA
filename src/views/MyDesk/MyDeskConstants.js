export const MockupNotifications = [
    {
        id:1,
        type:'success',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        id:2,
        type:'warning',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        id:3,
        type:'error',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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