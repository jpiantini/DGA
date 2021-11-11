import { styled } from '@mui/system';
import { Button, List, ListItem } from '@mui/material';
import COLORS from '../../../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    textAlign: 'center',
    justifyContent:'center',
    width: '300px',
    height: '300px',
    margin: "0 10px",
    boxShadow: '0 8px 10px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)',
});

export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'85%',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:'center',
});

export const Title = styled('p')({
    fontFamily: 'Source Sans Pro',
    width: '100%',
    fontSize: '25px',
    fontWeight:'700',
    color: COLORS.secondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});

export const Separator = styled('div')({
    width: '80%',
    height: '1px',
    backgroundColor: COLORS.secondary,
});

export const BodyText = styled('p')({
    fontFamily: 'Source Sans Pro',
    fontSize: '13px',
    color: COLORS.secondary,
    marginTop:'20px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});

//DEJE DE USARLO PARA USAR EL BOTON OUTLINED QUE SE USARA EN TODA LA APP
export const ServiceButton = styled(Button)({
    marginTop:'20px',
    height:'35px',
    color: COLORS.secondary,
    borderRadius: 0,
    borderColor:COLORS.secondary,
    '&:hover,&:focus,&:active': {
        borderColor: COLORS.primary,
        color: COLORS.primary,
    }
});





