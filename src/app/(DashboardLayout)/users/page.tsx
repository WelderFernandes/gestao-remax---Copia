import { getUsers } from '@/app/_actions/user'
import PageContainer from '@/app/components/container/PageContainer'
import ParentCard from '@/app/components/shared/ParentCard'
import { Box, Grid } from '@mui/material'
import CustomTable from '../_components/CustomTable'
import Breadcrumb from '../layout/shared/breadcrumb/Breadcrumb'

export default async function Users() {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Usuárias',
    },
  ]

  const [usersT] = await Promise.all([getUsers()])

  console.log('🚀 ~ file: page.tsx:Users ~ users:', usersT.results)

  // const usersData = userFakes

  const tableHeaders = [
    'Nome',
    'Email',
    'Status',
    // 'Criado',
    // 'Atualizado',
    'Ações',
  ]

  return (
    <PageContainer title="Usuárias" description="lista de Usuárias">
      <Breadcrumb title="Usuárias" items={BCrumb} />
      <ParentCard title="Usuárias">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <CustomTable
                data={usersT}
                tableHeaders={tableHeaders}
                pageName="Usuárias"
              />
            </Box>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  )
}
