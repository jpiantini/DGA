import { useState, useLayoutEffect, Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import {
    SmallHeightDivider,
    StyledButtonOutlined,
    MediumHeightDivider,
    BodyTextBold,
    CardContainer,
    CardTextContainer,
    CardBodyTitle,
    CardBodyText
} from '../../../../theme/Styles';
import { claimsOptions, FormSchema } from './ComplaintsAndClaimsConstants';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    ButtonContainer,
    Container,
} from '../../styles/ServiceRequestedDetailsStyles';
import Select from '../../../../components/Select/Select';
import TextField from '../../../../components/TextField/TextField';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import FormModal from '../../../../components/FormModal/FormModal';
import { useFormik } from 'formik';
import { Grid } from '@mui/material';


function ComplaintsAndClaims() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID, requestID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [claimModalVisible, setClaimModalVisible] = useState(false);

    const [claims, setClaims] = useState([]);

    const handleClaimModalVisibility = () => {
        setClaimModalVisible(!claimModalVisible);
    }

    const handleRegisterClaim = (claim) => {
        alert('reclamacion creada');
        handleClaimModalVisibility();
        setClaims(prev => [...prev, claim]); // IS FOR MOCKUP BUT ALL CLAIMS RECHARGED WHEN ANOTHER NEW CLAIM IS REGISTERED
        Object.keys(formik.values).map((key) => {
            formik.setFieldValue(key, '', false);
        })
    }

    const formik = useFormik({
        initialValues: {
            reason: '',
            message: '',
        },
        validationSchema: FormSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            handleRegisterClaim(values);
       //     console.log(claims)
        },
    });


    return (
        <Container >

            <FormModal open={claimModalVisible} onClose={handleClaimModalVisibility} title="Nueva reclamación">
                <SmallHeightDivider />
                <Select id="reason" title="Seleccione el motivo de la queja"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.reason && Boolean(formik.errors.reason)}
                    helperText={formik.touched.reason && formik.errors.reason}
                    required
                    data={claimsOptions} //IS FOR MOCKUP
                />
                <SmallHeightDivider />
                <TextField id="message" title="Observaciones"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                    multiline
                    required
                />
                <SmallHeightDivider />
                <UploadFile id="file" title="Adjuntar archivo o captura de pantalla"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.file && Boolean(formik.errors.file)}
                    helperText={formik.touched.file && formik.errors.file}
                />
                <SmallHeightDivider />
                <ButtonContainer>
                    <StyledButtonOutlined onClick={formik.handleSubmit} variant="outlined">ENVIAR</StyledButtonOutlined>
                </ButtonContainer>
                <SmallHeightDivider />
                <SmallHeightDivider />
            </FormModal>
            <TextInformation title="Reclamaciones" />
            <SmallHeightDivider />

            {
                claims.length > 0 ?
                    claims.map((claim, index) => (
                        <Fragment>
                        <CardContainer>
                            <CardTextContainer>
                                <Grid alignItems="flex-start" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                                    <Grid item xs={6} sm={4} md={6}>
                                        <CardBodyTitle>
                                            Reclamacion no.
                                        </CardBodyTitle>
                                        <CardBodyText>
                                           #99955454
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={6}>
                                    <CardBodyTitle>
                                           Queja
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {claimsOptions.find((option) => option.value == claim.reason)?.label}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={6}>
                                    <CardBodyTitle>
                                            Fecha de pago
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            24/12/2021
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={6}>
                                    <CardBodyTitle>
                                            Estado
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            En proceso
                                        </CardBodyText>
                                    </Grid>

                                </Grid>
                            </CardTextContainer>
                        </CardContainer>
                        <SmallHeightDivider />
                    </Fragment>
                    ))
                    :
                    <BodyTextBold>No hay reclamaciones en esta solicitud</BodyTextBold>
            }

            <MediumHeightDivider />
            <ButtonContainer>
                <StyledButtonOutlined onClick={handleClaimModalVisibility} variant="outlined">NUEVA RECLAMACIÓN</StyledButtonOutlined>
            </ButtonContainer>

        </Container >
    );
}

export default ComplaintsAndClaims;
