import { styled } from '@mui/system';
import { Button } from '@mui/material';
import COLORS from './Colors';


export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export const Row = styled('div')({
    display: 'flex',
    flexDirection: 'row',
});

export const StyledButton = styled(Button)({
    height: '35px',
    width: '100%',
    borderRadius: '0',
    color: COLORS.white,
    backgroundColor: COLORS.secondary,
    fontSize: '15px',
    fontFamily: 'Nunito Sans',
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        backgroundColor: COLORS.primary,
    }
});

export const StyledButtonOutlined = styled(Button)({
    height: '35px',
    width: '100%',
    borderColor: COLORS.secondary,
    borderRadius: 0,
    color: COLORS.secondary,
    backgroundColor: COLORS.white,
    fontSize: '15px',
    fontFamily: 'Nunito Sans',
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.secondary,
    }
});

export const BodyText = styled('p')({
    margin: 0,
    textAlign: 'left',
    fontSize: '15px',
    color: COLORS.black,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
});

export const RowBodyDivider = styled('div')({
    width:'7%'
});
export const SmallHeightDivider = styled('div')({
    height:'15px'
});

