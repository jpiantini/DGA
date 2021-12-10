import { useState, useLayoutEffect, useEffect } from 'react';
import TextInformation from '../../components/TextInformation/TextInformation';
import {
  SmallHeightDivider,
  MediumHeightDivider,
  StyledButtonOutlined,
} from '../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import {
  ButtonContainer,
  ContactInfoContainer,
  Container,
  MapContainer,
} from './styles/ContactStyles';
import { useFormik } from 'formik';
import { FormSchema } from './ContactConstants';
import { Grid } from '@mui/material';
import TextField from '../../components/TextField/TextField';
import wpCall from '../../services/WpServerCall';
import Swal from 'sweetalert2';
function Contact() {
  const matchesWidth = useMediaQuery('(min-width:768px)');
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authReducer);
  const [wordpressContent, setWordpressContent] = useState();

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
      Swal.fire({
        title: `Mensaje enviado `,
        text: 'Gracias por ponerse en contacto con nosotros   ',
        icon: 'success',
        timer: 5000,
        timerProgressBar: true,
      });
    },
  });

  const getAndSetAllWordPressContent = async () => {
    let response = await wpCall().get('/sucursales/v1/sucursales');
    let data = response.data.map((data) => {
      return {
        title: data.title,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
      };
    });
    setWordpressContent(data);
  };

  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle('Contacto')); // TITLE OF SUBHEADER APP
  }, []);

  useEffect(() => {
    getAndSetAllWordPressContent();
  }, []);

  return (
    <Container>
      <TextInformation title='Información de contacto' />
      <SmallHeightDivider />

      <Grid
        alignItems='center'
        justifyContent='space-between'
        container
        direction='row'
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 8, sm: 8, md: 12 }}
      >
        {wordpressContent &&
          wordpressContent.map((content) => (
            <Grid item xs={12} sm={12} md={6}>
              <ContactInfoContainer>
                <label>
                  <strong>{content.title}</strong>
                </label>
                <p style={{ marginTop: '0.1%' }}>
                  {content.address}
                  <br />
                  {content.phoneNumber}
                  <br />
                  {content.email}
                  <br />
                  {content.website}
                </p>
              </ContactInfoContainer>
            </Grid>
          ))}
      </Grid>

      <TextInformation title='Ponte en contacto con nosotros' />
      <SmallHeightDivider />

      <Grid
        alignItems='center'
        justifyContent='center'
        container
        direction='row'
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 8, sm: 8, md: 12 }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            title='Nombre completo'
            type='text'
            id='fullName'
            required
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={6}>
          <TextField
            title='Correo Electronico'
            type='email'
            id='email'
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={6}>
          <TextField
            title='Telefono de contacto'
            type='text'
            id='phoneNumber'
            mask='999-999-9999'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            title='Mensaje'
            type='text'
            id='message'
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
        <StyledButtonOutlined variant='outlined'>
          ENVIAR MENSAJE
        </StyledButtonOutlined>
      </ButtonContainer>

      <MediumHeightDivider />
      <MapContainer>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1591.4523757607806!2d-69.9858015022195!3d18.432270509277355!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3e1a2c31e11eb6e3!2sMinisterio%20de%20Turismo!5e0!3m2!1ses-419!2sdo!4v1638561010489!5m2!1ses-419!2sdo'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowfullscreen=''
          loading='lazy'
        />
      </MapContainer>
    </Container>
  );
}

export default Contact;
