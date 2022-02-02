import { useState, Fragment } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider, CardContainer, CardBodyTitle, CardBodyText, CardTextContainer, SmallHeightDivider, StyledButtonOutlined, Row, StyledButton } from '../../../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { FormCompanySchema } from './MyProfileConstants';
import {
    SectionLink,
    ProfileImage,
    ProfileContainer,
} from './styles/MyProfileStyles';
import Fade from 'react-reveal/Fade';
import { useFormik } from 'formik';
import TextField from '../../../../components/TextField/TextField';
import { Grid } from '@mui/material';
import FormModal from '../../../../components/FormModal/FormModal';
import { SectionTitle, SectionTextDivider } from '../../styles/MyDeskStyles';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { addNewCompany, getAllCompanies, modifyCompany } from '../../../../api/myProfile';
import { getUser } from '../../../../api/Auth';
import { stringToDominicanCedula, stringToDominicanPhoneNumber } from '../../../../utilities/functions/FormatterUtil';


function MyProfile() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();
    const queryClient = useQueryClient()

    const { profileImg } = useSelector((state) => state.authReducer);

    const [openModifyOrAddCompanyModal, setOpenModifyOrAddCompanyModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState();

    const userQuery = useQuery(['userData'], () => getUser())
    const companiesQuery = useQuery(['allCompaniesData'], () => getAllCompanies())
    const mutationForModifyCompany = useMutation(modifyCompany);
    const mutationForAddCompany = useMutation(addNewCompany);

    const registerCompany = (formData) => {
        mutationForAddCompany.mutate(formData, {
            onSuccess: (data) => {
                if (data.success) {
                    queryClient.invalidateQueries('allCompaniesData') // refresh cache of allCompaniesData
                }
            }
        });
    }

    const modifySelectedCompany = (formData) => {
        mutationForModifyCompany.mutate(formData, {
            onSuccess: (data) => {
                if (data.success) {
                    queryClient.invalidateQueries('allCompaniesData') // refresh cache of allCompaniesData
                }
            }
        });
    }

    const companyFormik = useFormik({
        initialValues: {
            company_rnc: '',
            company_phone: '',
            company_name: '',
            company_address: '',
            company_url_web: ''
        },
        validationSchema: FormCompanySchema,
        onSubmit: (values) => {
            if (selectedCompany) {
                modifySelectedCompany(values);
            } else {
                registerCompany(values);
            }
            handleModifyOrAddCompanyModal();
        },
    });

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
            <Fragment>
                <MediumHeightDivider />
                <Row style={{ justifyContent: 'space-between' }}>
                    <Row style={{ alignItems: 'center', width: '75%' }}>
                        <SectionTitle>
                            Perfil del Representante
                        </SectionTitle>
                        <SectionTextDivider />
                        <SectionLink onClick={() => history.push('/app/myConfiguration')}>
                            Editar Perfil
                        </SectionLink>
                    </Row>
                    <div style={{ width: '25%' }}>
                        <StyledButtonOutlined onClick={() => handleModifyOrAddCompanyModal()} variant="outlined">
                            Agregar empresa
                        </StyledButtonOutlined>
                    </div>
                </Row>
                <div style={{ height: '1px' }} />

                <ProfileContainer>
                    <ProfileImage src={profileImg} />
                    <CardTextContainer>
                        <Grid alignItems="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>
                            <Grid item xs={4} sm={4} md={4}>
                                <CardBodyTitle>
                                    Nombre
                                </CardBodyTitle>
                                <CardBodyText>
                                    {userQuery.data && userQuery.data.payload.name + " " + userQuery.data.payload.first_last_name + " " + userQuery.data.payload.second_last_name}
                                </CardBodyText>
                            </Grid>

                            <Grid item xs={4} sm={4} md={4}>
                                <CardBodyTitle>
                                    Documento de Identidad
                                </CardBodyTitle>
                                <CardBodyText>
                                    {userQuery.data && stringToDominicanCedula(userQuery.data.payload.citizen_id)}
                                </CardBodyText>
                            </Grid>

                            <Grid item xs={4} sm={4} md={4}>
                                <CardBodyTitle>
                                    Telefono de contacto
                                </CardBodyTitle>
                                <CardBodyText>
                                    {userQuery.data && stringToDominicanPhoneNumber(userQuery.data.payload.phone)}
                                </CardBodyText>
                            </Grid>

                            <Grid item xs={4} sm={4} md={4}>
                                <CardBodyTitle>
                                    Ciudad
                                </CardBodyTitle>
                                <CardBodyText>
                                    {userQuery.data && userQuery.data.payload.province}
                                </CardBodyText>
                            </Grid>

                            <Grid item xs={4} sm={4} md={4}>
                                <CardBodyTitle>
                                    Correo Electrónico
                                </CardBodyTitle>
                                <CardBodyText>
                                    {userQuery.data && userQuery.data.payload.email}
                                </CardBodyText>

                            </Grid>
                        </Grid>
                    </CardTextContainer>
                </ProfileContainer>

                {
                    companiesQuery.isLoading || companiesQuery.isFetching ? null :
                        companiesQuery.data?.payload?.map((company) => (
                            <div key={company.id}>
                                <MediumHeightDivider />
                                <Row style={{ alignItems: 'center' }}>
                                    <SectionTitle>
                                        {company.company_name}
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
                                                    {company.company_rnc}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Teléfono
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {company.company_phone}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Dirección
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {company.company_address}
                                                </CardBodyText>
                                            </Grid>

                                            <Grid item xs={4} sm={4} md={4}>
                                                <CardBodyTitle>
                                                    Web
                                                </CardBodyTitle>
                                                <CardBodyText>
                                                    {company.company_url_web}
                                                </CardBodyText>
                                            </Grid>

                                        </Grid>

                                    </CardTextContainer>
                                </CardContainer>
                            </div>
                        ))
                }
                <FormModal onClose={() => handleModifyOrAddCompanyModal()} open={openModifyOrAddCompanyModal}
                    title={selectedCompany ? "Modificar empresa" : "Agregar empresa"}
                >
                    <SmallHeightDivider />
                    <Grid alignItems="flex-start" justifyContent="center" container direction="row" x spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item >
                            <TextField title="Documento de Identidad" type="text" id="company_rnc"
                                required
                                disabled={selectedCompany ? true : false}
                                mask="999-9999999-9"
                                unMaskedValue
                                value={companyFormik.values.company_rnc}
                                onChange={companyFormik.handleChange}
                                error={companyFormik.touched.company_rnc && Boolean(companyFormik.errors.company_rnc)}
                                helperText={companyFormik.touched.company_rnc && companyFormik.errors.company_rnc}
                            />
                        </Grid>
                        <Grid item >
                            <TextField title="Nombre comercial" type="text" id="company_name"
                                value={companyFormik.values.company_name}
                                onChange={companyFormik.handleChange}
                                error={companyFormik.touched.company_name && Boolean(companyFormik.errors.company_name)}
                                helperText={companyFormik.touched.company_name && companyFormik.errors.company_name}
                                required
                            />
                        </Grid>

                        <Grid item >
                            <TextField title="Teléfono" type="text" id="company_phone"
                                required
                                mask="999-999-9999"
                                value={companyFormik.values.company_phone}
                                onChange={companyFormik.handleChange}
                                error={companyFormik.touched.company_phone && Boolean(companyFormik.errors.company_phone)}
                                helperText={companyFormik.touched.company_phone && companyFormik.errors.company_phone}
                            />
                        </Grid>


                        <Grid item >
                            <TextField title="Dirección" type="text" id="company_address"
                                value={companyFormik.values.company_address}
                                onChange={companyFormik.handleChange}
                                error={companyFormik.touched.company_address && Boolean(companyFormik.errors.company_address)}
                                helperText={companyFormik.touched.company_address && companyFormik.errors.company_address}
                                required
                            />
                        </Grid>

                        <Grid item >
                            <TextField title="Web" type="text" id="company_url_web"
                                value={companyFormik.values.company_url_web}
                                onChange={companyFormik.handleChange}
                                error={companyFormik.touched.company_url_web && Boolean(companyFormik.errors.company_url_web)}
                                helperText={companyFormik.touched.company_url_web && companyFormik.errors.company_url_web}
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
            </Fragment>
        </Fade>

    );
}

export default MyProfile;
