import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors';
import WarningIcon from '@mui/icons-material/Warning';
import { boxShadowConfig } from '../../../../../theme/Styles';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    width: '100%',
    boxShadow: boxShadowConfig,
    padding:'1%'
});

export const Title = styled('h1')({
    margin: 0,
    color: COLORS.secondary,
    fontFamily: 'Fira Sans',
    marginBottom:'5px',
    '@media (min-width:320px)': {
        fontSize: '13px',
    },
    '@media (min-width:768px)': {
        fontSize: '17px',
    },
    '@media (min-width:1200px)': {
        fontSize: '18px',
    }
});

export const SubTitle = styled('p')({
    margin: 0,
    color: COLORS.secondary,
    fontFamily: 'Nunito Sans',
    '@media (min-width:320px)': {
        fontSize: '13px',
    },
    '@media (min-width:768px)': {
        fontSize: '17px',
    },
    '@media (min-width:1200px)': {
        fontSize: '15px',
    }
});
