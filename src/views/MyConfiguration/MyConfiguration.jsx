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
import PhoneTextField from "../../components/PhoneTextField/PhoneTextField";
import { cleanStringFromNumbers } from '../../utilities/functions/NumberUtil';
import LocalStorageService from "../../services/LocalStorageService";
export const MyConfiguration = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient()

  const [userImage, setUserImage] = useState("");

  const [provincesData, setProvincesData] = useState([]);
  const [municipalitiesData, setMunicipalitiesData] = useState([]);
  const [sectorsData, setSectorsData] = useState([]);

  const [openModifyPasswordModal, setOpenModifyPasswordModal] = useState(false);
  const [openModifyEmailModal, setOpenModifyEmailModal] = useState(false);

  const { isLoading, error, data, isFetching } = useQuery(['userData'], () => getUser())
  const mutation = useMutation(modifyUserData);

  const formik = useFormik({
    initialValues: {
      // TO DO COMPLETE FORM INFORMATION
      address: data?.payload?.address || '',
      province_id: data?.payload?.province_id || '',
      municipality_id: data?.payload?.municipality_id || '',
      sector_id: data?.payload?.sector_id || '',
      phone: data?.payload?.phone || '',
      phone2: data?.payload?.phone2 || '',
      notificationsWithEmail: false,
      notificationsSms: false
    },
    validationSchema: FormSchema,
    enableReinitialize: true,
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
    try {
      const response = await modifyPassword(formData);
      if (response.data.success) {
        enqueueSnackbar('Se ha modificado su contrase??a', { variant: 'success' });
        handleModifyPasswordModal();
      } else {
        enqueueSnackbar(response.data.msg, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar("Ha sucedido un error intentelo mas tarde", { variant: 'error' });
    }
  }

  const handleModifyEmail = async (formData) => {
    try {
      const response = await modifyEmail(formData);
      if (response.data.success) {
        enqueueSnackbar('Se ha modificado su correo electr??nico', { variant: 'success' });
        handleModifyEmailModal();
      } else {
        enqueueSnackbar(response.data.msg, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar("Ha sucedido un error intentelo mas tarde", { variant: 'error' });
    }
  }

  const handleModifyUserData = async (formData) => {
    const request = {
      phone: formData.phone,
      phone2: formData.phone2,
      province_id: formData.province_id,
      municipality_id: formData.municipality_id,
      sector_id: formData.sector_id,
      address: formData.address,
    }
    mutation.mutate(request, {
      onSuccess: (data) => {
        if (data.data.success) {
          // refresh cache of userData
          queryClient.invalidateQueries('userData')
          enqueueSnackbar('Se ha modificado su informaci??n de usuario', { variant: 'success' });
        } else {
          enqueueSnackbar(data.data.msg || "Ha ocurrido un error", { variant: 'error' });
        }
      }
    })
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
      if (municipalitiesData.data.success) {
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
      if (sectorsData.data.success) {
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
    setUserImage(LocalStorageService.getItem('profile_img'));
    dispatch(UpdateAppSubHeaderTitle("Mi configuraci??n")); // TITLE OF SUBHEADER APP
  }, []);

  useEffect(() => {
    (async () => {
      await getProvincesData();
      if (data) {
        await getMunicipalitiesData(formik.values.province_id);
        await getSectorsData(formik.values.municipality_id);
      }
    }
    )();
  }, [data]);

  return (
    <Container>

      <TopContainer>
        <UserDataContainer>
          <ProfileImage src={userImage} />
          <ElementDivider />
          <div>
            <Title>{data && data.payload.name + " " + data.payload.first_last_name + " " + data.payload.second_last_name}</Title>
            <BodyText>Cedula: <strong>{data && stringToDominicanCedula(data.payload.citizen_id)}</strong></BodyText>
            {/*
            <BodyText>??ltima modificaci??n:</BodyText>
  */}
            <SmallHeightDivider />
          </div>
        </UserDataContainer>
        <Column >
          <ButtonContainer>
            <StyledButtonOutlined variant="outlined" onClick={handleModifyPasswordModal}>Cambiar contrase??a</StyledButtonOutlined>
          </ButtonContainer>
          <MediumHeightDivider />
          <ButtonContainer>
            <StyledButtonOutlined variant="outlined" onClick={handleModifyEmailModal}>Cambiar Correo Principal</StyledButtonOutlined>
          </ButtonContainer>
        </Column>
      </TopContainer>

      <FormModal onClose={handleModifyPasswordModal} open={openModifyPasswordModal}
        title="Modificar contrase??a"
      >
        <SmallHeightDivider />
        <Grid alignItems="flex-start" justifyContent="center" container direction="row" x spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          <Grid item xs={12} sm={12} md={12}>
            <TextField title="Contrase??a actual" type="password" id="old_password"
              value={formikPasswordChange.values.old_password}
              onChange={formikPasswordChange.handleChange}
              onBlur={formikPasswordChange.handleBlur}
              error={formikPasswordChange.touched.old_password && Boolean(formikPasswordChange.errors.old_password)}
              helperText={formikPasswordChange.touched.old_password && formikPasswordChange.errors.old_password}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <TextField title="Nueva Contrase??a" type="password" id="password"
              value={formikPasswordChange.values.password}
              onChange={formikPasswordChange.handleChange}
              onBlur={formikPasswordChange.handleBlur}
              error={formikPasswordChange.touched.password && Boolean(formikPasswordChange.errors.password)}
              helperText={formikPasswordChange.touched.password && formikPasswordChange.errors.password}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <TextField title="Repetir nueva contrase??a" type="password" id="new_password_confirmation"
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
            <TextField title="Nuevo email" type="text" id="email"
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
            <TextField title="Contrase??a" type="password" id="password"
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
          <TextField title="Direcci??n" type="text" id="address"
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
          <PhoneTextField title="Tel??fono m??vil" type="text" id="phone"
            required
            value={cleanStringFromNumbers(formik.values.phone)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>

        <Grid item xs={8} sm={4} md={6}>
          <PhoneTextField title="Tel??fono secundario" type="text" id="phone2"
            required
            value={cleanStringFromNumbers(formik.values.phone2)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone2 && Boolean(formik.errors.phone2)}
            helperText={formik.touched.phone2 && formik.errors.phone2}
          />
        </Grid>
      </Grid>
      {/*
        <Fragment>
          <SmallHeightDivider />
          <SmallHeightDivider />
          <TextInformation title="Preferencias de Notificaci??n" />
          <SmallHeightDivider />

          <Grid alignItems="center" justifyContent="center" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>
            <Grid item xs={12} sm={4} md={6}>
              <CheckBox label="Correo Electr??nico" id="notificationsWithEmail"
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
        </Fragment>
          */}
      <MediumHeightDivider />

      <ButtonSaveContainer>
        <StyledButtonOutlined variant="outlined" onClick={formik.handleSubmit}>Guardar</StyledButtonOutlined>
      </ButtonSaveContainer>
      <MediumHeightDivider />
    </Container>
  );
};
