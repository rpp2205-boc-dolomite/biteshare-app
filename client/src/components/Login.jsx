import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright.jsx';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { setSession } from '../helpers/cookie.js';


//const theme = createTheme();

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: false,
      error: false,
      phone_num: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.currentTarget);
    // console.log({
    //   phone: data.get('tel'),
    //   password: data.get('password'),
    // });
    var phone_num = data.get('tel')
    var password = data.get('password')
    axios.post(`/api/login/`, {
      'phone_num': phone_num,
      'password': password
    })
    .then(reply => {
      //redirect to dashboard
      // console.log('BACK IN SUCCESS', reply.data);
      // localStorage.setItem('user', JSON.stringify(reply.data));
      setSession(reply.data.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + reply.data.token;
      this.setState({
        user: true
      })
    })
    .catch((err) => {
      if (err && err.response && err.response.status === 401) {
        this.setState({
          error: err.response.data
        })
      } else {
        this.setState({
          error: 'Internal Server Error. Please try again at another time'
        })
        // console.log(err);
        // console.log(err.response.status)
      }

    })
  };
  render() {
    let { user, error } = this.state;
    return (
      <>
        {user && (
          <Navigate to='/meals' replace={true}/>
        )
        }
          <Typography align='center' sx={{height:'10%', m:1, p:0}} >
            <img src="../images/BOC-logo.png" alt="BiteShare Logo" width="175"></img>
          </Typography>
          <hr/>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && <p style={{ color: 'red', 'font-weight': 'bold' }}>{error}</p>}
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="tel"
                label="Phone Number"
                name="tel"
                autoComplete="tel"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </>
    );
  }
}
