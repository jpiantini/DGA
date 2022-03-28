import { useState, useLayoutEffect, Fragment, useRef, useCallback } from 'react';
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
    CardPriceTitle,
    ButtonContainer,
    Container,
    PriceContainer,
    TextListContainer,
    TextOrderedListContainer,
    CardPriceGray,
    StyledFacebookIcon,
    StyledTwitterIcon,
    StyledEmailIcon,
    StyledPrintIcon,
    TopContainer,
    TopItemContainer,
    StyledFab,
    VariationsContainer
} from './styles/ServiceDescriptionStyles';
import { useQuery } from 'react-query';
import { getServiceDescription } from '../../api/ServiceDescription';
import { Box, Grid, Rating } from '@mui/material';
import { hourIn24To12hours, priceVariationToLaborableTime } from '../../utilities/functions/FormatterUtil';
import IconButton from '@mui/material/IconButton';
import { useReactToPrint } from "react-to-print";
import CenterLoading from '../../components/CenterLoading/CenterLoading';

function ServiceDescription() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);
    const componentToPrintRef = useRef(null);

    const [loginOrRegisterModalStatus, setLoginOrRegisterModalStatus] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);

    const { data: serviceDescription, isLoading } = useQuery(['serviceDescription', serviceID], async () => {
        try {
            dispatch(ShowGlobalLoading("Cargando"));
            const response = await getServiceDescription(serviceID);
            dispatch(HideGlobalLoading());
            return response;
        } catch (error) {
            history.push('/public');
            dispatch(HideGlobalLoading());
        }

    })

    const handleServiceRequest = (serviceID) => {
        if (authenticated) {
            history.push(`/app/requestService/${serviceID}`)
        } else {
            setLoginOrRegisterModalStatus(!loginOrRegisterModalStatus);
        }
    }

    const reactToPrintContent = useCallback(() => {
        return componentToPrintRef.current;
    }, [componentToPrintRef.current]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: serviceDescription?.name,
        pageStyle: "width:400px",
        onBeforeGetContent: () => setIsPrinting(true),
       // onBeforePrint: () => setIsPrinting(true),
        onAfterPrint: () => setIsPrinting(false),
        removeAfterPrint: true
    });

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

    if (isLoading) return <CenterLoading/>;

    return (
        <Container >
            <LoginOrRegisterModal open={loginOrRegisterModalStatus} onBackDropClick={() => setLoginOrRegisterModalStatus(false)} onCloseClick={() => setLoginOrRegisterModalStatus(false)} />
            <Row>
                {
                    matchesWidth &&
                    <Fragment>
                        <ServiceDirectoryMenu />
                        <RowBodyDivider />
                    </Fragment>
                }
                <Container ref={componentToPrintRef} style={{ width: '100%' }}>

                    <TopContainer>

                        <TopItemContainer>
                            <strong>
                                <BodyText>Rating</BodyText>
                            </strong>
                            <Rating
                                value={serviceDescription?.rating}
                                precision={0.5}
                                readOnly
                                size="large"
                            />
                        </TopItemContainer>

                        <TopItemContainer>
                            <strong>
                                <BodyText>Imprimir</BodyText>
                            </strong>
                            <IconButton onClick={handlePrint}>
                                <StyledPrintIcon />
                            </IconButton>
                        </TopItemContainer>

                        <TopItemContainer>
                            <strong>
                                <BodyText>Compartir</BodyText>
                            </strong>
                            <Row>
                                <IconButton onClick={() => window.open(`http://www.facebook.com/sharer.php?u=${window.location.href}`, 'name', 'width=600,height=400')}>
                                    <StyledFacebookIcon />
                                </IconButton>


                                <IconButton onClick={() => window.open(`https://twitter.com/share?text=Ahora es mas facil solicitar servicios con el Portal de servicios de MITUR😁&url=${window.location.href}&hashtags=MinisterioDeTurismo,Mitur`, 'name', 'width=600,height=400')}>
                                    <StyledTwitterIcon />
                                </IconButton>

                                <IconButton onClick={() => window.open(`mailto:?subject=Ahora es mas facil solicitar servicios con el Portal de servicios de MITUR😁&body=${window.location.href}`)}>
                                    <StyledEmailIcon />
                                </IconButton>

                            </Row>
                        </TopItemContainer>
                    </TopContainer>

                    <TextInformation title="Información general"
                        content={serviceDescription?.description}
                    />

                    <SmallHeightDivider />
                    <SmallHeightDivider />

                    <TextInformation title="Horario de prestación de servicio" content={
                        "Las solicitudes podrán ser realizadas 24hrs los 7 días de la semana, pero estas serán trabajadas por la institución en horario laborable."
                    } />
                    <SmallHeightDivider />

                    <Row style={{ justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <strong>
                                <CardPriceGray>
                                    Día
                                </CardPriceGray>
                            </strong>
                            <br />
                            {serviceDescription?.schedules.map((schedule, index) => (
                                <strong>
                                    <BodyText>
                                        {schedule.day}
                                    </BodyText>
                                </strong>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <strong>
                                <CardPriceGray>
                                    Desde
                                </CardPriceGray>
                            </strong>
                            <br />
                            {serviceDescription?.schedules.map((schedule, index) => (
                                <strong>
                                    <BodyText>
                                        {hourIn24To12hours(schedule.init)}
                                    </BodyText>
                                </strong>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <strong>
                                <CardPriceGray>
                                    Hasta
                                </CardPriceGray>
                            </strong>
                            <br />
                            {serviceDescription?.schedules.map((schedule, index) => (
                                <strong>
                                    <BodyText>
                                        {hourIn24To12hours(schedule.finit)}
                                    </BodyText>
                                </strong>
                            ))}
                        </div>
                    </Row>


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

                    <SmallHeightDivider />
                    <SmallHeightDivider />

                    <TextInformation title="Tarifa del servicio" />
                    <SmallHeightDivider />

                    <Grid alignItems="center" container direction="row" justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {serviceDescription?.prices.map((price, index) => (
                            <Grid item xs={4} sm={8} md={12} key={index}>
                                <PriceContainer>
                                    <strong>
                                        <CardPriceTitle>
                                            {price.concept}
                                        </CardPriceTitle>
                                    </strong>
                                    <CardPriceTitle>
                                        {price.description}
                                    </CardPriceTitle>
                                    <SmallHeightDivider />
                                    <VariationsContainer>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <strong>
                                                <CardPriceGray>
                                                    Variaciones de la tarifa
                                                </CardPriceGray>
                                            </strong>
                                            <br />
                                            {price.variations.map((variation) => (
                                                <strong>
                                                    <BodyText>
                                                        {variation.concept}
                                                    </BodyText>
                                                </strong>
                                            ))}
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <strong>
                                                <CardPriceGray>
                                                    Tiempo de entrega
                                                </CardPriceGray>
                                            </strong>
                                            <br />
                                            {price.variations.map((variation) => (
                                                <strong>
                                                    <BodyText>
                                                        {priceVariationToLaborableTime(variation.delivery_time)}
                                                    </BodyText>
                                                </strong>
                                            ))}
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <strong>
                                                <CardPriceGray>
                                                    Tarifa
                                                </CardPriceGray>
                                            </strong>
                                            <br />
                                            {price.variations.map((variations) => (
                                                <strong>
                                                    <BodyText>
                                                        DOP{
                                                            Intl.NumberFormat('en-US',
                                                                { style: 'currency', currency: 'USD' }
                                                            ).format(variations.price)
                                                        }
                                                    </BodyText>
                                                </strong>
                                            ))}
                                        </div>
                                    </VariationsContainer>
                                </PriceContainer>
                            </Grid>
                        ))}
                    </Grid>
                    <SmallHeightDivider />
                    {
                        /*  <ButtonContainer>
                          <StyledButtonOutlined variant="outlined" onClick={() => handleServiceRequest(serviceDescription.id)}>INICIAR SOLICITUD</StyledButtonOutlined>
                      </ButtonContainer>
                      */
                    }
         
                        <StyledFab  onClick={() => handleServiceRequest(serviceDescription.id)}>
                            INICIAR SOLICITUD
                        </StyledFab>

                </Container>
            </Row>
            <MediumHeightDivider />
        </Container>
    );
}

export default ServiceDescription;
