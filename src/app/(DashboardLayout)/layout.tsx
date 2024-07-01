'use client'
import { useSelector } from '@/store/hooks'
import { AppState } from '@/store/store'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { styled, useTheme } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import AuthProvider from '../_providers/auth'
import HorizontalHeader from './layout/horizontal/header/Header'
import Navigation from './layout/horizontal/navbar/Navigation'
import Customizer from './layout/shared/customizer/Customizer'
import Header from './layout/vertical/header/Header'
import Sidebar from './layout/vertical/sidebar/Sidebar'

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}))

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}))

// interface Props {
//   children: React.ReactNode
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [isSidebarOpen, setSidebarOpen] = useState(true)
  // const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const customizer = useSelector((state: AppState) => state.customizer)
  const theme = useTheme()

  const { data: session } = useSession({ required: true })
  useEffect(() => {
    async function verifySession(data: unknown) {
      if (!data) {
        console.log('🚀 ~ session: layout', data)
      }
    }
    verifySession(session)
  }, [session])

  // if (session) {
  return (
    <MainWrapper>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {customizer.isHorizontal ? '' : <Sidebar />}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
        {/* PageContent */}
        {customizer.isHorizontal ? <Navigation /> : ''}
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}

          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            {/* <Outlet /> */}
            <AuthProvider>{children}</AuthProvider>
            {/* <Index /> */}
          </Box>

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        <Customizer />
      </PageWrapper>
    </MainWrapper>
  )
  // } else return <>{redirect('/api/auth/signin')}</>
}
