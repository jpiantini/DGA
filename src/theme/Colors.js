const COLORS = {
  primary: "#ed5f30",
  primaryOpacity: (color) => { return `rgba(237, 95, 48,${color || 0.50})` },  
  secondary: "#202a5d",
  secondaryOpacity: (color) => { return `rgba(32, 42, 93,${color || 0.50})` },
  tertiary: "#0063bc",
  tertiaryOpacity: (color) => { return `rgba(0, 99, 188,${color || 0.50})` },



  //basics colors
  red: "red",
  error: "#F74022",
  success: "#30C39E",
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
