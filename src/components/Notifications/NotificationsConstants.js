

export const MockupNotifications = [
  {
    id:1,
    title:'Solicitud de objecion de suelo',
    body:'LOREM IPSUM, DOLOR AMET LOREM IPSUM,DOLOR AMET LOREM IPSUM,DOLOR AMET,DOLOR AMET LOREM IPSUM,DOLOR AMET,DOLOR AMET LOREM IPSUM,DOLOR AMET,DOLOR AMET LOREM IPSUM,DOLOR AMET',
    action: () => console.log('action 1 pressed'),
    isRecent:true
  },
  {
    id:2,
    title:'Solicitud de prueba ABC',
    body:'LOREM IPSUM, DOLOR AMET LOREM IPSUM,DOLOR AMET LOREM IPSUM,DOLOR AMET,DOLOR AMET LOREM IPSUM,DOLOR AMET,DOLOR AMET LOREM IPSUM,DOLOR AMET,DOLOR AMET LOREM IPSUM,DOLOR AMET',
    action: () => console.log('action 2 pressed'),
    isRecent:true
  },
  {
    id:3,
    title:'Guías Turísticos',
    body:'LOREM IPSUM, DOLOR AMET LOREM IPSUM,DOLOR AMET LOREM IPSUM,DOLOR AMET,DOLOR AMET LOREM IPSUM,DOLOR AMET,DOLOR AMET LOREM IPSUM,DOLOR AMET,DOLOR AMET LOREM IPSUM,DOLOR AMET',
    action: () => console.log('action 3 pressed'),
    isRecent:false
  },
]

export const getRecentNotificationsLenght = () => {
return MockupNotifications.filter((item) => item.isRecent == true).length;
}