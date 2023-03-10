// util
import { mockImgAvatar } from "./mockImages";
// components
import Scrollbar from "./Scrollbar";
import MenuPopover from "./MenuPopover";
import faker from "faker";
import PropTypes from "prop-types";
import { noCase } from "change-case";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { set, sub, formatDistanceToNow } from "date-fns";
import { Icon } from "@iconify/react";
import bellFill from "@iconify/icons-eva/bell-fill";
import clockFill from "@iconify/icons-eva/clock-fill";
import doneAllFill from "@iconify/icons-eva/done-all-fill";
// material
import { alpha } from "@material-ui/core/styles";
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../actions/users";
import axios from "axios";
import { path } from "../path";
import { useHistory } from "react-router-dom";
// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: "Your order is placed",
    description: "waiting for shipping",
    avatar: null,
    type: "order_placed",
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.findName(),
    description: "answered to your comment on the Minimal",
    avatar: mockImgAvatar(2),
    type: "friend_interactive",
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: "Your order is placed",
    description: "waiting for shipping",
    avatar: null,
    type: "order_placed",
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.findName(),
    description: "answered to your comment on the Minimal",
    avatar: mockImgAvatar(2),
    type: "friend_interactive",
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: "You have new message",
    description: "5 unread messages",
    avatar: null,
    type: "chat_message",
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: "You have new mail",
    description: "sent from Guido Padberg",
    avatar: null,
    type: "mail",
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: "Delivery processing",
    description: "Your order is being shipped",
    avatar: null,
    type: "order_shipped",
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: "Delivery processing",
    description: "Your order is being shipped",
    avatar: null,
    type: "order_shipped",
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: "Delivery processing",
    description: "Your order is being shipped",
    avatar: null,
    type: "order_shipped",
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: "Delivery processing",
    description: "Your order is being shipped",
    avatar: null,
    type: "order_shipped",
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: "Delivery processing",
    description: "Your order is being shipped",
    avatar: null,
    type: "order_shipped",
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === "order_placed") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-kit-react.vercel.app/static/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "order_shipped") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-kit-react.vercel.app/static/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "mail") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-kit-react.vercel.app/static/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "chat_message") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-kit-react.vercel.app/static/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title,
  };
}

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <Link to={"/user-request/" + notification.userRequest_id}>
      <ListItemButton
        disableGutters
        component={Box}
        sx={{
          py: 1.5,
          px: 2.5,
          mt: "1px",
          ...(notification.isUnRead && {
            bgcolor: "action.selected",
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.disabled",
              }}
            >
              <Box
                component={Icon}
                icon={clockFill}
                sx={{ mr: 0.5, width: 16, height: 16 }}
              />
              {formatDistanceToNow(new Date(notification.createdAt))}
            </Typography>
          }
        />
      </ListItemButton>
      </Link>
  );
}

export default function NotificationsPopover() {
  let loggedUser = useSelector((state) => state.user.user);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`loggedUser.notifications`, loggedUser.notifications);
    if (!loggedUser.notifications) return;

    const sortedNotifications = loggedUser.notifications.sort((a, b) =>
      new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
    );

    setNotifications(sortedNotifications);
  }, [loggedUser]);

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  // const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  const markNotificationAsRead = async (notificationIds) => {
    let url = `${path}api/users/mark-read`;
    const config = { headers: { "x-auth-token": loggedUser.token } };
    const res = await axios.post(
      url,
      { notificationIds: notificationIds },
      config
    );
    console.log(res.data);
  };

  const handleOpen = () => {
    const Ids = notifications.map((n) => n._id);
    console.log(Ids);
    markNotificationAsRead(Ids);
    dispatch(getUser());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );

    //  window.localStorage.setItem('isRead' ,)
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            py: 2,
            px: 2.5,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: "80vh" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {/* {notifications.slice(0, 2).map((notification) => ( */}
            {notifications.map(
              (notification) =>
                notification.isUnRead === true && (
                  <div>
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                    />
                  </div>
                )
            )}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                Before that
              </ListSubheader>
            }
          >
            {/* {notifications.slice(2, 5).map((notification) => ( */}
            {notifications.map(
              (notification) =>
                notification.isUnRead === false && (
                  <NotificationItem
                    key={notification._id}
                    notification={notification}
                  />
                )
            )}
          </List>
        </Scrollbar>

        <Divider />
      </MenuPopover>
    </>
  );
}
