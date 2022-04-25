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
import { linkingDocumentsToRequestInSoftExpert, uploadFormDocuments } from '../../../../api/RequestService';
import axios from 'axios';

function ActionsRequired() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { requestID } = useParams();
    const dispatch = useDispatch();
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();


    const requestData = queryClient.getQueryData(['serviceRequestedDetail', requestID]);
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
        let uploadedFilesRoutes = []
        const formFileData = new FormData();
        for (let i = 0; i < values.file.files.length; i++) {
            formFileData.append(
                "file[]",
                values.file.files[i],
                values.file.files[i].name
            );
        }
        dispatch(ShowGlobalLoading('Subiendo documentos'));
        let responseFilesUpload = await uploadFormDocuments(formFileData);
        if (responseFilesUpload.success) {
            uploadedFilesRoutes = [
                ...responseFilesUpload.files.map((item, index) => {
                    return {
                        ...item,
                        label: `Documento de accion requerida ${index + 1}`
                    }
                })
            ]
            let uploadSoftExpertArrayAxios = [];
            for (let i = 0; i < uploadedFilesRoutes.length; i++) {
                const softExpertRequest = {
                    documents: [
                        {
                            ...uploadedFilesRoutes[i],
                        }
                    ],
                    title: `documento-${userData.payload.citizen_id}`,
                    record_id: requestData.request.code,
                    attribute: `NumeroSolicitud=${requestData.request.code};DocumentoIdentidadSolicitante=${userData.payload.citizen_id};TipoDocumentoPortal=Adjunto`,
                    process_id: requestData.request.service.process_id,
                    acronym: requestData.direction.name + "DE",
                    names: [
                        uploadedFilesRoutes[i].label
                    ],
                    activity_id: requestData.request.activity.activity_id,
                    new_request: false
                }
                uploadSoftExpertArrayAxios.push(linkingDocumentsToRequestInSoftExpert(softExpertRequest));
            }
            dispatch(ShowGlobalLoading('Procesando'));
            await axios.all(uploadSoftExpertArrayAxios);
            const assignmentData = {
                documents: uploadedFilesRoutes,
                record_id: requestData.request.code,
                status: true,
            }
            actionRequiredFileMutation.mutate(assignmentData, {
                onSuccess: () => {
                    enqueueSnackbar("Documento requerido enviada satisfactoriamente", { variant: "success" })
                    queryClient.invalidateQueries(['serviceRequestedDetail', requestID]);
                    setTimeout(() => {
                        history.push(`/app/serviceRequestedDetails/${requestID}#documents`)
                        dispatch(HideGlobalLoading());
                    }, 500);
                },
                onError: () => {
                    dispatch(HideGlobalLoading());
                    enqueueSnackbar("Ha ocurrido un error, contacte a soporte", { variant: "error" })
                },
                onSettled: () => {

                }
            })
        } else {
            dispatch(HideGlobalLoading());
            enqueueSnackbar("Ha ocurrido un error, contacte a soporte", { variant: "error" })
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
                    multipleDocuments
                    value={fileFormik.values.file}
                />
                <SmallHeightDivider />
                <ButtonContainer>
                    <StyledButtonOutlined onClick={fileFormik.handleSubmit} variant="outlined">ENVIAR</StyledButtonOutlined>
                </ButtonContainer>
            </Fragment>
        </Container>
    );
}

export default ActionsRequired;
