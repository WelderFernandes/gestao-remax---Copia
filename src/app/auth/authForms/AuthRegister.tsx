import { registerType } from '@/app/(DashboardLayout)/types/auth/auth'
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import * as yup from 'yup'
import AuthSocialButtons from './AuthSocialButtons'

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Nome deve ter pelo menos 2 letras')
    .max(50, 'Nome deve ter no maximo 50 letras')
    .required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Entre com um email válido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória'),
  changepassword: yup.string().when('password', {
    is: (val: string) => !!(val && val.length > 0),
    then: yup
      .string()
      .oneOf([yup.ref('password')], 'Ambas as senhas precisam ser iguais'),
  }),
})

export default function AuthRegister({
  title,
  subtitle,
  subtext,
}: registerType) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      changepassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
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
      <AuthSocialButtons title="Sign up with" />

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
        <Box>
          <Stack mb={3}>
            <CustomFormLabel htmlFor="name">Nome</CustomFormLabel>
            <CustomTextField
              id="name"
              variant="outlined"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <CustomFormLabel htmlFor="email">E-mail</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
            <CustomTextField
              id="password"
              variant="outlined"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <CustomFormLabel htmlFor="confirmPassword">
              Confirmar senha
            </CustomFormLabel>
            <CustomTextField
              id="changepassword"
              variant="outlined"
              fullWidth
              value={formik.values.changepassword}
              onChange={formik.handleChange}
              error={
                formik.touched.changepassword &&
                Boolean(formik.errors.changepassword)
              }
              helperText={
                formik.touched.changepassword && formik.errors.changepassword
              }
            />
          </Stack>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            fullWidth
            component={Button}
          >
            Cadastrar
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  )
}
