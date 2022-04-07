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
import { FormSchema } from './ComplaintsAndClaimsConstants';
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
import { getClaimIssues, getRequestClaims, sendClaim } from '../../../../api/ComplaintsAndClaims';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CenterLoading from '../../../../components/CenterLoading/CenterLoading';
import { HideGlobalLoading, ShowGlobalLoading } from '../../../../redux/actions/UiActions';
import { useSnackbar } from 'notistack';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { cacheConfig } from '../../../../cacheConfig';


function ComplaintsAndClaims() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);
    const { enqueueSnackbar } = useSnackbar();
    let { requestID } = useParams();
    const queryClient = useQueryClient()

    const [claimModalVisible, setClaimModalVisible] = useState(false);

    const userData = queryClient.getQueryData('userData');
    const serviceRequestedDetail = queryClient.getQueryData(['serviceRequestedDetail', requestID]);
    const { isLoading: claimsDataIsLoading, data: claimsData } = useQuery(['claimsData', serviceRequestedDetail.request.code], () => getRequestClaims(serviceRequestedDetail.request.code),
        {
            staleTime: cacheConfig.staleTimeForRequestedServiceDetail
        })
    const { isLoading: claimsIssuesIsLoading, data: claimsIssuesData } = useQuery(['claimsIssues'], () => getClaimIssues())
    const mutation = useMutation(sendClaim);

    const handleClaimModalVisibility = () => {
        setClaimModalVisible(!claimModalVisible);
    }

    const formik = useFormik({
        initialValues: {
            reason: '',
            message: '',
        },
        validationSchema: FormSchema,
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleRegisterClaim(values);
        },
    });

    const handleRegisterClaim = (formData) => {
        dispatch(ShowGlobalLoading('Cargando'))
        mutation.mutate({
            issue_id: formData.reason,
            citizen_id: userData.payload.citizen_id,
            service_id: serviceRequestedDetail.request.service_id,
            request_code: serviceRequestedDetail.request.code,
            citizen_name: userData.payload.name,
            description: formData.message
        },
            {
                onSuccess: () => {
                    enqueueSnackbar("Reclamación creada con exito", { variant: 'success' })
                    queryClient.invalidateQueries(['claimsData', serviceRequestedDetail.request.code])
                    handleClaimModalVisibility();
                    formik.resetForm();
                },
                onError: () => {
                    enqueueSnackbar("Ha ocurrido un error", { variant: 'error' })
                },
                onSettled: () => {
                    dispatch(HideGlobalLoading())
                }
            },
        )
    }

    const issuesData = claimsIssuesData?.map((item) => {
        return {
            label: item.content,
            value: item.id
        }
    })

    if (claimsIssuesIsLoading || claimsDataIsLoading) return <CenterLoading />

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
                    data={issuesData}
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
                <ButtonContainer>
                    <StyledButtonOutlined onClick={formik.handleSubmit} variant="outlined">ENVIAR</StyledButtonOutlined>
                </ButtonContainer>
                <SmallHeightDivider />
                <SmallHeightDivider />
            </FormModal>
            <TextInformation title="Reclamaciones" />
            <SmallHeightDivider />

            {
                claimsData.length > 0 ?
                    claimsData.map((claim, index) => (
                        <Fragment>
                            <CardContainer>
                                <CardTextContainer>
                                    <Grid alignItems="flex-start" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                                        <Grid item xs={6} sm={4} md={6}>
                                            <CardBodyTitle>
                                                Reclamación id
                                            </CardBodyTitle>
                                            <CardBodyText>
                                                {claim.id}
                                            </CardBodyText>
                                        </Grid>

                                        <Grid item xs={6} sm={4} md={6}>
                                            <CardBodyTitle>
                                                Queja
                                            </CardBodyTitle>
                                            <CardBodyText>
                                                {issuesData.find((issue) => issue.value === claim.issue_id)?.label}
                                            </CardBodyText>
                                        </Grid>

                                        <Grid item xs={6} sm={4} md={6}>
                                            <CardBodyTitle>
                                                Observación
                                            </CardBodyTitle>
                                            <CardBodyText>
                                                {claim.description}
                                            </CardBodyText>
                                        </Grid>

                                        <Grid item xs={6} sm={4} md={6}>
                                            <CardBodyTitle>
                                                Respuesta
                                            </CardBodyTitle>
                                            <CardBodyText>
                                                {claim.solution}
                                            </CardBodyText>
                                        </Grid>

                                        <Grid item xs={6} sm={4} md={6}>
                                            <CardBodyTitle>
                                                Fecha de creación
                                            </CardBodyTitle>
                                            <CardBodyText>
                                                {format(new Date(claim.created_at.replace(" ", "T")), "dd 'de' MMMM yyyy", { locale: es })}
                                            </CardBodyText>
                                        </Grid>

                                        <Grid item xs={6} sm={4} md={6}>
                                            <CardBodyTitle>
                                                Estado
                                            </CardBodyTitle>
                                            <CardBodyText>
                                                {claim.status}
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
