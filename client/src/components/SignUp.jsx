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
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      error: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(event.currentTarget)
    var data = new FormData(event.currentTarget);
    var user = {
      name: data.get('username'),
      phone_num: data.get('tel'),
      password: data.get('password'),
      isGuest: false
    }
    // console.log({
    //   name: data.get('username'),
    //   phone_num: data.get('tel'),
    //   password: data.get('password'),
    // });
    axios.post(`/api/signup`, {user})
    // .then((result) => {
    //   console.log('res:',result);
    //   if (!result.data) {
    //     return axios.post('/api/users', user)
    //   } else if (result.data.is_guest) {
    //     // console.log('id', result.data.id);
    //     return axios.put(`/api/users/?user_id=${result.data.id}`, user)
    //   } else {
    //     this.setState({
    //       error: `You already has an account`
    //     })
    //     return null
    //   }
    // })
    // .then((data) => {
    //   if (data) {
    //     this.setState({
    //       success:true,
    //     })
    //   }
    // })
    .then((res) => {
      console.log('result', res);
      if (res.status === 200 || res.status === 203) {
        this.setState({
          success:true
        })
      }
    })
    .catch((err) => {
      console.log('Err', err.response);
      if (err.response.status === 400) {
        this.setState({
          error: err.response.data
        }, () => {
          setTimeout(() => {
            this.setState({
              success: false,
              error: false,
            })
          }, 2500)
        })

      }

    })
  };
  render() {
    let { success, error } = this.state;
    return (
      <>
        { success && (
          <Navigate to='/login' replace={true} />
        )}
          <Typography align='center' sx={{height:'10%', m:1, p:0}} >
            <img src="../images/BOC-logo.png" alt="BiteShare Logo" width="175"></img>
          </Typography>
          <hr/>
        <Container component="main" maxWidth="xs" >
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
              Sign up
            </Typography>
            {error && <p>{error}</p>}
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="What's your name?"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="tel"
                    autoComplete="tel"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </>
    );
  }
}


