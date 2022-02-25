import { useState, useLayoutEffect, Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import {
    SmallHeightDivider,
    StyledButtonOutlined
} from '../../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Container,
    ButtonContainer
} from '../../styles/ServiceRequestedDetailsStyles';
import { Grid } from '@mui/material';
import DocumentsOfRequestsCard from '../../../../components/DocumentsOfRequestsCard/DocumentsOfRequestsCard';
import { MockupDocuments } from './ActionsRequiredConstants';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import TextField from '../../../../components/TextField/TextField';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';


function ActionsRequired() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { requestID } = useParams();
    const dispatch = useDispatch();
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();

    const cleanRequestID = requestID.replace('payment','');

    const requestData = queryClient.getQueryData(['serviceRequestedDetail', cleanRequestID]);

    const handleSend = () => {
        if (true /*response.success*/) {
            enqueueSnackbar('Información enviada satisfactoriamente.', { variant: 'success' });
        } else {
            enqueueSnackbar('Ha sucedido error, intentelo mas tarde.', { variant: 'error' });
        }
    }

    return (
        <Container >
            {
                requestData.request.request_actions_id == 3 ?
                    <Fragment>
                        <TextInformation title="Información requerida" />
                        <SmallHeightDivider />
                        <TextField id="info" title="Informacion"
                            //     value={formik.values.message}
                            //    onChange={formik.handleChange}
                            //     onBlur={formik.handleBlur}
                            //     error={formik.touched.message && Boolean(formik.errors.message)}
                            //      helperText={formik.touched.message && formik.errors.message}
                            //      multiline
                            required
                        />
                    </Fragment>

                    :
                    requestData.request.request_actions_id == 1 ?
                        <Fragment>
                            <TextInformation title="Documento requerido" />
                            <SmallHeightDivider />
                            <UploadFile id="file" title="Documento"
                                //  onChange={formik.handleChange}
                                //  onBlur={formik.handleBlur}
                                //  error={formik.touched.file && Boolean(formik.errors.file)}
                                //  helperText={formik.touched.file && formik.errors.file}
                                required
                            />
                        </Fragment>
                        : null
            }
            <SmallHeightDivider />

            <ButtonContainer>
                <StyledButtonOutlined onClick={() => handleSend()} variant="outlined">ENVIAR</StyledButtonOutlined>
            </ButtonContainer>
        </Container>
    );
}

export default ActionsRequired;
