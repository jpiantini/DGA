export const MockupSteps = [
  'Información Básica',
  'Datos del Proyecto',
  'Entorno del proyecto',
  'Carga de Documentos',
  'Realizar Pago',
];

export const ListServices = [
  {
    id: 1,
    iconName: "note_add",
    relationTo: 'CONFOTUR',
    title: 'SOLICITUD DE NO OBJECIÓN DE SUELO',
    subTitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id: 2,
    iconName: "note_add",
    relationTo: 'CONFOTUR',
    title: 'CLASIFICACIÓN PROVISIONAL',
    subTitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id: 3,
    iconName: "note_add",
    relationTo: 'EMPRESAS Y SERVICIOS',
    title: 'HOTELES, RESTAURANTES, BARES Y SPA',
    subTitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id: 4,
    iconName: "note_add",
    relationTo: 'EMPRESAS Y SERVICIOS',
    title: 'TURISMO DE AVENTURA',
    subTitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id: 5,
    iconName: "note_add",
    relationTo: 'EMPRESAS Y SERVICIOS',
    title: 'GIFT SHOPS',
    subTitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
  {
    id: 6,
    iconName: "note_add",
    relationTo: 'EMPRESAS Y SERVICIOS',
    title: 'GUÍAS TURISTICOS',
    subTitle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut',
    onRequestPress: "",
    OnViewInformationPress: ""
  },
]

export const TEST_JSON_FORM = [
  {
    stepID: 1,
    stepName: 'Información Básica',
    formElements: [
      {
        displayName: "Empresa o comercio que realiza la solicitud",
        displayOrder: 0,
        required: true,
        elementId: "companyID",
        type: "select",
        readOnly: false,
        isHidden: false,
        elementValues: [
          {
            displayName: "Aprobado",
            elementvalueId: "approved"
          }, {
            displayName: "Declinado",
            elementvalueId: "declined"
          }, {
            displayName: "Pendiente",
            elementvalueId: "pending"
          }
        ]
      }
    ]
  },
  {
    stepID: 2,
    stepName: 'Datos del Proyecto',
    formElements: [
      {
        displayName: "Nombre",
        displayOrder: 0,
        required: true,
        elementId: "companyID",
        type: "textField",
        readOnly: false,
        isHidden: false
      },
      {
        displayName: "Dirección y/o Referencia de acceso",
        displayOrder: 1,
        required: true,
        elementId: "address",
        type: "textField",
        readOnly: false,
        isHidden: false
      },
      {
        displayName: "Fase de proyecto",
        displayOrder: 2,
        required: true,
        elementId: "projectPhase",
        type: "select",
        readOnly: false,
        isHidden: false,
        elementValues: [
          {
            displayName: "Aprobado",
            elementvalueId: "approved"
          }, {
            displayName: "Declinado",
            elementvalueId: "declined"
          }, {
            displayName: "Pendiente",
            elementvalueId: "pending"
          }
        ]
      },
    ]
  },




]