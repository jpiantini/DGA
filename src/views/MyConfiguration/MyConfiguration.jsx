import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from "../../redux/actions/UiActions";
import { Container, TopContainer, ProfileImage, Title, ButtonContainer, UserDataContainer, Column, ElementDivider, ButtonSaveContainer } from './styles/MyConfigurationStyles';
import { BodyText, MediumHeightDivider, SmallHeightDivider, StyledButton, StyledButtonOutlined } from '../../theme/Styles'
import TextInformation from '../../components/TextInformation/TextInformation';
import { Grid } from "@mui/material";
import { useFormik } from 'formik';
import TextField from "../../components/TextField/TextField";
import Select from "../../components/Select/Select";
import CheckBox from "../../components/CheckBox/CheckBox";
import { FormEmailSchema, FormPasswordSchema, FormSchema } from "./MyConfigurationConstants";
import apiCall from "../../services/ApiServerCall";
import FormModal from "../../components/FormModal/FormModal";
import { modifyEmail, modifyPassword, modifyUserData } from "../../api/myConfiguration";
import { useSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { stringToDominicanCedula } from "../../utilities/functions/FormatterUtil";
import { getUser } from "../../api/Auth";

export const MyConfiguration = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient()

  const { profileImg } = useSelector((state) => state.authReducer);

  const [provincesData, setProvincesData] = useState([]);
  const [municipalitiesData, setMunicipalitiesData] = useState([]);
  const [sectorsData, setSectorsData] = useState([]);

  const [openModifyPasswordModal, setOpenModifyPasswordModal] = useState(false);
  const [openModifyEmailModal, setOpenModifyEmailModal] = useState(false);

  const { isLoading, error, data, isFetching } = useQuery(['userData'], () => getUser())
  const mutation = useMutation(modifyUserData);

  const formik = useFormik({
    initialValues: { // TO DO COMPLETE FORM INFORMATION
      address: data?.data?.payload?.address || '',
      province_id: data?.data?.payload?.province_id || '',
      municipality_id: data?.data?.payload?.municipality_id || '',
      sector_id: data?.data?.payload?.sector_id || '',
      phoneMobile: data?.data?.payload?.phone || '',
      phone2: data?.data?.payload?.phone2 || '',
      phoneLaboral: '',
      secundaryEmail:data?.data?.payload?.email2 || '',
      notificationsWithEmail: false,
      notificationsSms: false
    },
    validationSchema: FormSchema,
    enableReinitialize:true,
    onSubmit: (values) => {
      handleModifyUserData(values);
    },
  });

  const formikPasswordChange = useFormik({
    initialValues: {
      old_password: '',
      password: '',
      new_password_confirmation: ''
    },
    validationSchema: FormPasswordSchema,
    onSubmit: (values) => {
      handleModifyPassword(values)
    },
  });

  const formikEmailChange = useFormik({
    initialValues: {
      password: '',
      email: '',
      new_email_confirmation: ''
    },
    validationSchema: FormEmailSchema,
    onSubmit: (values) => {
      handleModifyEmail(values);
    },
  });

  const handleModifyPasswordModal = () => {
    formikPasswordChange.resetForm();
    setOpenModifyPasswordModal(!openModifyPasswordModal);

  }
  const handleModifyEmailModal = () => {
    formikEmailChange.resetForm();
    setOpenModifyEmailModal(!openModifyEmailModal);
  }

  const handleModifyPassword = async (formData) => {
    const response = await modifyPassword(formData);
    if (response.data.success) {
      enqueueSnackbar('Se ha modificado su contraseña', { variant: 'success' });
      handleModifyPasswordModal();
    } else {
      enqueueSnackbar(response.data.msg, { variant: 'error' });
    }
  }

  const handleModifyEmail = async (formData) => {
    const response = await modifyEmail(formData);
    if (response.data.success) {
      enqueueSnackbar('Se ha modificado su correo electrónico', { variant: 'success' });
      handleModifyEmailModal();
    } else {
      enqueueSnackbar(response.data.msg, { variant: 'error' });
    }
  }

  const handleModifyUserData = async (formData) => {
    alert(formData);

    /*  TO DO change the modifyUserData endpoint
    
    mutation.mutate(formData, {
      onSuccess: (data) => {
        if (data.data.success) {
          enqueueSnackbar('Se ha modificado su información de usuario', { variant: 'success' });
          queryClient.invalidateQueries('userData') // refresh cache of userData
        }else{
          enqueueSnackbar(data.data.msg, { variant: 'error' });
        }
      }
    })
       */
  }




  const getProvincesData = async () => {
    try {
      let provincesData = await apiCall().get('/get/provinces')
      if (provincesData) {
        setProvincesData(
          provincesData.data.provinces?.map((province) => ({
            value: province.bidclasif,
            label: province.ctituloclas
          })));
      }
      setMunicipalitiesData([]);
      setSectorsData([]);
    } catch (error) {

    }
  }

  const getMunicipalitiesData = async (value) => {
    try {
      let municipalitiesData = await apiCall().get(`/get/municipalities/${value}`)
      if (municipalitiesData) {
        setMunicipalitiesData(
          municipalitiesData.data.municipalities?.map((municipalities) => ({
            value: municipalities.bidclasif,
            label: municipalities.ctituloclas
          })));
      }
      setSectorsData([]);
    } catch (error) {

    }
  }

  const getSectorsData = async (value) => {
    try {
      let sectorsData = await apiCall().get(`/get/sectors/${value}`)
      if (sectorsData) {
        setSectorsData(
          sectorsData.data.sectors?.map((sector) => ({
            value: sector.bidclasif,
            label: sector.ctituloclas
          })));
      }
    } catch (error) {

    }
  }

  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle("Mi configuración")); // TITLE OF SUBHEADER APP
  }, []);

  useEffect(() => {
    getProvincesData();
  }, []);

  return (
    <Container>

      <TopContainer>
        <UserDataContainer>
          <ProfileImage src={profileImg} />
          <ElementDivider />
          <div>
            <Title>{data && data.data.payload.name + " " + data.data.payload.first_last_name + " " + data.data.payload.second_last_name}</Title>
            <BodyText>Cedula: <strong>{data && stringToDominicanCedula(data.data.payload.citizen_id)}</strong></BodyText>
            <BodyText>Última modificación:</BodyText>
            <SmallHeightDivider />
          </div>
        </UserDataContainer>
        <Column >
          <ButtonContainer>
            <StyledButtonOutlined variant="outlined" onClick={handleModifyPasswordModal}>Cambiar contraseña</StyledButtonOutlined>
          </ButtonContainer>
          <MediumHeightDivider />
          <ButtonContainer>
            <StyledButtonOutlined variant="outlined" onClick={handleModifyEmailModal}>Cambiar Correo Principal</StyledButtonOutlined>
          </ButtonContainer>
        </Column>
      </TopContainer>

      <FormModal onClose={handleModifyPasswordModal} open={openModifyPasswordModal}
        title="Modificar contraseña"
      >
        <SmallHeightDivider />
        <Grid alignItems="flex-start" justifyContent="center" container direction="row" x spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          <Grid item xs={12} sm={12} md={12}>
            <TextField title="Contraseña actual" type="password" id="old_password"
              value={formikPasswordChange.values.old_password}
              onChange={formikPasswordChange.handleChange}
              onBlur={formikPasswordChange.handleBlur}
              error={formikPasswordChange.touched.old_password && Boolean(formikPasswordChange.errors.old_password)}
              helperText={formikPasswordChange.touched.old_password && formikPasswordChange.errors.old_password}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <TextField title="Nueva Contraseña" type="password" id="password"
              value={formikPasswordChange.values.password}
              onChange={formikPasswordChange.handleChange}
              onBlur={formikPasswordChange.handleBlur}
              error={formikPasswordChange.touched.password && Boolean(formikPasswordChange.errors.password)}
              helperText={formikPasswordChange.touched.password && formikPasswordChange.errors.password}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <TextField title="Repetir nueva contraseña" type="password" id="new_password_confirmation"
              value={formikPasswordChange.values.new_password_confirmation}
              onChange={formikPasswordChange.handleChange}
              onBlur={formikPasswordChange.handleBlur}
              error={formikPasswordChange.touched.new_password_confirmation && Boolean(formikPasswordChange.errors.new_password_confirmation)}
              helperText={formikPasswordChange.touched.new_password_confirmation && formikPasswordChange.errors.new_password_confirmation}
              required
            />
          </Grid>
        </Grid>

        <SmallHeightDivider />
        <SmallHeightDivider />

        <ButtonSaveContainer>
          <StyledButton onClick={() => formikPasswordChange.handleSubmit()}>
            CONFIRMAR
          </StyledButton>
        </ButtonSaveContainer>

        <SmallHeightDivider />
        <SmallHeightDivider />

      </FormModal>

      <FormModal onClose={handleModifyEmailModal} open={openModifyEmailModal}
        title="Modificar email"
      >
        <SmallHeightDivider />
        <Grid alignItems="flex-start" justifyContent="center" container direction="row" x spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          <Grid item xs={12} sm={4} md={6}>
            <TextField title="Email" type="text" id="email"
              value={formikEmailChange.values.email}
              onChange={formikEmailChange.handleChange}
              onBlur={formikEmailChange.handleBlur}
              error={formikEmailChange.touched.email && Boolean(formikEmailChange.errors.email)}
              helperText={formikEmailChange.touched.email && formikEmailChange.errors.email}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <TextField title="Repetir nuevo email" type="text" id="new_email_confirmation"
              value={formikEmailChange.values.new_email_confirmation}
              onChange={formikEmailChange.handleChange}
              onBlur={formikEmailChange.handleBlur}
              error={formikEmailChange.touched.new_email_confirmation && Boolean(formikEmailChange.errors.new_email_confirmation)}
              helperText={formikEmailChange.touched.new_email_confirmation && formikEmailChange.errors.new_email_confirmation}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <TextField title="Contraseña" type="password" id="password"
              value={formikEmailChange.values.password}
              onChange={formikEmailChange.handleChange}
              onBlur={formikEmailChange.handleBlur}
              error={formikEmailChange.touched.password && Boolean(formikEmailChange.errors.password)}
              helperText={formikEmailChange.touched.password && formikEmailChange.errors.password}
              required
            />
          </Grid>

        </Grid>

        <SmallHeightDivider />
        <SmallHeightDivider />

        <ButtonSaveContainer>
          <StyledButton onClick={() => formikEmailChange.handleSubmit()}>
            CONFIRMAR
          </StyledButton>
        </ButtonSaveContainer>

        <SmallHeightDivider />
        <SmallHeightDivider />

      </FormModal>

      <MediumHeightDivider />
      <TextInformation title="Datos de contacto" />
      <SmallHeightDivider />
      <SmallHeightDivider />

      <Grid alignItems="center" justifyContent="center" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>

        <Grid item xs={8} sm={4} md={6}>
          <TextField title="Dirección" type="text" id="address"
            required
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>

        <Grid item xs={8} sm={4} md={6}>
          <Select title="Provincia" type="text" id="province_id"
            data={provincesData}
            value={formik.values.province_id}
            onChange={(e) => {
              formik.setFieldValue('municipality_id', '');
              formik.setFieldValue('sector_id', '');
              formik.handleChange(e);
              getMunicipalitiesData(e.target.value)
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.province_id && Boolean(formik.errors.province_id)}
            helperText={formik.touched.province_id && formik.errors.province_id}
            required
          />
        </Grid>

        <Grid item xs={8} sm={4} md={6}>
          <Select title="Municipio" type="text" id="municipality_id"
            disabled={formik.values['province_id'].length <= 0}
            data={municipalitiesData}
            value={formik.values.municipality_id}
            onChange={(e) => {
              formik.setFieldValue('sector_id', '');
              formik.handleChange(e);
              getSectorsData(e.target.value);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.municipality_id && Boolean(formik.errors.municipality_id)}
            helperText={formik.touched.municipality_id && formik.errors.municipality_id}
            required
          />
        </Grid>

        <Grid item xs={8} sm={4} md={6}>
          <Select title="Sector" type="text" id="sector_id"
            disabled={formik.values['municipality_id'].length <= 0}
            data={sectorsData}
            value={formik.values.sector_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.sector_id && Boolean(formik.errors.sector_id)}
            helperText={formik.touched.sector_id && formik.errors.sector_id}
            required
          />
        </Grid>

        <Grid item xs={8} sm={4} md={6}>
          <TextField title="Teléfono móvil" type="text" id="phoneMobile"
            mask="999-999-9999"
            value={formik.values.phoneMobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneMobile && Boolean(formik.errors.phoneMobile)}
            helperText={formik.touched.phoneMobile && formik.errors.phoneMobile}
            required
          />
        </Grid>

        <Grid item xs={8} sm={4} md={6}>
          <TextField title="Teléfono secundario" type="text" id="phone2"
            mask="999-999-9999"
            value={formik.values.phone2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone2 && Boolean(formik.errors.phone2)}
            helperText={formik.touched.phone2 && formik.errors.phone2}
            required
          />
        </Grid>

        <Grid item xs={8} sm={4} md={6}>
          <TextField title="Teléfono laboral" type="text" id="phoneLaboral"
            mask="999-999-9999"
            value={formik.values.phoneLaboral}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneLaboral && Boolean(formik.errors.phoneLaboral)}
            helperText={formik.touched.phoneLaboral && formik.errors.phoneLaboral}
            required
          />
        </Grid>

        <Grid item xs={12} sm={4} md={6}>
          <TextField title="Correo electrónico secundario" type="text" id="secundaryEmail"
            required
            value={formik.values.secundaryEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.secundaryEmail && Boolean(formik.errors.secundaryEmail)}
            helperText={formik.touched.secundaryEmail && formik.errors.secundaryEmail}
          />
        </Grid>
      </Grid>

      <SmallHeightDivider />
      <SmallHeightDivider />
      <TextInformation title="Preferencias de Notificación" />
      <SmallHeightDivider />

      <Grid alignItems="center" justifyContent="center" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>
        <Grid item xs={12} sm={4} md={6}>
          <CheckBox label="Correo Electrónico" id="notificationsWithEmail"
            value={formik.values.notificationsWithEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.notificationsWithEmail && Boolean(formik.errors.notificationsWithEmail)}
            helperText={formik.touched.notificationsWithEmail && formik.errors.notificationsWithEmail}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={6}>
          <CheckBox label="SMS" id="notificationsSms"
            value={formik.values.notificationsSms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.notificationsSms && Boolean(formik.errors.notificationsSms)}
            helperText={formik.touched.notificationsSms && formik.errors.notificationsSms}
          />
        </Grid>
      </Grid>
      <MediumHeightDivider />

      <ButtonSaveContainer>
        <StyledButtonOutlined variant="outlined">Guardar</StyledButtonOutlined>
      </ButtonSaveContainer>
      <MediumHeightDivider />
    </Container>
  );
};
