const COLORS = {
  primary: "#008cca",
  primaryOpacity: (color) => { return `rgba(237, 95, 48,${color || 0.50})` },  
  secondary: "#002e62",
  secondaryOpacity: (color) => { return `rgba(32, 42, 93,${color || 0.50})` },
  tertiary: "#7db901",
  tertiaryOpacity: (color) => { return `rgba(0, 99, 188,${color || 0.50})` },

  notificationSuccess:'#cee6d6',
  notificationWarning:'#ece6bb',
  notificationError:'#ff657a',
  notificationComplete:'#ADD8E6', 
  notificationCompleteDark:'#3a9fbf',
  //basics colors
  red: "red",
  error: "#c95159",
  success: "#00a000",
  warning:"#ffff00",
  white: '#ffffff',
  whiteOpacity: 'rgba(255, 255, 255,0.65)',
  snow: '#f2f6ff',
  black: '#231f20',
  gray: "#58595b",
  grayPlaceholder: '#A9A9AC',
  lightGray: "#DCDCDC",
  fieldGray: "#E6EAEE",
}

export default COLORS
