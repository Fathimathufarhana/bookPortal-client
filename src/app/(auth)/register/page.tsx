"use client"

import { useForm, Resolver } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormLabel, RadioGroup, Box, Grid, Link, Radio } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();


type FormValues = {
  first_name : string
  last_name : string
  email : string
  password : string
  gender : string
  date_of_birth : string
  phone_number : number
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.first_name ? values : {},
    errors: !values.first_name
      ? {
          first_name: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  }
}
export default function SignUp() {

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({ resolver })
const onSubmit = handleSubmit((data) =>{
  axios.post('http://localhost:3601/user/register', data)

})


  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField {...register('first_name')}
                    autoComplete="given-name"
                    name="first_name"
                    fullWidth
                    id="first_name"
                    InputLabelProps={{ shrink: true }}
                    label="First Name"
                    autoFocus
                  />
                  {errors?.first_name && <p>{errors.first_name.message}</p>}
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField {...register('last_name')}
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    InputLabelProps={{ shrink: true }}
                    name="last_name"
                    autoComplete="family-name"
                  />
                  {errors?.last_name && <p>{errors.last_name.message}</p>}
                </Grid>
  
                <Grid item xs={12}>
                  <TextField {...register('email')}
                    fullWidth
                    id="email"
                    label="Email Address"
                    InputLabelProps={{ shrink: true }}
                    name="email"
                    type='email'
                    autoComplete="email"
                  />
                  {errors?.email && <p>{errors.email.message}</p>}
                </Grid>
  
                <Grid item xs={12}>
                  <TextField {...register('password')}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    InputLabelProps={{ shrink: true }}
                    id="password"
                    autoComplete="new-password"
                  />
                  {errors?.password && <p>{errors.password.message}</p>}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    >
                    <FormControlLabel
                    {...register("gender")} id='gender' value="female" control={<Radio />} label="Female"/>
                    <FormControlLabel
                    {...register("gender")} id='gender' value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </Grid>
                
                 <Grid item xs={12}>
                  <TextField {...register('date_of_birth')}
                    fullWidth
                    name="date_of_birth"
                    label="date_of_birth"
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    id="date_of_birth"
                  />
                  {errors?.date_of_birth && <p>{errors.date_of_birth.message}</p>}
                </Grid> 
                
                <Grid item xs={12}>
                  <TextField {...register('phone_number')}
                    fullWidth
                    name="phone_number"
                    label="phone_number"
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    id="phone_number"
                  />
                  {errors?.phone_number && <p>{errors.phone_number.message}</p>}
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
    </ThemeProvider>
  );
}