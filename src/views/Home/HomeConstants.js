//ALL CURRENT DATA IS MOCKUP

import mockupImage1 from '../../assets/images/mockupImage1.jpg';
import mockupImage2 from '../../assets/images/mockupImage2.jpg';
import mockupImage3 from '../../assets/images/mockupImage3.png';
import mockupImage4 from '../../assets/images/mockupImage4.png';
import mockupImage5 from '../../assets/images/mockupImage5.png';

export const slideImages = [
  mockupImage1,
  mockupImage2,
  mockupImage3
]

export const servicesListBackgroundImage = mockupImage4;
export const moreInformationBackgroundImage = mockupImage5;

export const firstSelectorData = [
  {
    value: 1,
    label: 'CONFOTUR',
  },
  {
    value: 2,
    label: 'EMPRESAS Y SERVICIOS',
  },
  {
    value: 3,
    label: 'DPP',
  },
];

export const secondarySelectorData = [
  {
    value: 1,
    label: 'SECTOR 1',
  },
  {
    value: 2,
    label: 'SECTOR 2',
  },
  {
    value: 3,
    label: 'SECTOR 3',
  },
];

export const tertiarySelectorData = [
  {
    value: 1,
    label: 'COMERCIAL',
  },
  {
    value: 2,
    label: 'SERVICIOS',
  },
  {
    value: 3,
    label: 'RETAIL',
  },
];

export const quaternarySelectorData = [
  {
    value: 1,
    label: 'SUB-ACTIVIDAD 1',
  },
  {
    value: 2,
    label: 'SUB-ACTIVIDAD 2',
  },
  {
    value: 3,
    label: 'SUB-ACTIVIDAD 3',
  },
];

export const ListServices = [
  {
    id:1,
    iconName:"note_add",
    relationTo:'CONFOTUR',
    title:'SOLICITUD DE NO OBJECIÓN DE SUELO',
    subTitle:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id:2,
    iconName:"receipt",
    relationTo:'CONFOTUR',
    title:'CLASIFICACIÓN PROVISIONAL',
    subTitle:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id:3,
    iconName:"apartment",
    relationTo:'EMPRESAS Y SERVICIOS',
    title:'HOTELES, RESTAURANTES, BARES Y SPA',
    subTitle:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id:4,
    iconName:"kayaking",
    relationTo:'EMPRESAS Y SERVICIOS',
    title:'TURISMO DE AVENTURA',
    subTitle:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id:5,
    iconName:"storefront",
    relationTo:'EMPRESAS Y SERVICIOS',
    title:'GIFT SHOPS',
    subTitle:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id:6,
    iconName:"person_pin_circle",
    relationTo:'EMPRESAS Y SERVICIOS',
    title:'GUÍAS TURISTICOS',
    subTitle:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
]


export const FooterRoutes = [
  {
    value: 1,
    title: 'Establecientos de hospedaje',
    routes : [
      {
        title:'Apartahoteles',
        route:'apartahoteles'
      },
      {
        title:'Hoteles',
        route:'hoteles'
      },
      {
        title:'Restaurantes',
        route:'restaurantes'
      },
      {
        title:'Cafeterias',
        route:'cafeterias'
      },
      {
        title:'Discotecas',
        route:'discotecas'
      },
      {
        title:'Bares',
        route:'bares'
      },
    ]
  },
  {
    value: 2,
    title: 'Gift shops',
    routes : [
      {
        title:'Tiendas de artesania',
        route:'tiendas-de-artesania'
      },
      {
        title:'Joyeria',
        route:'joyeria'
      },
      {
        title:'Cigar shop',
        route:'cigar-shop'
      },
      {
        title:'Galeria de arte',
        route:'galeria-de-arte'
      },
      {
        title:'Minimarket',
        route:'minimarket'
      },
      {
        title:'Liquor Store',
        route:'liquor-store'
      },
    ]
  },
  {
    value: 3,
    title: 'Agencias de viaje y tour operador',
    routes : [
      {
        title:'Agencias de viajes mayorista',
        route:'agencias-de-viajes-mayorista'
      },
      {
        title:'Agencias de viajes, reservas y pasajes',
        route:'Agencias de viajes, reservas y pasajes'
      },
      {
        title:'Tour operador receptivo-emitivo',
        route:'Tour operador receptivo-emitivo'
      },
      {
        title:'Tour operador local-doméstico',
        route:'Tour operador local-doméstico'
      }
    ]
  },
  {
    value: 4,
    title: 'Viajes en botes',
    routes : [
      {
        title:'Bote',
        route:'Bote'
      },
      {
        title:'Catamaran motorizado',
        route:'Catamaran motorizado'
      },
      {
        title:'Speed boat',
        route:'Speed boat'
      },
      {
        title:'Velero',
        route:'Velero'
      }
    ]
  },
  {
    value: 5,
    title: 'Turismo de aventura',
    routes : [
      {
        title:'Escuela de buceo',
        route:'Escuela de buceo'
      },
      {
        title:'Pesca',
        route:'Pesca'
      },
      {
        title:'Paintball',
        route:'Paintball'
      },
      {
        title:'Zip line-Canopy',
        route:'Zip line-Canopy'
      }
    ]
  },
  {
    value: 6,
    title: 'Turismo de Caminata',
    routes : [
      {
        title:'Escuela de buceo',
        route:'Escuela de buceo'
      },
      {
        title:'Pesca',
        route:'Pesca'
      },
      {
        title:'Paintball',
        route:'Paintball'
      },
      {
        title:'Zip line-Canopy',
        route:'Zip line-Canopy'
      }
    ]
  },
];