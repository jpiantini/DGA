import { useState, useLayoutEffect } from 'react';
import TextInformation from '../../components/TextInformation/TextInformation';
import { SmallHeightDivider, MediumHeightDivider, StyledButtonOutlined } from '../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import {
    ButtonContainer,
    Container,
    MapContainer
} from './styles/ContactStyles';
import { useFormik } from 'formik';
import { FormSchema } from './ContactConstants';
import { Grid } from '@mui/material';
import TextField from '../../components/TextField/TextField';

function Contact() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);


    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            message: '',
        },
        validationSchema: FormSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            //  handleRegister(values)
        },
    });


    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE
        dispatch(UpdateAppSubHeaderTitle('Contacto')) // TITLE OF SUBHEADER APP
    }, []);


    return (
        <Container>
            <TextInformation title="Información de contacto" />
            <SmallHeightDivider />
            <div style={{ fontFamily: 'Nunito Sans' }}>
                <label>
                    <strong>
                        Oficina Principal
                    </strong>
                </label>

                <p>
                    Av. Cayetano Germosén, esq. Av. Gral sector D. N., Av. Luperón, Santo Domingo.<br />

                    809 221 4660<br />
                    info@mitur.gob.do

                </p>
            </div>

            <div style={{ fontFamily: 'Nunito Sans',margin:0 }}>
                <label>
                    <strong>
                        Oficina Principal
                    </strong>
                </label>

                <p>
                    Av. Cayetano Germosén, esq. Av. Gral sector D. N., Av. Luperón, Santo Domingo.<br />

                    809 221 4660<br />
                    info@mitur.gob.do

                </p>
            </div>

            <TextInformation title="Ponte en contacto con nosotros" />
            <SmallHeightDivider />

            <Grid alignItems="center" justifyContent="center" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>

                <Grid item xs={12} sm={12} md={12}>
                    <TextField title="Nombre completo" type="text" id="fullName"
                        required
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                </Grid>

                <Grid item xs={12} sm={4} md={6}>
                    <TextField title="Correo Electronico" type="email" id="email"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>

                <Grid item xs={12} sm={4} md={6}>
                    <TextField title="Telefono de contacto" type="text" id="phoneNumber"
                        mask="999-999-9999"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField title="Mensaje" type="text" id="message"
                        multiline
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                        required
                    />
                </Grid>
            </Grid>
            <SmallHeightDivider />
            <ButtonContainer onClick={formik.handleSubmit}>
                <StyledButtonOutlined variant="outlined">ENVIAR MENSAJE</StyledButtonOutlined>
            </ButtonContainer>

            <MediumHeightDivider />
            <MapContainer>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1591.4523757607806!2d-69.9858015022195!3d18.432270509277355!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3e1a2c31e11eb6e3!2sMinisterio%20de%20Turismo!5e0!3m2!1ses-419!2sdo!4v1638561010489!5m2!1ses-419!2sdo"
                    width="100%" height="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy" />
            </MapContainer>
        </Container>

    );
}

export default Contact;
