import { useState, Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider, Row, SmallHeightDivider, StyledButtonOutlined } from '../../../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { MockupCompletedRequests, MockupInProcessRequests, MockupRejectedRequests } from '../../MyDeskConstants';
import RequestCard from '../../../../components/RequestCard/RequestCard';
import Fade from 'react-reveal/Fade';
import { SectionTextDivider, SectionTitle } from '../../styles/MyDeskStyles';

function MyRequests() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <Fade right >
            <MediumHeightDivider />
            <Row style={{ justifyContent: 'space-between' }}>
                <Row style={{ alignItems: 'center', width: '75%' }}>
                    <SectionTitle>
                        Solicitudes en proceso
                    </SectionTitle>
                </Row>
                <div style={{ width: '25%' }}>
                    <StyledButtonOutlined onClick={() => history.push('/app/requestedServicesList/1')} variant="outlined">
                        Ver todas
                    </StyledButtonOutlined>
                </div>
            </Row>
            <div style={{ height: '5px' }} />

            {
                MockupInProcessRequests.map((request, index) => (
                    <Fragment key={request.id}>
                        {
                            index > 0 &&
                            <SmallHeightDivider />
                        }
                        <RequestCard title={request.title} percent={request.percent}
                            // onClick={() => handleRequestDetailModalStatus(request)}
                            onClick={() => history.push(`/app/serviceRequestedDetails/${request.serviceID}/${request.id}/${request.status}`)}
                            variant={request.status} />
                    </Fragment>
                ))
            }

            <MediumHeightDivider />
            <Row style={{ justifyContent: 'space-between' }}>
                <Row style={{ alignItems: 'center', width: '75%' }}>
                    <SectionTitle>
                        Solicitudes completadas
                    </SectionTitle>
                </Row>
                <div style={{ width: '25%' }}>
                    <StyledButtonOutlined onClick={() => history.push('/app/requestedServicesList/2')} variant="outlined">
                        Ver todas
                    </StyledButtonOutlined>
                </div>
            </Row>
            <div style={{ height: '5px' }} />

            {
                MockupCompletedRequests.map((request, index) => (
                    <Fragment key={request.id}>
                        {
                            index > 0 &&
                            <SmallHeightDivider />
                        }
                        <RequestCard title={request.title} percent={'100%'}
                            //   onClick={() => handleRequestDetailModalStatus(request)}
                            onClick={() => history.push(`/app/serviceRequestedDetails/${request.serviceID}/${request.id}/${request.status}`)}
                            variant={request.status} />
                    </Fragment>
                ))
            }

            <MediumHeightDivider />
            <Row style={{ justifyContent: 'space-between' }}>
                <Row style={{ alignItems: 'center', width: '75%' }}>
                    <SectionTitle>
                        Solicitudes rechazadas
                    </SectionTitle>
                </Row>
                <div style={{ width: '25%' }}>
                    <StyledButtonOutlined onClick={() => history.push('/app/requestedServicesList/3')} variant="outlined">
                        Ver todas
                    </StyledButtonOutlined>
                </div>
            </Row>
            <div style={{ height: '5px' }} />

            {
                MockupRejectedRequests.map((request, index) => (
                    <Fragment key={request.id}>
                        {
                            index > 0 &&
                            <SmallHeightDivider />
                        }
                        <RequestCard title={request.title} percent={'100%'}
                            //   onClick={() => handleRequestDetailModalStatus(request)}
                            onClick={() => history.push(`/app/serviceRequestedDetails/${request.serviceID}/${request.id}/${request.status}`)}
                            variant={request.status} />
                    </Fragment>
                ))
            }
        </Fade>

    );
}

export default MyRequests;
