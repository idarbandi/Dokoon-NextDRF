/** ********************************************************************************
 * Dokoon Project
 * Author: Idarbandi
 * GitHub: https://github.com/idarbandi/Dokoon-NextDRF
 * Email: darbandidr99@gmail.com
 *
 * This project was developed by Idarbandi.
 * We hope you find it useful! Contributions and feedback are welcome.
 * ****************************************************************************** */

import React, { useState, useEffect, forwardRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { LocalActivityOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

// استایل‌های فرم ورود
const useDokoonLoginStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorContainer: { marginTop: 20, marginBottom: 20 },
  errorAlert: { backgroundColor: '#f44336' },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// ماشین وضعیت برای لاگین
const loginMachine = createMachine(
  {
    id: 'login',
    initial: 'idle',
    context: { error: null },
    states: {
      idle: { on: { SUBMIT: 'loading' } },
      loading: {
        invoke: {
          id: 'loginRequest',
          src: async (context, event) => {
            const response = await fetch('http://localhost:8000/account/login/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': event.csrfToken,
              },
              credentials: 'include',
              body: JSON.stringify({ username: event.username, password: event.password }),
            });
            if (!response.ok) {
              try {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'ورود ناموفق'); // Persian Error Message
              } catch (parseError) {
                throw new Error('ورود ناموفق: پاسخ نامعتبر از سرور'); // Persian Error Message
              }
            }
            return response.json();
          },
          onDone: { target: 'success' },
          onError: { target: 'failure', actions: 'assignError' },
        },
      },
      success: {
        entry: 'redirectToDashboard',
        type: 'final',
      },
      failure: { on: { SUBMIT: 'loading' } },
    },
  },
  {
    actions: {
      assignError: assign({ error: (context, event) => event.data.message }),
      redirectToDashboard: () => {
        if (typeof window !== 'undefined') {
          router.push('/dashboard');
        }
      },
    },
  }
);

// کامپوننت فرم ورود
const DokoonLogin = forwardRef((props, ref) => {
  const classes = useDokoonLoginStyles();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState(null);
  const [state, send] = useMachine(loginMachine);

  useEffect(() => {
    const fetchCSRF = async () => {
      try {
        const res = await fetch('http://localhost:8000/account/csrf/', { credentials: 'include' });
        if (!res.ok) {
          throw new Error(`خطا در دریافت توکن امنیتی! وضعیت: ${res.status}`); // Persian Error Message
        }
        const token = res.headers.get('X-CSRFToken');
        setCsrfToken(token);
      } catch (err) {
        console.error('خطا در CSRF:', err); // Persian Error Message
      }
    };

    fetchCSRF();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!csrfToken) {
      return; // Prevent submission if CSRF is not available
    }
    send({ type: 'SUBMIT', username, password, csrfToken });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box className={classes.errorContainer}>
          {state.context.error && <Alert severity="error">{state.context.error}</Alert>}
        </Box>
        <Avatar className={classes.avatar}>
          <LocalActivityOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          ورود {/* Sign In in Persian */}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate ref={ref}>
          {state.matches('loading') && <div>در حال بارگذاری...</div>} {/* Loading in Persian */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="نام کاربری" // Username in Persian
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="رمز عبور" // Password in Persian
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="مرا به خاطر بسپار" />{' '}
          {/* Remember me in Persian */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={state.matches('loading') || !csrfToken}
          >
            ورود {/* Sign In in Persian */}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                رمز عبور را فراموش کرده‌اید؟ {/* Forgot Password in Persian */}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                حساب کاربری ندارید؟ ثبت نام کنید {/* Don't have an account? Sign Up in Persian */}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
});

export default DokoonLogin;
