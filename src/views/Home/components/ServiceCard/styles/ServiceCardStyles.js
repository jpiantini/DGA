import { styled } from '@mui/system';
import { Button, List, ListItem } from '@mui/material';
import COLORS from '../../../../../theme/Colors';
import { boxShadowConfig } from '../../../../../theme/Styles';
import FONTS_FAMILY from '../../../../../theme/FontsFamily';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    textAlign: 'center',
    justifyContent:'center',
    width: '100%',
    height: '300px',
    boxShadow: boxShadowConfig,
});

export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'85%',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:'center',
});

export const Title = styled('h1')({
    fontFamily: FONTS_FAMILY.bold.title,
    width: '100%',
    fontSize: '30px',
    fontWeight:'bold',
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
    fontFamily: FONTS_FAMILY.regular.body,
    fontSize: '13px',
    color: COLORS.secondary,
    marginTop:'20px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});




