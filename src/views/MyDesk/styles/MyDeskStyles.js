import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import Button from '@mui/material/Button';
import { boxShadowConfig } from '../../../theme/Styles';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
});

export const MetricsTextContainer = styled('div')({
    position: 'relative',
    textAlign: 'center',
    alignItems: 'center',
    width: '24%',
    padding: '2%'
});

export const MetricsTitle = styled('h1')({
    margin: 0,
    fontFamily: FONTS_FAMILY.regular.body,
    color: COLORS.secondary,
    alignSelf: 'center',
    '@media (min-width:320px)': {
        fontSize: '10px',
        height:'30px',
    },
    '@media (min-width:768px)': {
        fontSize: '15px',
        height:'45px',
    },
    '@media (min-width:1200px)': {
        fontSize: '17px',
        height:'45px',
    },
});

export const MetricsValue = styled('h1')({
    margin: 0,
    fontFamily:FONTS_FAMILY.bold.body,
    color: COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '30px',
    },
    '@media (min-width:768px)': {
        fontSize: '50px',
    },
    '@media (min-width:1200px)': {
        fontSize: '70px',
    },

});

export const MetricsContentDivider = styled('div')({
    backgroundColor: COLORS.primary,
    width: '1px',
    height: '60%',
    alignSelf: 'center'
});

export const SectionTitle = styled('h1')({
    marginTop: '3px',
    color: COLORS.secondary,
    fontFamily: FONTS_FAMILY.regular.title,
    textAlign: 'left',
    '@media (min-width:320px)': {
        fontSize: '12px',
    },
    '@media (min-width:768px)': {
        fontSize: '18px',
    },
    '@media (min-width:1200px)': {
        fontSize: '20px',
    },
});

export const SectionTextDivider = styled('h1')({
    width: '5%',
});

export const DocumentsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center'
});


export const ListContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center'
});


