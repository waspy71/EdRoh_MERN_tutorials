import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from "scenes/navbar"
import UserWidget from "scenes/widgets/UserWidget"
import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from "scenes/widgets/PostsWidget"


const HomePage = () => {
  const isNonMoblieScreens = useMediaQuery('(min-width:1000px)')
  const { id, picturePath } = useSelector(({ user }) => user)


  return (
  <Box>
    <Navbar />
    <Box
      width='100%'
      p='2rem 6%'
      display={isNonMoblieScreens ? 'flex' : 'block'}
      gap='0.5rem'
      justifyContent='space-between'
    >
      <Box flexBasis={isNonMoblieScreens ? '26%' : undefined} >
        <UserWidget userId={id} picturePath={picturePath} />
      </Box>
      <Box 
        flexBasis={isNonMoblieScreens ? '42%' : undefined}
        mt={isNonMoblieScreens ? undefined : '2rem'}
       >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={id} />
      </Box>
      {isNonMoblieScreens && (
        <Box flexBasis='26%' >
          
        </Box>
      )}
    </Box>
  </Box>
  )
}

export default HomePage