import React from 'react';

import COLORS from '../../../../theme/Colors';
import {
    ArrowButton,
} from './styles/ServiceArrowsStyles';
import { VisibilityContext } from "react-horizontal-scrolling-menu";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function LeftArrow() {
    const {
        scrollPrev,
    } = React.useContext(VisibilityContext);
    return (
        <ArrowButton onClick={() => scrollPrev()}>
            <ArrowBackIosNewIcon style={{
                fontSize:'100%',
                'outline': '#FFFFFF solid 2px',
                boxShadow: '0 8px 10px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)',
                }}/>
        </ArrowButton>
    );
}

export function RightArrow() {
    const {
        scrollNext,
    } = React.useContext(VisibilityContext);
    return (

        <ArrowButton onClick={() => scrollNext()}>
            <ArrowForwardIosIcon style={{
                fontSize:'100%',
                'outline': '#FFFFFF solid 2px',
                boxShadow: '0 8px 10px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)',
                }}/>
        </ArrowButton>
    );
}

