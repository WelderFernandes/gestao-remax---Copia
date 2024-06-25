'use client'
import { loginType } from '@/app/(DashboardLayout)/types/auth/auth'
import { SignInProps, signIn } from '@/app/_actions/login'
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox'
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import { Alert, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as yup from 'yup'
import AuthSocialButtons from './AuthSocialButtons'

export default function AuthLogin({ title, subtitle, subtext }: loginType) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()
  async function HandleSignIn(values: SignInProps) {
    try {
      setIsSubmitting(true)
      const response = await signIn(values)
      console.log('🚀 ~ HandleSignIn ~ response:', response)
      if (response?.access_token) {
        router.push('/')
      } else {
        console.log('🚀 ~ HandleSignIn ~ error:', errorMessage)
        setErrorMessage('Credenciais inválidas')
      }
    } catch (error) {
      console.log({ error })
    } finally {
      setIsSubmitting(false)
    }
  }
  // const router = useRouter()
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Entre com um email válido')
      .required('Email é obrigatório'),
    password: yup.string(),
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values: SignInProps) => {
      HandleSignIn(values)
    },
  })
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            ou
          </Typography>
        </Divider>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="email">E-mail</CustomFormLabel>
            <CustomTextField
              id="email"
              type="email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Manter conectado"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/auth/auth1/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Esqueci minha senha ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            Entrar
            {isSubmitting && (
              <CircularProgress color="secondary" size={20} sx={{ ml: 1 }} />
            )}
          </Button>
        </Box>
      </form>
      {errorMessage && (
        <Alert sx={{ my: 1, color: 'white' }} severity="error" variant="filled">
          {errorMessage}
        </Alert>
      )}

      {subtitle}
    </>
  )
}
