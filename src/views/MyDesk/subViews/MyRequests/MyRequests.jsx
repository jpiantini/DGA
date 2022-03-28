import { useState, Fragment, useRef, useLayoutEffect } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider, Row, SmallHeightDivider, StyledButtonOutlined, StyledPagination } from '../../../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { MockupCompletedRequests, MockupInProcessRequests, MockupRejectedRequests, requestFilterTypes } from '../../MyDeskConstants';
import RequestCard from '../../../../components/RequestCard/RequestCard';
import Fade from 'react-reveal/Fade';
import { ListContainer, SectionTextDivider, SectionTitle } from '../../styles/MyDeskStyles';
import { useQuery, useQueryClient } from 'react-query';
import { getRequestedServicesWithFilters } from '../../../../api/RequestedServiceList';
import COLORS from '../../../../theme/Colors';
import Select from '../../../../components/Select/Select';
import TextField from '../../../../components/TextField/TextField';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CenterLoading from '../../../../components/CenterLoading/CenterLoading';

function MyRequests() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();

    const queryClient = useQueryClient();
    const userData = queryClient.getQueryData(['userData']);

    //completado,cancelado,en proceso
    const [isLoading, setIsLoading] = useState(true);

    const [requestType, setRequestType] = useState(1);
    const [requestName, setRequestName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [stringFilter, setStringFilter] = useState('')

    const titleRef = useRef(null);

    const { data: requestsList, isLoading: requestListIsLoading } =
        useQuery(['requestsList', requestType, stringFilter, currentPage], () =>
            getRequestedServicesWithFilters(userData.payload.citizen_id, currentPage, requestType, stringFilter));

    const handleTypeChange = (value) => {
        setRequestType(value.target.value);
        setRequestName('');
        handlePageChange(1);
        titleRef.current.scrollIntoView()
    }

    const handlePageChange = (value) => {
        setCurrentPage(value);
        titleRef.current.scrollIntoView()
    }

    const handleStringFilter = () => {
        setStringFilter(requestName)
    }

    const handleRemoveFilters = () => {
        setStringFilter('');
        setRequestName('')
    }

    if (requestListIsLoading) return <CenterLoading/>;

    return (
        <Fade right >
            <MediumHeightDivider />
            <Row style={{ justifyContent: 'space-between' }}>
                <Row style={{ alignItems: 'center', width: '75%' }}>
                    <SectionTitle ref={titleRef}>
                        {`Solicitudes ${requestFilterTypes.find((type) => type.value == requestType)?.label?.toLowerCase()}`}
                    </SectionTitle>
                </Row>
                <Select
                    id='filterType'
                    data={requestFilterTypes}
                    value={requestType}
                    onChange={handleTypeChange}
                    disableEmptyValue
                />
            </Row>
            <div style={{ height: '5px' }} />

            <Row style={{ alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ width: '60%' }}>
                    <TextField
                        placeholder='Nombre o número de solicitud'
                        type='text'
                        id='requestID'
                        value={requestName}
                        onChange={(e) => setRequestName(e.target.value)}
                    />
                </div>
                { stringFilter.length > 0 &&
                    <div style={{ width: '10%' }}>
                <IconButton onClick={() => handleRemoveFilters()} aria-label="delete">
                    <DeleteIcon titleAccess='Eliminar filtro' color='error' sx={{ fontSize: '1.5em' }} />
                </IconButton>
                </div>
                }
                
                <div style={{ width: '20%' }}>
                    <StyledButtonOutlined onClick={handleStringFilter} variant='outlined'>
                        Buscar
                    </StyledButtonOutlined>
                </div>
            </Row>

            <ListContainer>
                {
                    requestsList?.data?.map((request, index) => (
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
                                />
                        </Fragment>
                    ))
                }

                <MediumHeightDivider />
                {
                    requestsList?.data?.length > 0 ?
                        <StyledPagination count={requestsList?.last_page} page={currentPage}
                            onChange={(event, page) => {
                                handlePageChange(page);
                            }} variant="outlined" shape="rounded" sx={{ color: COLORS.primary }} />
                        :
                        <SectionTitle>
                            No se encontraron registros
                        </SectionTitle>
                }

                <MediumHeightDivider />
            </ListContainer>
        </Fade>

    );
}

export default MyRequests;
