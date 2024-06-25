'use client'
import PageContainer from '@/app/components/container/PageContainer'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// components
import { agencieRankFaker } from '@/fakers/agencies-rank'
import { brokerRankFakerData } from '@/fakers/broker-rank'
import { topCardsFaker } from '@/fakers/top-cards'
import { useEffect, useState } from 'react'
import {
  TableFilterForDate,
  TableFilterForDateProps,
} from './_components/TableFilterForDate'
import { TopCardDataProps, TopCards } from './_components/TopCards'

export default function Dashboard() {
  const [topCardsData, setTopCardsData] = useState<TopCardDataProps[]>([])
  const [agencyRankData, setAgencyRankData] = useState<
    TableFilterForDateProps[]
  >([])
  const [brokerRankData, setBrokerRankData] = useState([])

  useEffect(() => {
    async function getTopCards() {
      // const response = await getTopCardsData()
      setTopCardsData(topCardsFaker)
    }

    async function getAgencyRank() {
      // const response = await getAgencyRankData()
      setAgencyRankData(agencieRankFaker)
    }

    async function getBrokerRank() {
      // const response = await getBrokerRankData()
      setBrokerRankData(brokerRankData)
    }
    getBrokerRank()
    getTopCards()
    getAgencyRank()
  })

  return (
    <PageContainer>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <TopCards cardData={topCardsData} />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TableFilterForDate
              title="Agências mais acessadas"
              data={agencyRankData}
            />
            {/* <TopAgencias /> */}
          </Grid>

          <Grid item xs={12} lg={6}>
            <TableFilterForDate
              title="Corretores mais acessados"
              data={brokerRankFakerData}
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <TableFilterForDate
              title="Agências mais acessadas"
              data={agencyRankData}
              type="rounded"
              width={100}
              height={100}
            />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}
