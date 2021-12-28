import { styled } from '@mui/system';


export const LayoutContainer = styled('div')({
    display:'flex',
    flexDirection:'column',
    width:'100%',
    minHeight:'100vh',
    justifyContent:'space-between'
})

export const LayoutBodyContainer = styled('div')({
    width:'85%',
    alignSelf:'center'
})

export const LayoutDivider = styled('div')({
    height:'35px',
    '@media(max-width:768px)':{
        height:'50px',
    }
})

export const LayoutBodyDivider = styled('div')({
        height:'70px',
        '@media(max-width:768px)':{
            height:'50px',
        }
})

export const LayoutFooterDivider = styled('div')({
    height:'20px',
})