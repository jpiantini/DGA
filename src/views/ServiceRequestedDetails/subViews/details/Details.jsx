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
import { useQueryClient } from 'react-query';
import { format } from 'date-fns';


function Details() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { requestID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);
    const queryClient = useQueryClient()
    const cleanRequestID = requestID.replace('payment', '');

    const requestData = queryClient.getQueryData(['serviceRequestedDetail', cleanRequestID])

    const documentsData = requestData.request.request_document.map((document) => {
        return {
            name: `${document.name}.${document.extension}`,
            //pending to change
            documentType: document.extension,
            date: format(new Date(document.created_at), 'yyyy-MM-dd'),
            url: document.url,
            type: document.extension

        }
    })

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
                        {new Date(requestData.request.created_at).toLocaleDateString()}
                    </BodyText>
                </Grid>

                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                        Numero de solicitud:
                    </BodyTextBold>
                    <BodyText>
                        {requestData.request.code}
                    </BodyText>
                </Grid>

                {
                    requestData.data.map((item) => (
                        <Grid item xs={6} sm={4} md={4}>
                            <BodyTextBold>
                                {item.label}
                            </BodyTextBold>
                            <BodyText>
                                {item.type === "text" ? item.value : item.type === "checkbox" ? "Si" : item.labelValue}

                            </BodyText>
                        </Grid>
                    ))
                }

                <Grid item xs={6} sm={4} md={4}>
                    <BodyTextBold>
                        Estatus:
                    </BodyTextBold>
                    <BodyText>
                        {requestData.request.status.name}
                    </BodyText>
                </Grid>

            </Grid>

            <SmallHeightDivider />
            <SmallHeightDivider />
            {
                requestData.request.request_document.length > 0 &&
                <div>
                    <TextInformation title="Documentos subidos" />
                    <SmallHeightDivider />
                    <DocumentsOfRequestsCard data={documentsData} />
                </div>
            }



        </Container>
    );
}

export default Details;
