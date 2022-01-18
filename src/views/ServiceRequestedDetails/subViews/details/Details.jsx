import { useState, useLayoutEffect, Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import {

    MediumHeightDivider,
    SmallHeightDivider,
    CardBodyText,
    CardContainer,
    CardTextContainer,
    CardBodyTitle,
    BodyTextBold,
    BodyText
} from '../../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Container,
} from '../../styles/ServiceRequestedDetailsStyles';
import { Grid } from '@mui/material';
import DocumentsOfRequestsCard from '../../../../components/DocumentsOfRequestsCard/DocumentsOfRequestsCard';
import { MockupDocuments } from './DetailsConstants';


function Details() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID, requestID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);


    return (
        <Container >
            <TextInformation title="Detalles de Solicitud" />
            <SmallHeightDivider />
            <SmallHeightDivider />
            <Grid alignItems="center" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                        Fecha:
                    </BodyTextBold>
                    <BodyText>
                        24/12/2021
                    </BodyText>
                </Grid>

                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                        Numero de solicitud:
                    </BodyTextBold>
                    <BodyText>
                        02355666687
                    </BodyText>
                </Grid>

                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                        Empresa:
                    </BodyTextBold>
                    <BodyText>
                        Construcciones K
                    </BodyText>
                </Grid>

                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                        Costo del servicio:
                    </BodyTextBold>
                    <BodyText>
                        DOP$2,500.00
                    </BodyText>
                </Grid>

                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                        Proyecto:
                    </BodyTextBold>
                    <BodyText>
                        Construcciones K
                    </BodyText>
                </Grid>

                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                    Monto de Inversión:
                    </BodyTextBold>
                    <BodyText>
                    Clasificación provisional
                    </BodyText>
                </Grid>

                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                    Solicitado por:
                    </BodyTextBold>
                    <BodyText>
                    Construcciones K
                    </BodyText>
                </Grid>

                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                    Estatus:
                    </BodyTextBold>
                    <BodyText>
                    En proceso
                    </BodyText>
                </Grid>

            </Grid>
            <SmallHeightDivider />
            <SmallHeightDivider />
            <TextInformation title="Documentos subidos" />
            <SmallHeightDivider />
            <DocumentsOfRequestsCard data={MockupDocuments.data}/>
            {
                //pending copy myDesk subview documentPersonald or documentInstitutional
            }


        </Container>
    );
}

export default Details;
