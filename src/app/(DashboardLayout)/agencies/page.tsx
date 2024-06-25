import PageContainer from '@/app/components/container/PageContainer'
import ParentCard from '@/app/components/shared/ParentCard'
import { Box, Grid } from '@mui/material'
import Breadcrumb from '../layout/shared/breadcrumb/Breadcrumb'

export default async function Agencies() {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Agências',
    },
  ]

  // const [agencies] = await Promise.all([getAgencies()])

  // const agenciesData = data

  // const tableHeaders = [
  //   'Nome',
  //   'Email',
  //   'Status',
  //   'Criado',
  //   'Atualizado',
  //   'Ações',
  // ]

  return (
    <PageContainer title="Agências" description="lista de Agências">
      <Breadcrumb title="Agências" items={BCrumb} />
      <ParentCard title="Agências">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              {/* <CustomTable
                pageName="Agências"
                data={agenciesData}
                tableHeaders={tableHeaders}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  )
}
