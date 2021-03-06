import { styled } from '@mui/system';
import { Button, List, ListItem } from '@mui/material';
import COLORS from '../../../theme/Colors';
import { boxShadowConfig } from '../../../theme/Styles';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    textAlign: 'start',
    justifyContent:'flex-end',
    width: '250px',
    height: '240px',
   // margin: "0 10px",
    '&:hover,&:focus': {
        boxShadow: boxShadowConfig,
    },
    border:` 1px solid ${COLORS.secondary}`,
});

export const RowContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
});

export const Subtitle = styled('p')({
    fontFamily: FONTS_FAMILY.regular.body,
    fontSize: '10px',
    margin: '3px',
    textTransform:'uppercase'
});

export const SpecialSubtitle = styled('p')({
    width: '50%',
    fontFamily: FONTS_FAMILY.regular.body,
    fontSize: '10px',
    margin: '3px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
    textTransform:'uppercase'

});

export const Title = styled('p')({
    fontFamily: FONTS_FAMILY.regular.body,
    fontSize: '13px',
    color: COLORS.secondary,
    margin: '3px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
    textTransform:'uppercase'

});

export const Separator = styled('div')({
    width: '23%',
    height: '4px',
    backgroundColor: COLORS.secondary,
    margin: '3px',
    marginTop: '13px'
});

export const FullSeparator = styled('div')({
    width: '100%',
    alignSelf: 'center',
    height: '3px',
    backgroundColor: COLORS.tertiary,
})

export const BodyText = styled('p')({
    fontFamily: FONTS_FAMILY.regular.body,
    fontSize: '13px',
    color: COLORS.black,
    margin: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});

export const ServiceButton = styled(Button)({
    height:'35px',
    width:'100%',
    color: COLORS.secondary,
    backgroundColor:COLORS.white,
    borderTop:` 1px solid ${COLORS.secondary}`,
    borderRadius:0,
    '&:hover,&:focus,&:active': {
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        borderColor:COLORS.primary
    }
});

export const ServiceSecondaryButton = styled(Button)({
    height:'35px',
    width:'100%',
    color: COLORS.white,
    backgroundColor:COLORS.secondary,
    border:` 1px solid ${COLORS.secondary}`,
    borderRadius:0,
    '&:hover,&:focus,&:active': {
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        borderColor:COLORS.primary
    }
});

export const ButtonsContainer = styled('div')({
    flexDirection: 'column',
    width:'100%',
    overflow: 'hidden',
});




