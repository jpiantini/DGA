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
import { MockupDocuments } from './ActionsRequiredConstants';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import TextField from '../../../../components/TextField/TextField';


function ActionsRequired() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID, requestID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);


    return (
        <Container >
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

            <SmallHeightDivider />
            <TextInformation title="Documento requerido" />
            <SmallHeightDivider />

            <UploadFile id="file" title="Documento"
                //  onChange={formik.handleChange}
                //  onBlur={formik.handleBlur}
                //  error={formik.touched.file && Boolean(formik.errors.file)}
                //  helperText={formik.touched.file && formik.errors.file}
                required
            />


        </Container>
    );
}

export default ActionsRequired;
