import { useState, useLayoutEffect, Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import {
    SmallHeightDivider,
    StyledButtonOutlined
} from '../../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Container,
    ButtonContainer
} from '../../styles/ServiceRequestedDetailsStyles';
import { FileFormSchema } from './ActionsRequiredConstants';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import { useQueryClient, useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { assingDocumentsForRequiredActionInSoftExpert } from '../../../../api/ActionRequired';
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

    const actionRequiredFileMutation = useMutation(assingDocumentsForRequiredActionInSoftExpert, {
        onMutate: (req) => {
            dispatch(ShowGlobalLoading('Cargando'));
        }
    });

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
        </Container>
    );
}

export default ActionsRequired;
