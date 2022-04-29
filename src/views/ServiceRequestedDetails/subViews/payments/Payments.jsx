import { Fragment, useEffect, useState } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import {
    SmallHeightDivider,
    CardBodyText,
    CardContainer,
    CardTextContainer,
    CardBodyTitle,
    StyledButton,
    BodyText,
    BodyTextBold
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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function Payment() {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    let { requestID } = useParams();
    const queryClient = useQueryClient()
    const requestData = queryClient.getQueryData(['serviceRequestedDetail', requestID])
    const userData = queryClient.getQueryData(['userData'])

    const [modalPaymentIsOpen, setModalPaymentIsOpen] = useState();
    const [paymentAmount, setPaymentAmount] = useState();

    const fileFormik = useFormik({
        initialValues: {
            file: {
                files: [],
            }
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
            //codigoCentroRecaudacion: "0018",
            //codigoServicio: "0251",
            //production
            codigoCentroRecaudacion: requestData.request.service.institution.recaudationCode,
            codigoServicio: requestData.request.service.sirit_code,
            montoServicio: paymentAmount,
            nombre: `${userData.payload.name} ${userData.payload.first_last_name} ${userData.payload.second_last_name}`,
            numeroDocumento: userData.payload.citizen_id,
            tipoDocumento: "C",
            medioPago: "PagoEnLinea",
            idAutorizacionPortal: requestData.request.idAutorizacionPortal,
            urlRetorno: `http://servicios.mitur.gob.do/app/validatePayment/${requestData.request.id}`,
        }

        let form = document.createElement('form');
        form.style.display = 'none'
        //development
        form.action = 'https://prw-psp-1.hacienda.gob.do/pasarela-pago/transaccion';
        //production
        // form.action = 'https://ecommerce.cardnet.com.do/pasarela-pago/transaccion'
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

    const uploadVoucher = async (values) => {
        let data = values.file.files;
        if (data.length === 0) {
            return
        }
        const formFilesData = new FormData();
        formFilesData.append(
            "file[]",
            data[0],
            data[0].name
        );
        try {
            dispatch(ShowGlobalLoading('Subiendo documento'));
            let responseFilesUploadResponse = await uploadFormDocuments(formFilesData);
            if (responseFilesUploadResponse?.success) {
                const backOfficeRequest = {
                    voucher: true,
                    status: true,
                    documents: responseFilesUploadResponse.files.map((file, index) => {
                        return {
                            ...file,
                            label: "Comprobante de pago"
                        }
                    }),
                }
                let linkBackOfficeResponse = await linkingDocumentsToRequestInBackOffice(backOfficeRequest, requestID);
                if (linkBackOfficeResponse.success) {
                //GOOD THE VOUCHER IS SEND SUCCESSFULL TO BACKOFFICE
                const softExpertRequest = {
                    documents: [
                        {
                            ...responseFilesUploadResponse.files[0],
                            label: "Comprobante de pago"
                        }
                    ],
                    title: `documento-${userData.payload.citizen_id}`,
                    record_id: linkBackOfficeResponse?.request_code,
                    attribute: `NumeroSolicitud=${linkBackOfficeResponse?.request_code};DocumentoIdentidadSolicitante=${userData.payload.citizen_id};TipoDocumentoPortal=Adjunto`,
                    process_id: requestData.request.service.process_id,
                    acronym: requestData.direction.name + "DE",
                    names: [
                        "Comprobante de pago"
                    ],
                    activity_id: requestData?.request?.activity?.activity_id ? requestData?.request?.activity?.activity_id : requestData?.request?.service?.activity_id,
                    new_request: false
                }
                let softExpertResponse = await linkingDocumentsToRequestInSoftExperted(softExpertRequest, requestID);
                if (softExpertResponse.success) {   
                    enqueueSnackbar("Comprobante de pago enviado", { variant: 'success' })
                    queryClient.invalidateQueries(['serviceRequestedDetail', requestID])
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

    useEffect(() => {
        if (requestData?.request !== undefined) {
            //Payment by required action
            if (requestData.request.request_actions_id === 7) {
                //put the payment_amount in requestData.priceRequest
                setPaymentAmount(requestData.request.payment.payment_amount);
                return;
            }
            //Initial Payment
            if (requestData.request.payment.payment_status === "PENDIENTE") {
                setPaymentAmount(requestData.request.payment.payment_amount);
                return;
            }
        }
    }, [requestData]);

    return (
        <Container >
            {requestData.request.payment.payment_status === "PENDIENTE" &&
                <Fragment>
                    <TextInformation title="Método de pago" rightTitle={paymentAmount ? `Monto a pagar DOP$${paymentAmount}` : null} />
                    <SmallHeightDivider />
                    <SmallHeightDivider />
                    <Grid alignSelf="center" justifyContent="space-evenly" container direction="row" spacing={{ xs: 1, md: 1 }} columns={{ xs: 6, sm: 8, md: 12 }}>
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
                </Fragment>
            }
            <FormModal onClose={handlePaymentModalVisibility} open={modalPaymentIsOpen}
                title="Subir comprobante"
            >
                <SmallHeightDivider />
                <SmallHeightDivider />
                <SmallHeightDivider />
                <UploadFile id="file" title="Documento"
                    onChange={fileFormik.handleChange}
                    onBlur={fileFormik.handleBlur}
                    value={fileFormik.values.file}
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

            {/*requestData.request.payment.payment_status === "PAGADO" &&
                <Fragment>
                    <TextInformation title="Detalles de pago" />
                    <SmallHeightDivider />
                    <SmallHeightDivider />
                    <Grid alignItems="center" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>

                        <Grid item xs={6} sm={4} md={4}>
                            <BodyTextBold>
                                Numero de aprobacion:
                            </BodyTextBold>
                            <BodyText>
                                {requestData.request.approval_number}
                            </BodyText>
                        </Grid>

                        <Grid item xs={6} sm={4} md={4}>
                            <BodyTextBold>
                                Monto pagado:
                            </BodyTextBold>
                            <BodyText>
                                {requestData.request.payment.payment_amount}
                            </BodyText>
                        </Grid>

                        <Grid item xs={6} sm={4} md={4}>
                            <BodyTextBold>
                                Fecha de pago:
                            </BodyTextBold>
                            <BodyText>
                                {format(new Date(requestData.request.payment.succesfullyPayment_date.replace(" ", "T")), "dd 'de' MMMM yyyy", { locale: es })}
                            </BodyText>
                        </Grid>

                    </Grid>
                </Fragment>
        */}


            {
                requestData.priceRequest.length > 0 &&
                <Fragment>
                    <TextInformation title="Mis pagos" />
                    <SmallHeightDivider />
                    {
                        requestData.priceRequest.map((payment) => (
                            <Fragment key={payment.id}>
                                <CardContainer>
                                    <CardTextContainer>
                                        <Grid alignItems="flex-start" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Pago
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {payment.concept}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    ID de pago
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {payment.approval_number}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Método de pago
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {payment.payment_method}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Monto pagado
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {payment.price}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Moneda
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {payment.coin}
                                                </CardBodyText>
                                            </Grid>


                                            <Grid item xs={6} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Fecha de pago
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {format(new Date(payment.created_at.replace(" ", "T")), "dd 'de' MMMM yyyy", { locale: es })}

                                                </CardBodyText>
                                            </Grid>

                                        </Grid>
                                    </CardTextContainer>
                                </CardContainer>
                                <SmallHeightDivider />
                            </Fragment>
                        ))
                    }
                </Fragment>
            }
        </Container>
    );
}

export default Payment;
