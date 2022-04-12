import { Fragment, useState } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import {
    SmallHeightDivider,
    CardBodyText,
    CardContainer,
    CardTextContainer,
    CardBodyTitle,
    StyledButton,
    BodyText
} from '../../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    ButtonContainer,
    Container,
    ImageContainerHeader,
    ImageContainerTitle,
} from '../../styles/ServiceRequestedDetailsStyles';
import { FileFormSchema, MockupPayments } from './PaymentsConstants';
import { Grid } from '@mui/material';
import { ImageContainer, LogoImage } from '../../styles/ServiceRequestedDetailsStyles';
import { useQueryClient } from 'react-query';
import siritLogo from '../../../../assets/images/siritLogo.png'
import transferenciaLogo from '../../../../assets/images/transferenciaLogo.png'
import depositoLogo from '../../../../assets/images/depositoLogo.png'
import FormModal from '../../../../components/FormModal/FormModal';
import UploadFile from '../../../../components/UploadFile/UploadFile';
import { linkingDocumentsToRequestInBackOffice, linkingDocumentsToRequestInSoftExperted, uploadFormDocuments } from '../../../../api/RequestService'
import { useFormik } from 'formik';
import { HideGlobalLoading, ShowGlobalLoading } from '../../../../redux/actions/UiActions';
import { useSnackbar } from 'notistack';

function Payment() {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    let { requestID } = useParams();
    const queryClient = useQueryClient()
    const requestData = queryClient.getQueryData(['serviceRequestedDetail', requestID])
    const userData = queryClient.getQueryData(['userData'])

    const [modalPaymentIsOpen, setModalPaymentIsOpen] = useState();

    const fileFormik = useFormik({
        initialValues: {
            file: null
        },
        validationSchema: FileFormSchema,
        onSubmit: (values) => {
            uploadVoucher(values)
        },
    });

    const handlePaymentModalVisibility = () => {
        setModalPaymentIsOpen(!modalPaymentIsOpen)
    }

    const handleSiritePayment = () => {

        const siritePaymentConfig = {
            //development
            codigoCentroRecaudacion: "0018",
            codigoServicio: "0251",
            //production
            //   codigoCentroRecaudacion: requestData.request.service.institution.recaudationCode,
            //   codigoServicio: requestData.request.service.sirit_code,
            montoServicio: requestData.request.payment.payment_amount,
            nombre: `${userData.payload.name} ${userData.payload.first_last_name} ${userData.payload.second_last_name}`,
            numeroDocumento: userData.payload.citizen_id,
            tipoDocumento: "C",
            medioPago: "PagoEnLinea",
            idAutorizacionPortal: requestData.request.idAutorizacionPortal,
            urlRetorno: `http://servicios.mitur.gob.do/app/validatePayment/${requestData.request.id}`,
        }

        let form = document.createElement('form');
        form.style.display = 'none'
        form.action = 'https://prw-psp-1.hacienda.gob.do/pasarela-pago/transaccion';
        form.method = 'POST';
        //  form.target = 'blank';

        let siriteConfigKeys = Object.keys(siritePaymentConfig)
        siriteConfigKeys.forEach((key, index) => {
            const input = document.createElement('input')
            input.name = key
            input.value = siritePaymentConfig[key]
            form.appendChild(input)
        })
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }

    const uploadVoucher = async (data) => {
        const formFilesData = new FormData();
        formFilesData.append(
            "file[]",
            data.file[0],
            data.file[0].name
        );
        try {
            dispatch(ShowGlobalLoading('Subiendo documento'));
            let responseFilesUpload = await uploadFormDocuments(formFilesData);
            if (responseFilesUpload.success) {
                const softExpertRequest = {
                    documents: [
                        {
                            ...responseFilesUpload.files[0],
                            label: "Comprobante de pago"
                        }
                    ],
                    title: `documento-${userData.payload.citizen_id}`,
                    record_id: requestData.request.code,
                    attribute: `NumeroSolicitud=${requestData.request.code};DocumentoIdentidadSolicitante=${userData.payload.citizen_id};TipoDocumentoPortal=Adjunto`,
                    process_id: requestData.request.service.process_id,
                    acronym: requestData.direction.name + "DE",
                    names: [
                        "Comprobante de pago"
                    ],
                    activity_id: requestData.request.activity.activity_id,
                    new_request: false
                }

                let softExpertResponse = await linkingDocumentsToRequestInSoftExperted(softExpertRequest, requestID);
                if (softExpertResponse.success) {
                    let request = {
                        voucher: true,
                        status:true,
                        documents: responseFilesUpload.files.map((file, index) => {
                            return {
                                ...file,
                                label: "Comprobante de pago"
                            }
                        }),
                    }

                    let linkBackOffice = await linkingDocumentsToRequestInBackOffice(request, requestID);
                    if (linkBackOffice.success) {
                        enqueueSnackbar("Comprobante de pago enviado", { variant: 'success' })
                    } else {
                        enqueueSnackbar("Ha ocurrido un error", { variant: 'error' })
                    }
                } else {
                    enqueueSnackbar("Ha ocurrido un error", { variant: 'error' })
                }
                setModalPaymentIsOpen(false)
                dispatch(HideGlobalLoading());
            } else {
                enqueueSnackbar("Ha ocurrido un error", { variant: 'error' })
            }
        } catch (error) {
            enqueueSnackbar("Ha ocurrido un error", { variant: 'error' })
            setModalPaymentIsOpen(false)
            dispatch(HideGlobalLoading());
        }

    }

    return (
        <Container >
            <TextInformation title="Método de pago" rightTitle={`Monto a pagar DOP$${requestData.request.payment.payment_amount}`}/>
            <SmallHeightDivider />
            <SmallHeightDivider />
            <Grid alignSelf="center" justifyContent="space-evenly" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                {
                    requestData.request.service.sirit_code != null &&
                    <Grid item xs={6} sm={4} md={4}>
                        <ImageContainer title="Sirite" onClick={() => handleSiritePayment()}>
                            <ImageContainerHeader>
                                <ImageContainerTitle>PAGO CON TARJETA</ImageContainerTitle>
                            </ImageContainerHeader>
                            <LogoImage src={siritLogo} />
                        </ImageContainer>
                    </Grid>
                }
                {
                    requestData.request.service.external_pay !== 0 &&
                    <Fragment>
                        <Grid item xs={6} sm={4} md={4}>
                            <ImageContainer title="Transferecia" onClick={handlePaymentModalVisibility}>
                                <ImageContainerHeader>
                                    <ImageContainerTitle>DEPOSITO O TRANSFERENCIA</ImageContainerTitle>
                                </ImageContainerHeader>
                                <LogoImage src={transferenciaLogo} />
                            </ImageContainer>
                        </Grid>
                    </Fragment>
                }

            </Grid>

            <FormModal onClose={handlePaymentModalVisibility} open={modalPaymentIsOpen}
                title="Subir comprobante"
            >
                <SmallHeightDivider />
                <SmallHeightDivider />
                <SmallHeightDivider />
                <UploadFile id="file" title="Documento"
                    onChange={fileFormik.handleChange}
                    onBlur={fileFormik.handleBlur}
                    error={fileFormik.touched.file && Boolean(fileFormik.errors.file)}
                    helperText={fileFormik.touched.file && fileFormik.errors.file}
                    required
                />

                <SmallHeightDivider />
                <SmallHeightDivider />

                <ButtonContainer>
                    <StyledButton onClick={fileFormik.handleSubmit}>
                        CONFIRMAR
                    </StyledButton>
                </ButtonContainer>

            </FormModal>


            <SmallHeightDivider />
            <SmallHeightDivider />
             {/*
                <Fragment>
                    <TextInformation title="Mis pagos" />
                    <SmallHeightDivider />
                   
                        MockupPayments.map((payment) => (
                            <Fragment>
                                <CardContainer>
                                    <CardTextContainer>
                                        <Grid alignItems="flex-start" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Pago
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {payment.requestName}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    ID de pago
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {payment.confirmationID}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Monto pagado
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {payment.amount}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Fecha de pago
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {payment.date}
                                                </CardBodyText>
                                            </Grid>

                                        </Grid>
                                    </CardTextContainer>
                                </CardContainer>
                                <SmallHeightDivider />
                            </Fragment>
                        ))
                        
                </Fragment>
*/   }
            



        </Container>
    );
}

export default Payment;
