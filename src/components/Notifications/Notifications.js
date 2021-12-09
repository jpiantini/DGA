import { useState, useRef, useEffect } from "react";
import Popper from "@mui/material/Popper";
import {
  Container,
  NotificationContainer,
  StyledNotificationIcon,
  StyledPaper,
  NotificationTitle,
  NotificationText,
} from './styles/NotificationStyle';
import Badge from "@mui/material/Badge";


function Notifications({ color, fontSize }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const containerRef = useRef();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (anchorEl) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [anchorEl]);
  /*
  const handleClick = (event) => {
    if (!document.getElementById(id).contains(event.target)) {
      setAnchorEl(null);
      setCustomOpen(false);
    }
  };
*/
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const datos = 56;
  return (
    <Container>
      <Badge badgeContent={datos} color='secondary'>
        <StyledNotificationIcon
          color={color}
          fontSize={fontSize}
          onClick={handleClick}
        />
      </Badge>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={containerRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "rigth",
        }}
      >
        {/*  <Popper
        open={open}
        onClose={() => setOpen(false)}
        role={undefined}
        placement='bottom-end'
        transition
        disablePortal
        anchorEl={containerRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >*/}

        <StyledPaper>
          <NotificationContainer>
            <NotificationTitle>Notificaciones</NotificationTitle>
            <textContainer>
              <NotificationText>
                2021 MUI developer survey 2021 MUI developer survey
              </NotificationText>
            </textContainer>
            <textContainer>
              <NotificationText>
                2021 MUI developer survey 2021
              </NotificationText>
            </textContainer>
            <textContainer>
              <NotificationText>
                2021 MUI developer survey 2021 MUI developer survey
              </NotificationText>
            </textContainer>
          </NotificationContainer>
        </StyledPaper>
      </Popper>
    </Container>
  );
}

export default Notifications;
