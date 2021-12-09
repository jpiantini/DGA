import { useState, useRef } from "react";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import {
  Container,
  NotificationContainer,
  StyledNotificationIcon,
  StyledPaper,
  NotificationTitle,
  NotificationText,
} from "./styles/NotificationStyle";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
function Notifications({ color }) {
  //const history = useHistory();
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 89) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }
  const datos = 55;
  return (
    <Container ref={containerRef}>
      <IconButton aria-label={notificationsLabel(datos)}>
        <Badge badgeContent={datos} color="secondary">
          <StyledNotificationIcon
            color={color}
            onClick={() => setOpen(!open)}
          />
        </Badge>
      </IconButton>

      {/*<NotificationIcon className="material-icons md-48">
        notifications
  </NotificationIcon>*/}

      <Popper
        open={open}
        onClose={() => setOpen(false)}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        anchorEl={containerRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "right top",
            }}
          >
            <StyledPaper>
              <NotificationContainer>
                <NotificationTitle>Notificaciones</NotificationTitle>
                <NotificationText>
                  {" "}
                  2021 MUI developer survey 2021 MUI developer survey
                </NotificationText>
              </NotificationContainer>
            </StyledPaper>
          </Grow>
        )}
      </Popper>
    </Container>
  );
}

export default Notifications;
