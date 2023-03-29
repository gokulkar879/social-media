import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar'
import FriendListWidget from '../widgets/FriendListWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'

const ProfilePage = () => {
    const isNonMobile = useMediaQuery("(min-width:1000px)")
    const [user, setUser] = useState(null)
    const {userId} = useParams()
    const token = useSelector(state => state.token)

    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          })
          const data = await response.json();
          setUser(data);
    }

    useEffect(() => {
        getUser()
    }, [])

   if(!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobile ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="center"
            >
                <Box flexBasis={isNonMobile ? "26%" : undefined} mr="2rem">
                    <UserWidget userId={userId} picturePath={user.picturePath}/>
                    <Box mt="2rem"/>
                    <FriendListWidget userId={userId}/>
                </Box>
                <Box
                    flexBasis={isNonMobile ? "42%" : undefined}
                    mt={isNonMobile ? undefined : "2rem"}
                    >
                    <MyPostWidget picturePath={user.picturePath}/>
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile="true"/>
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage