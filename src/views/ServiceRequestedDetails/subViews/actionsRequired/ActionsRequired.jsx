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
import { FileFormSchema, InformationFormSchema, MockupDocuments } from './ActionsRequiredConstants';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import TextField from '../../../../components/TextField/TextField';
import { useQueryClient, useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { assingDocumentsForRequiredActionInSoftExpert, sendRequiredAction } from '../../../../api/ActionRequired';
import { useFormik } from 'formik';
import { HideGlobalLoading, ShowGlobalLoading } from '../../../../redux/actions/UiActions';
import { linkingDocumentsToRequestInSoftExperted, uploadFormDocuments } from '../../../../api/RequestService';

function ActionsRequired() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { requestID } = useParams();
    const dispatch = useDispatch();
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();

    const cleanRequestID = requestID.replace('payment', '');

    const requestData = queryClient.getQueryData(['serviceRequestedDetail', cleanRequestID]);
    const userData = queryClient.getQueryData(['userData']);

    const actionRequiredMutation = useMutation(sendRequiredAction, {
        onMutate: (req) => {
            dispatch(ShowGlobalLoading('Cargando'));
        }
    });
    const actionRequiredFileMutation = useMutation(assingDocumentsForRequiredActionInSoftExpert, {
        onMutate: (req) => {
            dispatch(ShowGlobalLoading('Cargando'));
        }
    });

    const textFormik = useFormik({
        initialValues: {
            information: ''
        },
        validationSchema: InformationFormSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        const reqData = {
            entityAttributeId: 'response',
            entityAttributeValue: values.information,
            requestId: requestData.request.id,
        }
        actionRequiredMutation.mutate(reqData, {
            onSuccess: () => {
                enqueueSnackbar("Información requerida enviada satisfactoriamente", { variant: "success" })
                queryClient.invalidateQueries(['serviceRequestedDetail', cleanRequestID])
            },
            onError: () => {
                enqueueSnackbar("Ha ocurrido un error, contacte a soporte", { variant: "error" })
            },
            onSettled: () => {
                dispatch(HideGlobalLoading());
            }
        })
    }

    const fileFormik = useFormik({
        initialValues: {
            file: null
        },
        validationSchema: FileFormSchema,
        onSubmit: (values) => {
            handleSubmitFile(values);
        },
    });

    const handleSubmitFile = async (values) => {
        if (values.file?.isARoute) {
            const softExpertRequest = {
                documents: [
                    {
                        ...values.file,
                        label: "Documento de accion requerida"
                    }
                ],
                title: `documento-${userData.payload.citizen_id}`,
                record_id: requestData.request.code,
                attribute: `NumeroSolicitud=${requestData.request.code};DocumentoIdentidadSolicitante=${userData.payload.citizen_id};TipoDocumentoPortal=Adjunto`,
                process_id: requestData.request.service.process_id,
                acronym: "DPPDE", //requestData.request.service.institution.acronym,
                names: [
                    "Documento de accion requerida"
                ],
                activity_id: requestData.request.activity.activity_id
            }
            dispatch(ShowGlobalLoading('Procesando'));
            let responseSoftExpert = await linkingDocumentsToRequestInSoftExperted(softExpertRequest);
            if (responseSoftExpert.success) {
                const assignmentData = {
                    documents: softExpertRequest.documents,
                    record_id: requestData.request.code,
                    status: true
                }
                actionRequiredFileMutation.mutate(assignmentData, {
                    onSuccess: () => {
                        enqueueSnackbar("Documento requerido enviada satisfactoriamente", { variant: "success" })
                        queryClient.invalidateQueries(['serviceRequestedDetail', cleanRequestID])
                    },
                    onError: () => {
                        enqueueSnackbar("Ha ocurrido un error, contacte a soporte", { variant: "error" })
                    },
                    onSettled: () => {
                        dispatch(HideGlobalLoading());
                    }
                })
            } else {
                dispatch(HideGlobalLoading());
                enqueueSnackbar("Ha ocurrido un error, contacte a soporte", { variant: "error" })
            }

        } else {
            const formFileData = new FormData();
            formFileData.append(
                "file[]",
                values.file,
                values.file.name
            );
            dispatch(ShowGlobalLoading('Subiendo documentos'));
            let responseFilesUpload = await uploadFormDocuments(formFileData);
            if (responseFilesUpload.success) {
                const softExpertRequest = {
                    documents: [
                        {
                            ...responseFilesUpload.files[0],
                            label: "Documento de accion requerida"
                        }
                    ],
                    title: `documento-${userData.payload.citizen_id}`,
                    record_id: requestData.request.code,
                    attribute: `NumeroSolicitud=${requestData.request.code};DocumentoIdentidadSolicitante=${userData.payload.citizen_id};TipoDocumentoPortal=Adjunto`,
                    process_id: requestData.request.service.process_id,
                    acronym: "DPPDE", //requestData.request.service.institution.acronym,
                    names: [
                        "Documento de accion requerida"
                    ],
                    activity_id: requestData.request.activity.activity_id
                }
                dispatch(ShowGlobalLoading('Procesando'));
                let responseSoftExpert = await linkingDocumentsToRequestInSoftExperted(softExpertRequest);
                if (responseSoftExpert.success) {
                    const assignmentData = {
                        documents: softExpertRequest.documents,
                        record_id: requestData.request.code,
                        status: true
                    }
                    actionRequiredFileMutation.mutate(assignmentData, {
                        onSuccess: () => {
                            enqueueSnackbar("Documento requerido enviada satisfactoriamente", { variant: "success" })
                            queryClient.invalidateQueries(['serviceRequestedDetail', cleanRequestID])
                        },
                        onError: () => {
                            enqueueSnackbar("Ha ocurrido un error, contacte a soporte", { variant: "error" })
                        },
                        onSettled: () => {
                            dispatch(HideGlobalLoading());
                        }
                    })
                } else {
                    dispatch(HideGlobalLoading());
                    enqueueSnackbar("Ha ocurrido un error, contacte a soporte", { variant: "error" })
                }
            } else {
                dispatch(HideGlobalLoading());
                enqueueSnackbar("Ha ocurrido un error, contacte a soporte", { variant: "error" })
            }
        }
    }

    return (
        <Container >
            {
                requestData.request.request_actions_id == 3 ?
                    <Fragment>
                        <TextInformation title="Información requerida" />
                        <SmallHeightDivider />
                        <TextField id="information" title="Información"
                            value={textFormik.values.information}
                            onChange={textFormik.handleChange}
                            onBlur={textFormik.handleBlur}
                            error={textFormik.touched.information && Boolean(textFormik.errors.information)}
                            helperText={textFormik.touched.information && textFormik.errors.information}
                            multiline
                            maxLength={255}
                            required
                        />
                        <SmallHeightDivider />
                        <ButtonContainer>
                            <StyledButtonOutlined onClick={() => textFormik.handleSubmit()} variant="outlined">ENVIAR</StyledButtonOutlined>
                        </ButtonContainer>
                    </Fragment>
                    :
                    requestData.request.request_actions_id == 1 ?
                        <Fragment>
                            <TextInformation title="Documento requerido" />
                            <SmallHeightDivider />
                            <UploadFile id="file" title="Documento"
                                onChange={fileFormik.handleChange}
                                onBlur={fileFormik.handleBlur}
                                error={fileFormik.touched.file && Boolean(fileFormik.errors.file)}
                                helperText={fileFormik.touched.file && fileFormik.errors.file}
                                required
                                findDocuments
                            />
                            <SmallHeightDivider />
                            <ButtonContainer>
                                <StyledButtonOutlined onClick={() => fileFormik.handleSubmit()} variant="outlined">ENVIAR</StyledButtonOutlined>
                            </ButtonContainer>
                        </Fragment>
                        : null
            }
        </Container>
    );
}

export default ActionsRequired;
