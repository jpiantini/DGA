import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors';
import DescriptionIcon from '@mui/icons-material/Description';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    width: '100%',
    boxShadow: '1px 2px 22px 2px rgba(0,0,0,0.31)',
});

export const ContentContainer = styled('div')({
    position:'relative',
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
});

export const RowContainer = styled('div')({
    padding: 0,
    position:'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
});

export const Column = styled('div')({
    position:'relative',
    display: 'flex',
    flexDirection: 'column',
    textAlign:'start',
    alignItems:'flex-start',
    alignSelf:'center'
});

export const Title = styled('h1')({
    margin: 0,
    color: COLORS.secondary,
    fontFamily: 'Source Sans Pro',
    textAlign:'start',
    '@media (min-width:320px)': {
        fontSize: '13px',
    },
    '@media (min-width:768px)': {
        fontSize: '17px',
    },
    '@media (min-width:1200px)': {
        fontSize: '35px',
    }
});


export const BodyText = styled('p')({
    margin: 0,
    marginTop:'1%',
    color: COLORS.black,
    fontFamily: 'Nunito Sans',
    textAlign:'start',
    '@media (min-width:320px)': {
        fontSize: '10px',
    },
    '@media (min-width:768px)': {
        fontSize: '13px',
    },
    '@media (min-width:1200px)': {
        fontSize: '15px',
    }
});

export const LineDivider = styled('div')({
    width: '100%',
    display: 'flex',
    height:'1px',
    marginTop:'10px',
    backgroundColor:COLORS.grayPlaceholder
});


export const StyledDescriptionIcon = styled(DescriptionIcon)({
    color: COLORS.tertiary,
    '@media (min-width:320px)': {
        fontSize: '18x',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
});
