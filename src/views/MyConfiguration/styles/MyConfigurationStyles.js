import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import Button from '@mui/material/Button';
import { boxShadowConfig } from '../../../theme/Styles';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
});

export const TopContainer = styled('div')({
    position: 'relative',
    display: 'flex',
    minHeight: '200px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (min-width:320px)': {
        flexDirection: 'column',
    },
    '@media (min-width:768px)': {
        flexDirection: 'row',
    },
    '@media (min-width:1200px)': {
        flexDirection: 'row',
    },
});

export const UserDataContainer = styled('div')({
    display: 'flex',
    alignItems:'center',
    '@media (min-width:320px)': {
        flexDirection: 'column',
        width: '100%',

    },
    '@media (min-width:768px)': {
        flexDirection: 'row',
        width: '50%',

    },
    '@media (min-width:1200px)': {
        flexDirection: 'row',
        width: '50%',

    },
});

export const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width:320px)': {
        width: '100%',

    },
    '@media (min-width:768px)': {
        width: '30%',

    },
    '@media (min-width:1200px)': {
        width: '30%',

    },
});



export const ProfileImage = styled('img')({
    '@media (min-width:320px)': {
        width: '100px',
        height: '100%',
        borderRadius: '100%',
        marginTop: '5px',
    },
    '@media (min-width:768px)': {
        width: '125px',
        height: '200px',
        borderRadius: 0,
        marginTop: 0,
    },
    '@media (min-width:1200px)': {
        width: '150px',
        height: '200px',
        borderRadius: 0,
        marginTop: 0,
    },
});


export const Title = styled('h1')({
    fontFamily: FONTS_FAMILY.bold.body,
    textAlign: 'left',
    fontSize:'45px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '@media (min-width:320px)': {
        WebkitLineClamp: 5, /* number of lines to show */
    },
    '@media (min-width:768px)': {
        WebkitLineClamp: 2, /* number of lines to show */
    },
    '@media (min-width:1200px)': {
        WebkitLineClamp: 2, /* number of lines to show */
    },

});

export const ButtonContainer = styled('div')({
    width: '100%'
});

export const ButtonSaveContainer = styled('div')({
    alignSelf:'flex-start',
    '@media (min-width:320px)': {
        width: '100%',
    },
    '@media (min-width:768px)': {
        width: '50%',
    },
    '@media (min-width:1200px)': {
        width: '30%',
    },

});


export const ElementDivider = styled('div')({
    width: '10px'
});

