import { useState, Fragment } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider,CardContainer,CardBodyTitle,CardBodyText,CardTextContainer, SmallHeightDivider, StyledButtonOutlined, Row, StyledButton } from '../../../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { FormProfileSchema, FormCompanySchema, MockupCompanies } from './MyProfileConstants';
import {
    SectionTitle,
    SectionLink,
    SectionTextDivider,
    ProfileImage,
    ProfileContainer,
    Column,
} from './styles/MyProfileStyles';
import Fade from 'react-reveal/Fade';
import { useFormik } from 'formik';
import TextField from '../../../../components/TextField/TextField';
import { Grid } from '@mui/material';
import FormModal from '../../../../components/FormModal/FormModal';


function MyProfile() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();

    const [openModifyProfileModal, setOpenModifyProfileModal] = useState(false);
    const [openModifyOrAddCompanyModal, setOpenModifyOrAddCompanyModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState();

    const profileFormik = useFormik({
        initialValues: {
            name: '',
            identification: '',
            phoneNumber: '',
            city: '',
            company: '',
            email: ''
        },
        validationSchema: FormProfileSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const companyFormik = useFormik({
        initialValues: {
            identification: '',
            phoneNumber: '',
            city: '',
            companyName: '',
            email: '',
            address: '',
            category: ''
        },
        validationSchema: FormCompanySchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleModifyProfileModal = () => {
        setOpenModifyProfileModal(!openModifyProfileModal);
    }

    const handleModifyOrAddCompanyModal = (company) => {
        if (company) {
            setSelectedCompany(company);
            Object.keys(companyFormik.values).map((key) => {
                companyFormik.setFieldValue(key, company[key], false);
            })
        } else {
            setSelectedCompany(null);
            Object.keys(companyFormik.values).map((key) => {
                companyFormik.setFieldValue(key, '', false);
            })
        }
        setOpenModifyOrAddCompanyModal(!openModifyOrAddCompanyModal);
    }

    return (
        <Fade right>
            <MediumHeightDivider />
            <Row style={{ justifyContent: 'space-between' }}>
                <Row style={{ alignItems: 'center', width: '75%' }}>
                    <SectionTitle>
                        Perfil del Representante
                    </SectionTitle>
                    <SectionTextDivider />
                    <SectionLink onClick={handleModifyProfileModal}>
                        Editar Perfil
                    </SectionLink>
                </Row>
                <div style={{ width: '25%' }}>
                    <StyledButtonOutlined onClick={() => handleModifyOrAddCompanyModal()} variant="outlined">
                        Agregar empresa
                    </StyledButtonOutlined>
                </div>
            </Row>
            <div style={{ height:'1px' }}/>

            <ProfileContainer>
                <ProfileImage src="https://www.w3schools.com/howto/img_avatar.png" />
                <CardTextContainer>
                    <Grid alignItems="center" justifyContent="center" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>
                        <Grid item xs={4} sm={4} md={4}>
                            <CardBodyTitle>
                                Nombre
                            </CardBodyTitle>
                            <CardBodyText>
                                Roberto Enrique M.
                            </CardBodyText>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4}>
                            <CardBodyTitle>
                                Documento de Identidad
                            </CardBodyTitle>
                            <CardBodyText>
                                001-6585665-5
                            </CardBodyText>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4}>
                            <CardBodyTitle>
                                Empresa
                            </CardBodyTitle>
                            <CardBodyText>
                                Restaurant & Bar Grill
                            </CardBodyText>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4}>
                            <CardBodyTitle>
                                Telefono de contacto
                            </CardBodyTitle>
                            <CardBodyText>
                                809-777-6666
                            </CardBodyText>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4}>
                            <CardBodyTitle>
                                Ciudad
                            </CardBodyTitle>
                            <CardBodyText>
                                Santo Domingo
                            </CardBodyText>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4}>
                            <CardBodyTitle>
                                Correo Electrónico
                            </CardBodyTitle>
                            <CardBodyText>
                                Robert@gmail.com
                            </CardBodyText>

                        </Grid>
                    </Grid>
                </CardTextContainer>
            </ProfileContainer>
            <FormModal onClose={handleModifyProfileModal} open={openModifyProfileModal}
                title="Modificar perfil"
            >
                <SmallHeightDivider />
                <Grid alignItems="flex-start" justifyContent="center" container direction="row" x spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item >
                        <TextField title="Nombre" type="text" id="name"
                            value={profileFormik.values.name}
                            onChange={profileFormik.handleChange}
                            error={profileFormik.touched.name && Boolean(profileFormik.errors.name)}
                            helperText={profileFormik.touched.name && profileFormik.errors.name}
                            required
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Documento de Identidad" type="text" id="identification"
                            required
                            mask="999-9999999-9"
                            value={profileFormik.values.identification}
                            onChange={profileFormik.handleChange}
                            error={profileFormik.touched.identification && Boolean(profileFormik.errors.identification)}
                            helperText={profileFormik.touched.identification && profileFormik.errors.identification}
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Empresa" type="text" id="company"
                            value={profileFormik.values.company}
                            onChange={profileFormik.handleChange}
                            error={profileFormik.touched.company && Boolean(profileFormik.errors.company)}
                            helperText={profileFormik.touched.company && profileFormik.errors.company}
                            required
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Telefono de contacto" type="text" id="phoneNumber"
                            required
                            mask="999-999-9999"
                            value={profileFormik.values.phoneNumber}
                            onChange={profileFormik.handleChange}
                            error={profileFormik.touched.phoneNumber && Boolean(profileFormik.errors.phoneNumber)}
                            helperText={profileFormik.touched.phoneNumber && profileFormik.errors.phoneNumber}
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Ciudad" type="text" id="city"
                            required
                            value={profileFormik.values.city}
                            onChange={profileFormik.handleChange}
                            error={profileFormik.touched.city && Boolean(profileFormik.errors.city)}
                            helperText={profileFormik.touched.city && profileFormik.errors.city}
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Correo Electronico" type="text" id="email"
                            required
                            value={profileFormik.values.email}
                            onChange={profileFormik.handleChange}
                            error={profileFormik.touched.email && Boolean(profileFormik.errors.email)}
                            helperText={profileFormik.touched.email && profileFormik.errors.email}
                        />
                    </Grid>
                </Grid>
                <SmallHeightDivider />
                <StyledButton onClick={() => profileFormik.handleSubmit()}>
                    CONFIRMAR
                </StyledButton>
                <SmallHeightDivider />
            </FormModal>
            {
                MockupCompanies.map((company) => (
                    <Fragment key={company.id}>
                        <MediumHeightDivider />
                        <Row style={{ alignItems: 'center' }}>
                            <SectionTitle>
                                {company.title}
                            </SectionTitle>
                            <SectionTextDivider />
                            <SectionLink onClick={() => handleModifyOrAddCompanyModal(company)}>
                                Editar Empresa
                            </SectionLink>
                        </Row>
                        <CardContainer>
                            <CardTextContainer>
                                <Grid alignItems="center" justifyContent="flex-start" container direction="row" x spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>
                                    <Grid item xs={4} sm={4} md={4}>
                                        <CardBodyTitle>
                                            RNC
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {company.identification}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4}>
                                        <CardBodyTitle>
                                            Teléfono
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {company.phoneNumber}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4}>
                                        <CardBodyTitle>
                                            Ciudad
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {company.city}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4}>
                                        <CardBodyTitle>
                                            Nombre Comercial
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {company.companyName}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4}>
                                        <CardBodyTitle>
                                            Correo Electrónico
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {company.email}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4}>
                                        <CardBodyTitle>
                                            Dirección
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {company.address}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4}>
                                        <CardBodyTitle>
                                            Área/Rubro
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {company.category}
                                        </CardBodyText>
                                    </Grid>
                                </Grid>

                            </CardTextContainer>
                        </CardContainer>
                    </Fragment>
                ))
            }
            <FormModal onClose={() => handleModifyOrAddCompanyModal()} open={openModifyOrAddCompanyModal}
                title={selectedCompany ? "Modificar empresa" : "Agregar empresa"}
            >
                <SmallHeightDivider />
                <Grid alignItems="flex-start" justifyContent="center" container direction="row" x spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item >
                        <TextField title="Documento de Identidad" type="text" id="identification"
                            required
                            mask="999-9999999-9"
                            value={companyFormik.values.identification}
                            onChange={companyFormik.handleChange}
                            error={companyFormik.touched.identification && Boolean(companyFormik.errors.identification)}
                            helperText={companyFormik.touched.identification && companyFormik.errors.identification}
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Nombre comercial" type="text" id="companyName"
                            value={companyFormik.values.companyName}
                            onChange={companyFormik.handleChange}
                            error={companyFormik.touched.companyName && Boolean(companyFormik.errors.companyName)}
                            helperText={companyFormik.touched.companyName && companyFormik.errors.companyName}
                            required
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Área/Rubro" type="text" id="category"
                            value={companyFormik.values.category}
                            onChange={companyFormik.handleChange}
                            error={companyFormik.touched.category && Boolean(companyFormik.errors.category)}
                            helperText={companyFormik.touched.category && companyFormik.errors.category}
                            required
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Teléfono" type="text" id="phoneNumber"
                            required
                            mask="999-999-9999"
                            value={companyFormik.values.phoneNumber}
                            onChange={companyFormik.handleChange}
                            error={companyFormik.touched.phoneNumber && Boolean(companyFormik.errors.phoneNumber)}
                            helperText={companyFormik.touched.phoneNumber && companyFormik.errors.phoneNumber}
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Correo Electrónico" type="text" id="email"
                            value={companyFormik.values.email}
                            onChange={companyFormik.handleChange}
                            error={companyFormik.touched.email && Boolean(companyFormik.errors.email)}
                            helperText={companyFormik.touched.email && companyFormik.errors.email}
                            required
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Ciudad" type="text" id="city"
                            value={companyFormik.values.city}
                            onChange={companyFormik.handleChange}
                            error={companyFormik.touched.city && Boolean(companyFormik.errors.city)}
                            helperText={companyFormik.touched.city && companyFormik.errors.city}
                            required
                        />
                    </Grid>
                    <Grid item >
                        <TextField title="Dirección" type="text" id="address"
                            value={companyFormik.values.address}
                            onChange={companyFormik.handleChange}
                            error={companyFormik.touched.address && Boolean(companyFormik.errors.address)}
                            helperText={companyFormik.touched.address && companyFormik.errors.address}
                            required
                        />
                    </Grid>
                </Grid>
                <SmallHeightDivider />
                <StyledButton onClick={() => companyFormik.handleSubmit()}>
                    CONFIRMAR
                </StyledButton>
                <SmallHeightDivider />
            </FormModal>
        </Fade>

    );
}

export default MyProfile;
