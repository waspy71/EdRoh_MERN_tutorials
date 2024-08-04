
import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    /* there should be an automatic check for validity here?
    like in fullstack  */
    res.status(200).json(user)
  } catch(error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )
    const formattedFriends = friends.map(
      ({ id, firstName, lastName, occupation, location, picturePath }) => {
        return { id, firstName, lastName, occupation, location, picturePath }
      }
    )
    res.status(200).json(formattedFriends)
  } catch(error) {
    res.status(404).json({ message: error.message})
  }
}

/*  UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params
    
    /*  prevent adding urself  */
    if (id === friendId) {
      return req.status(400).json({ message: "Could not add yourself to friend list"})
    }

    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if(user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId)
      friend.friends = friend.friends.filter((friend_id) => friend_id !== id)
    } else {
      user.friends.push(friendId)
      friend.friends.push(id)
    }
    await user.save()
    await friend.save()

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    )
    const formattedFriends = friends.map(
      ({ id, firstName, lastName, occupation, location, picturePath }) => {
        return { id, firstName, lastName, occupation, location, picturePath }
      }
    )
    res.status(200).json(formattedFriends)
  } catch(error) {
    req.status(404).json({ message: error.message })
  }
}












