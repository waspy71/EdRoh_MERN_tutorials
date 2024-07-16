
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import Form from './Form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMoblieScreens = useMediaQuery('(min-width: 1000px)')


  return (
  <Box>
    <Box 
      width='100%'
      backgroundColor={theme.palette.background.alt}
      pading='1rem 6%'
      textAlign='center'
    >
      <Typography
        fontWeight='bold'
        fontSize='32px'
        color='primary'
      >
        Sociopedia
      </Typography>
    </Box>

    <Box
      width={isNonMoblieScreens ? '50%' : '93%'}
      padding='2rem'
      margin='2rem auto'
      borderRadius='1.5rem'
      backgroundColor={theme.palette.background.alt}
    >
      <Typography
        fontWeight='500px'
        variant="h5"
        sx={{ mb: '1.5rem' }}
      >
        Welcome to Sociopedia, the Social Media for Sociopaths!
      </Typography>
      <Form />
    </Box>
  </Box>
  )
}

export default LoginPage