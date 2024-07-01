import { useSelector } from '@/store/hooks'
import { AppState } from '@/store/store'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { IconPower } from '@tabler/icons-react'
import { signOut, useSession } from 'next-auth/react'

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer)
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const {data: session, status} = useSession()
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : ''

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={session?.user?.image || '/images/profile/user-1.jpg'}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">{session?.user?.name}</Typography>
            <Typography variant="caption">Designer</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                onClick={() => signOut()}
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
