import User from "../models/user.js"


export const  getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
        console.log(user)

    } catch (error) {
        res.status(404).json({message: error.message})
        console.log(error)
    }
}


export const  getUserFriends = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
      

        const friends = await Promise.all()
        user.friends.map((id)=>User.findById(id))

        const formattedFriends = friends.map((friend)=>{
         const{_id, firstName, lastName, occupation, location, picturePath, bio} = friend
         return {_id, firstName, lastName, occupation, location, picturePath, bio}
        })

        res.status(200).json(formattedFriends)


        
    } catch (error) {
        res.status(404).jsin({message: error.message})
    }
}
export const  addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params
        const user = await User.findById(id)
        const friend = await User.findByFriendId(friendId)
    
   if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId)
    friend.friends = friend.friends.filter((id) => id !==id)
   }

   else{
    user.friends.push(friendId)
    user.friends.push(id)
   }

    await user.save()
    await friend.save()

    const friends = await Promise.all()
        user.friends.map((id)=>User.findById(id))

        const formattedFriends = friends.map((friend)=>{
         const{_id, firstName, lastName, occupation, location, picturePath, bio} = friend
         return {_id, firstName, lastName, occupation, location, picturePath, bio}
        })

        res.status(200).json(formattedFriends)



    } catch (error) {
        res.status(404).jsin({message: error.message})
    }
}