import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
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
  Container,
  ListContainer,
  StyledPagination
} from './styles/RequestedServiceListStyles';
import { useFormik } from 'formik';
import { FormSchema, MockupCompanies, MockupInProcessRequests } from './RequestedServiceListConstants';
import { Grid } from '@mui/material';
import TextField from '../../components/TextField/TextField';
import Select from '../../components/Select/Select';
import Pagination from '@mui/material/Pagination';
import RequestCard from '../../components/RequestCard/RequestCard';
import COLORS from '../../theme/Colors';
import { getRequestedServices } from '../../api/RequestedServiceList';
import { useQuery } from 'react-query';
import { HideGlobalLoading, ShowGlobalLoading } from '../../redux/actions/UiActions';


function RequestedServiceList() {
  const matchesWidth = useMediaQuery('(min-width:768px)');
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentPage,setCurrentPage] = useState(1);
  const status = 1;

  const { data: requestedServices, isLoading } = useQuery(['requestedServices',currentPage], () => getRequestedServices(currentPage, status))


  const formik = useFormik({
    initialValues: {
      companyID: "",
      requestID: "",
    },
    validationSchema: FormSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      //  DO SOMETHING

    },
  });

  const handleChangePage = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  }


  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle('Listado de servicios solicitados')); // TITLE OF SUBHEADER APP
  }, []);

  if (isLoading) return null;

  return (
    <Container>
      <SmallHeightDivider />
      <Grid
        alignItems='center'
        justifyContent='center'
        container
        direction='row'
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 8, sm: 8, md: 12 }}
      >

        <Grid item xs={8} sm={8} md={4}>
          <Select
            title="Empresa"
            id='companyID'
            data={MockupCompanies}
            value={formik.values.companyID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.companyID && Boolean(formik.errors.companyID)}
            helperText={formik.touched.companyID && formik.errors.companyID}
          />
        </Grid>

        <Grid item xs={8} sm={8} md={4}>
          <TextField
            title='ID de solicitud'
            type='text'
            id='requestID'
            value={formik.values.requestID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.requestID && Boolean(formik.errors.requestID)}
            helperText={formik.touched.requestID && formik.errors.requestID}
          />
        </Grid>

        <Grid item xs={8} sm={8} md={4} alignSelf='center'>
          <ButtonContainer>
            <StyledButtonOutlined onClick={formik.handleSubmit} variant='outlined'>
              Buscar
            </StyledButtonOutlined>
          </ButtonContainer>
        </Grid>
      </Grid>
      <MediumHeightDivider />
      <ListContainer>

        {
          requestedServices.data.map((request, index) => (
            <Fragment key={request.id}>
              {
                index > 0 &&
                <SmallHeightDivider />
              }
              <RequestCard title={request.service.name} percent={request.progress + "%"}
                date={request.created_at}
                company={request?.company}
                requestCode={request.code}
                status={request.status.name}
                actionRequired={request.request_actions}
                onClick={() => history.push(`/app/serviceRequestedDetails/${request.id}`)}
                statusID={request.status.id}
                variant={"inProcess"} />
            </Fragment>
          ))
        }

        <MediumHeightDivider />

        <StyledPagination count={requestedServices.last_page} page={currentPage} onChange={(event,page) => handleChangePage(page)} variant="outlined" shape="rounded" sx={{ color: COLORS.primary }} />
      </ListContainer>


    </Container>
  );
}

export default RequestedServiceList;
