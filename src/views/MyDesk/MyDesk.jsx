import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SmallHeightDivider } from '../../theme/Styles';
import { Row, RowBodyDivider } from '../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import {
    Container,
    MetricsContainer,
    MetricsContentDivider,
    MetricsTextContainer,
    MetricsTitle,
    MetricsValue
} from './styles/MyDeskStyles';
import DeskNotification from './components/DeskNotification/DeskNotification';

function MyDesk() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(UpdateAppSubHeaderTitle('Mi escritorio')) //SET SUBHEADER TITLE
    }, []);

    return (
        <Container >
            <Row>
                {
                    matchesWidth &&
                    <Fragment>
                        <ServiceDirectoryMenu />
                        <RowBodyDivider />
                    </Fragment>
                }

                <Container style={{}}>
                    <DeskNotification />
                    <SmallHeightDivider />
                    <DeskNotification variant="warning" />
                    <SmallHeightDivider />
                    <DeskNotification variant="error" />
                    <SmallHeightDivider />
                    <SmallHeightDivider />

                    <MetricsContainer>
                        <MetricsTextContainer>
                            <MetricsTitle>Solicitudes en proceso</MetricsTitle>
                            <MetricsValue>01</MetricsValue>
                        </MetricsTextContainer>
                        <MetricsContentDivider />
                        <MetricsTextContainer>
                            <MetricsTitle>Solicitudes completadas</MetricsTitle>
                            <MetricsValue>02</MetricsValue>
                        </MetricsTextContainer>
                        <MetricsContentDivider />
                        <MetricsTextContainer>
                            <MetricsTitle>Documentos subidos</MetricsTitle>
                            <MetricsValue>06</MetricsValue>
                        </MetricsTextContainer>
                        <MetricsContentDivider />
                        <MetricsTextContainer>
                            <MetricsTitle>Solicitudes rechazadas</MetricsTitle>
                            <MetricsValue>01</MetricsValue>
                        </MetricsTextContainer>
                    </MetricsContainer>


                    <SmallHeightDivider />
                    <TextInformation title="Solicitudes en proceso" />
                </Container>
            </Row>

        </Container>
    );
}

export default MyDesk;
