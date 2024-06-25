import { useSelector } from '@/store/hooks'
import { AppState } from '@/store/store'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer)
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }))

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled href="/">
        {customizer.activeMode === 'dark' ? (
          <Image
            src="/images/logos/logo.png"
            alt="logo"
            height={customizer.TopbarHeight}
            width={174}
            priority
            style={{
              objectFit: 'contain',
            }}
          />
        ) : (
          <Image
            src={'/images/logos/logo.png'}
            alt="logo"
            height={customizer.TopbarHeight}
            width={174}
            style={{
              objectFit: 'contain',
            }}
            priority
          />
        )}
      </LinkStyled>
    )
  }

  return (
    <LinkStyled href="/">
      {customizer.activeMode === 'dark' ? (
        <Image
          src="/images/logos/logo.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          priority
          style={{
            objectFit: 'contain',
          }}
        />
      ) : (
        <Image
          src="/images/logos/logo.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          priority
          style={{
            objectFit: 'contain',
          }}
        />
      )}
    </LinkStyled>
  )
}

export default Logo
