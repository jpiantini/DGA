import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import {
  SmallHeightDivider,
  MediumHeightDivider,
  StyledButtonOutlined,
  StyledPagination,
} from '../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import {
  ButtonContainer,
  Container,
  ListContainer,
} from './styles/RequestedServiceListStyles';
import { useFormik } from 'formik';
import { formInitialState, FormSchema, Filters } from './RequestedServiceListConstants';
import { Grid } from '@mui/material';
import TextField from '../../components/TextField/TextField';
import Select from '../../components/Select/Select';
import RequestCard from '../../components/RequestCard/RequestCard';
import COLORS from '../../theme/Colors';
import { getRequestedServices, getRequestedServicesWithFilters } from '../../api/RequestedServiceList';
import {  useQueryClient } from 'react-query';
//import { cacheConfig } from '../../cacheConfig';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function RequestedServiceList() {
  const matchesWidth = useMediaQuery('(min-width:768px)');
  const history = useHistory();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [requestedServices, setRequestedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [findingWithFilter, setFindingWithFilter] = useState(false);

  const userData = queryClient.getQueryData(['userData']);


    /* const { data: requestedServices, isLoading, refetch } = useQuery(['requestedServices', currentPage], () => getRequestedServices(queryClient.getQueriesData['userData'].citizen_id, currentPage, status, formik.values),
     { staleTime: cacheConfig.staleTimeForRequestedServicesList })
 */

  //TO DO GET THE STATUS AS PARAM FROM URL 
  const status = 1;

  const formik = useFormik({
    initialValues: formInitialState,
    validationSchema: FormSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      setFindingWithFilter(true);
      handleChangePage(1);
      handleFindRequests(1);
    },
  });

  const getAndSetRequestedServiceList = async (page) => {
    setIsLoading(true);
    let response = await getRequestedServices(userData.payload.citizen_id, page, status);
    setRequestedServices(response)
    setIsLoading(false);
  }

  const getAndSetRequestedServiceListWithFilters = async (page) => {
    setIsLoading(true);
    let response = await getRequestedServicesWithFilters(userData.payload.citizen_id, page, status, formik.values);
    setRequestedServices(response)
    setIsLoading(false);
  }

  const handleFindRequests = (page) => {
    if (formik.values.filterType !== '' || formik.values.requestID !== '') {
      getAndSetRequestedServiceListWithFilters(page);
    } else {
      getAndSetRequestedServiceList(page);
    }
  };

  const handleRemoveFilters = () => {
    formik.resetForm();
    handleChangePage(1);
    getAndSetRequestedServiceList();
    //  queryClient.resetQueries(['requestedServices'])
  }

  const handleChangePage = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  }

  useLayoutEffect(() => {
    getAndSetRequestedServiceList(1);
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle('Listado de servicios solicitados')); // TITLE OF SUBHEADER APP
  }, []);


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
            title="Filtro"
            id='filterType'
            data={Filters}
            value={formik.values.filterType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.filterType && Boolean(formik.errors.filterType)}
            helperText={formik.touched.filterType && formik.errors.filterType}
            required
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
            required
          />
        </Grid>

        <Grid item xs={8} sm={1} md={1} alignSelf='center'>
          {
            formik.values.requestID !== '' || findingWithFilter ?
              <IconButton onClick={() => handleRemoveFilters()} aria-label="delete">
                <DeleteIcon titleAccess='Eliminar filtro' color='error' sx={{ fontSize: '1.5em' }} />
              </IconButton>
              :
              null
          }
        </Grid>

        <Grid item xs={8} sm={7} md={3} alignSelf='center'>
          <ButtonContainer>
            <StyledButtonOutlined onClick={formik.handleSubmit} variant='outlined'>
              Buscar
            </StyledButtonOutlined>
          </ButtonContainer>
        </Grid>
      </Grid>
      <MediumHeightDivider />
      <ListContainer>

        {isLoading == false &&
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

        <StyledPagination count={requestedServices.last_page} page={currentPage}
          onChange={(event, page) => {
            handleChangePage(page);
            handleFindRequests(page);
          }} variant="outlined" shape="rounded" sx={{ color: COLORS.primary }} />
      </ListContainer>


    </Container>
  );
}

export default RequestedServiceList;
