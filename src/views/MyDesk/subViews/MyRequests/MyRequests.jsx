import { useState, Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider, SmallHeightDivider } from '../../../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { MockupCompletedRequests, MockupInProcessRequests, MockupRejectedRequests } from '../../MyDeskConstants';
import RequestCard from './../../components/RequestCard/RequestCard';
import Fade from 'react-reveal/Fade';

function MyRequests() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <Fade right >
            <MediumHeightDivider />
            <TextInformation title="Solicitudes en proceso" />

            {
                MockupInProcessRequests.map((request) => (
                    <Fragment key={request.id}>
                        <SmallHeightDivider />
                        <RequestCard title={request.title} percent={request.percent}
                            // onClick={() => handleRequestDetailModalStatus(request)}
                            onClick={() => history.push(`/app/serviceRequestedDetails/${request.serviceID}/${request.id}`)}
                            variant={request.status} />
                    </Fragment>
                ))
            }

            <MediumHeightDivider />
            <TextInformation title="Solicitudes Completadas" />

            {
                MockupCompletedRequests.map((request) => (
                    <Fragment key={request.id}>
                        <SmallHeightDivider />
                        <RequestCard title={request.title} percent={'100%'}
                            //   onClick={() => handleRequestDetailModalStatus(request)}
                            onClick={() => history.push(`/app/serviceRequestedDetails/${request.serviceID}/${request.id}`)}
                            variant={request.status} />
                    </Fragment>
                ))
            }

            <MediumHeightDivider />
            <TextInformation title="Solicitudes Rechazadas" />

            {
                MockupRejectedRequests.map((request) => (
                    <Fragment key={request.id}>
                        <SmallHeightDivider />
                        <RequestCard title={request.title} percent={'100%'}
                            //   onClick={() => handleRequestDetailModalStatus(request)}
                            onClick={() => history.push(`/app/serviceRequestedDetails/${request.serviceID}/${request.id}`)}
                            variant={request.status} />
                    </Fragment>
                ))
            }
        </Fade>

    );
}

export default MyRequests;
