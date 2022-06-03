import { useState, useRef, memo, useEffect, Fragment } from 'react';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  Container, NotificationContainer, NotificationText, NotificationTitle, StyledNotificationIcon, StyledPaper,
} from './styles/NotificationStyle';
import { getRecentNotificationsLenght, MockupNotifications } from './NotificationsConstants'
import { Badge } from '@mui/material';
import useOnClickOutside from '../../utilities/hooks/useOnClickOutside'
import LocalStorageService from '../../services/LocalStorageService';
import { getNotifications, removeNotification } from '../../api/Notifications';
import { useQuery, useMutation, useQueryClient } from 'react-query';

function Notifications({ color }) {

  const history = useHistory();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [citizenID, setCitizenID] = useState();
  const containerRef = useRef(null);
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(['notificationsData', citizenID], () => getNotifications(citizenID), {
    enabled: typeof citizenID === 'string' ? true : false
  })
  const mutation = useMutation(removeNotification);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  }

  useOnClickOutside(containerRef, () => setMenuOpen(false));

  const handleNotificationClick = async (item) => {
    mutation.mutate({
      citizenID,
      requestData: {
        notification: item.notification_id
      }
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries('notificationsData')
      },
    })
    if(item["iD de solicitud"] !== undefined){
    history.push(`/app/serviceRequestedDetails/${item["iD de solicitud"]}`)
    }
  }
  console.log(citizenID)

  useEffect(() => {
    setCitizenID(LocalStorageService.getItem('user_cedula'));
  }, [citizenID]);
  return (
    <Container ref={containerRef} onClick={handleMenuOpen}>
      <Badge badgeContent={data?.notifications?.length} color='secondary' overlap="circular">
        <StyledNotificationIcon color={color} />
      </Badge>
      <Popper
        open={menuOpen}
        anchorEl={containerRef.current}
        role={undefined}
        placement='bottom-end'
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                'right top',
            }}
          >
            <StyledPaper>
              <MenuList sx={{height:'500px',overflowY:'auto',overflowX: 'hidden'}}>
                {
                  data?.notifications?.length > 0 ?
                    data.notifications?.map((item, index) => (
                      <NotificationContainer key={index} onClick={() => handleNotificationClick(item)} isRecent={true}>
                        <NotificationTitle>{item.Evento}</NotificationTitle>
                        <NotificationText>{item.title}</NotificationText>
                        <Divider sx={{ width: '100%' }} />
                      </NotificationContainer>
                    ))
                    :
                    <NotificationContainer isRecent={true}>
                      <NotificationTitle>No hay notificaciones</NotificationTitle>
                    </NotificationContainer>

                }
              </MenuList>
            </StyledPaper>
          </Grow>
        )}
      </Popper>
    </Container >
  );
}

export default memo(Notifications);