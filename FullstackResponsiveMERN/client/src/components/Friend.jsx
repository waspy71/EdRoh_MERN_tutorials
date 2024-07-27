


import { 
  PermIdentityOutlined,
  PersonAddOutlined,
  PersonRemoveOutlined,
 } from "@mui/icons-material";
import { 
  Box,
  IconButton,
  Typography,
  useTheme
 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useSelector(({ user }) => user)
  const token = useSelector(({ token }) => token)
  const friends = useSelector(({ user }) => user.friends)

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const isFriend = friends.find((friend) => friend.id === friendId)

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${id}/${friendId}`,
      {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }
  
  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`)
              /* workaround to reset URL, not recommended */
              navigate(0)
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight='500'
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer'
                }
              }}
            >
              {name}
            </Typography>
            <Typography
              color={medium}
              fontSize='0.75rem'
            >
              {subtitle}
            </Typography>
          </Box>
      </FlexBetween>
      {id !== friendId ? (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      ) : (
        <IconButton disabled >
          <PermIdentityOutlined sx={{ color: primaryDark }} />
        </IconButton>
      )}
    </FlexBetween>
  )
}

export default Friend













