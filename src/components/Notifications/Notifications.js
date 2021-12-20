import { useState, useRef, memo, useEffect,Fragment } from 'react';
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

function Notifications({ color }) {

  const history = useHistory();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const PaperRef = useRef(null);

  const PendingNotifications = getRecentNotificationsLenght();

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    function handlePopoverOpen(event) {
      if (PaperRef.current && !PaperRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePopoverOpen);
  }, [PaperRef]);

  return (
    <Container ref={containerRef} onClick={handleMenuOpen}>

      <Badge badgeContent={PendingNotifications} color='secondary' overlap="circular">
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
              <MenuList ref={PaperRef}>
                {
                  MockupNotifications.map((item,index) => (
                      <NotificationContainer key={index} onClick={item.action} isRecent={item.isRecent}>
                        <NotificationTitle>{item.title}</NotificationTitle>
                        <NotificationText>{item.body}</NotificationText>
                        <Divider sx={{ width: '100%' }} />
                      </NotificationContainer>
                  ))
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