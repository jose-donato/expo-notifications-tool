import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Notifications from "@material-ui/icons/Notifications";
import HelpIcon from "@material-ui/icons/Help";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

import axios from "axios";
import Table from "./components/table";

const NOTIFICATIONS_SERVER = "https://easy-soup.glitch.me/message";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  table: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    position: "fixed",
    top: 10,
    right: 10
  }
}));

const App = () => {
  const [fields, setFields] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const handleFields = e =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const sendNotification = async e => {
    e.preventDefault();
    const title = fields.title;
    const body = fields.body;
    if (title === "" || body === "") {
      alert("title/body cannot be empty");
      return;
    }

    setLoading(true);
    const req = await axios.post(NOTIFICATIONS_SERVER, {
      title,
      body
    });
    setFields({ title: "", body: "" });
    setLoading(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Expo Notifications Tool
        </Typography>
        <Avatar className={classes.avatar}>
          <Notifications />
        </Avatar>

        {loading && <CircularProgress />}
        <form
          className={classes.form}
          noValidate
          onSubmit={sendNotification}
          id="formR"
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            value={fields.title}
            onChange={handleFields}
            autoComplete="title"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Body"
            name="body"
            value={fields.body}
            onChange={handleFields}
            autoComplete="body"
            autoFocus
          />
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send Notifications
              </Button>
            </Grid>
            <Grid item xs={2} style={{ alignSelf: "center" }}>
              <Tooltip title="You need to setup your server before sending notifications. Check github repo for more info!">
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className={classes.table}>
        <Typography variant="subtitle1">
          Last Notifications Sent (Example):
        </Typography>
        <Table />
      </div>
      <div className={classes.icons}>
        <Tooltip title="See Source Code">
          <IconButton>
            <Link
              color="inherit"
              target="__blank"
              rel="noopener"
              href="https://github.com/jose-donato/expo-notifications-tool"
            >
              <GitHubIcon />
            </Link>
          </IconButton>
        </Tooltip>
        <Tooltip title="Questions? DM me">
          <IconButton>
            <Link
              color="inherit"
              target="__blank"
              rel="noopener"
              href="https://twitter.com/whynot1__"
            >
              <TwitterIcon />
            </Link>
          </IconButton>
        </Tooltip>
      </div>
    </Container>
  );
};
export default App;
