import { useState, useLayoutEffect, Fragment, useEffect } from 'react';
import Collapsable from '../../components/Collapsable/Collapsable';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import { BodyText, Row, SmallHeightDivider, RowBodyDivider, StyledButtonOutlined, MediumHeightDivider } from '../../theme/Styles';
import { FAQDATA, mockupServiceInformation } from './ServiceDescriptionConstants';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginOrRegisterModal from '../../components/LoginOrRegisterModal/LoginOrRegisterModal';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { HideGlobalLoading, ShowGlobalLoading, UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    ButtonContainer,
    Container,
    TextListContainer,
    TextOrderedListContainer,
} from './styles/ServiceDescriptionStyles';
import { useQuery } from 'react-query';
import { getServiceDescription } from '../../api/ServiceDescription';

function ServiceDescription() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [loginOrRegisterModalStatus, setLoginOrRegisterModalStatus] = useState(false);

    const { data: serviceDescription, isLoading } = useQuery(['serviceDescription', serviceID], async () => {
        dispatch(ShowGlobalLoading("Cargando"));
        const response = await getServiceDescription(serviceID);
        dispatch(HideGlobalLoading());
        return response;
    })

    const handleServiceRequest = (serviceID) => {
        if (authenticated) {
            history.push(`/app/requestService/${serviceID}`)
        } else {
            setLoginOrRegisterModalStatus(!loginOrRegisterModalStatus);
        }
    }

    useLayoutEffect(() => {
        if (serviceDescription?.success == false) {
            //SERVICE DONT EXIST REDIRECT TO PUBLIC
            history.push('/public')
        }
        if (serviceDescription != undefined) {
            //UPDATE APP HEADER SUBTITLE
            dispatch(UpdateAppSubHeaderTitle(serviceDescription.name))
        }

    }, [serviceDescription]);

    /*useEffect(() => {
        refetch();
    }, [serviceID]);
*/
    if (isLoading) return null;

    return (
        <Container >
            <LoginOrRegisterModal open={loginOrRegisterModalStatus} onBackDropClick={() => setLoginOrRegisterModalStatus(false)} onCloseClick={() => setLoginOrRegisterModalStatus(false)} />
            <Row>
                <ServiceDirectoryMenu />
                <RowBodyDivider />
                <Container style={{ width: '100%' }}>
                    <TextInformation title="Información general"
                        content={serviceDescription?.description}
                    />
                    <BodyText>
                        Costo del servicio: &nbsp;
                        <strong>
                            {serviceDescription?.prices[0].variations[0].price}$
                        </strong>
                    </BodyText>
                    <SmallHeightDivider />
                    <SmallHeightDivider />
                    <TextInformation title="Requisitos" />
                    <SmallHeightDivider />

                    <TextListContainer>
                        {
                            serviceDescription.requirements.map((requeriment, index) => (
                                <li key={index} style={{ marginTop: '5px' }}>
                                    <BodyText>
                                        {requeriment.name}
                                    </BodyText>
                                </li>
                            ))
                        }
                    </TextListContainer>
                    <SmallHeightDivider />
                    <SmallHeightDivider />

                    <TextInformation title="Procedimientos" />
                    <SmallHeightDivider />
                    <TextOrderedListContainer>
                        {
                            serviceDescription.procedures.map((requeriment, index) => (
                                <li key={index} style={{ marginTop: '5px' }}>
                                    <BodyText>
                                        {requeriment.step}
                                    </BodyText>
                                </li>
                            ))
                        }
                    </TextOrderedListContainer>

                    <ButtonContainer>
                        <StyledButtonOutlined variant="outlined" onClick={() => handleServiceRequest(serviceDescription.id)}>INICIAR SOLICITUD</StyledButtonOutlined>
                    </ButtonContainer>
                    <SmallHeightDivider />
                    <SmallHeightDivider />

                    {/*
                        matchesWidth &&
                        <Fragment>
                            <TextInformation title="Preguntas Frecuentes" />
                            <SmallHeightDivider />

                            {
                                FAQDATA.map((item) => (
                                    <div key={item.id}>
                                        <Collapsable title={item.question} content={item.answer} />
                                        <SmallHeightDivider />
                                    </div>
                                ))
                            }
                        </Fragment>

                        */}
                </Container>
            </Row>
            <MediumHeightDivider />
        </Container>
    );
}

export default ServiceDescription;
