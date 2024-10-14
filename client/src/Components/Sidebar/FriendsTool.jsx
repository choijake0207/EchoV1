import React, {useState, useEffect} from 'react'
import { fetchFriends } from '../../Api/GET'
import UserIcon from '../UserIcon/UserIcon'

export default function FriendsTool() {
  const [friends, setFriends] = useState(null)

  useEffect(() => {
    const handleFetchFriends = async () => {
      try {
        const response = await fetchFriends()
        setFriends(response)
        console.log(response)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    handleFetchFriends()
  }, [])


  return (
    <div className="friends-tool">
      <header>
        <h4>My Friends</h4>
      </header>
      <ul className="friends-list">
        {friends && 
          friends.map(friend => {
            return (
              <li className="friend-icon" key={friend.id}>
                <UserIcon username={friend.username}/>
                <p>{friend.username}</p>
              </li>
            )
          }) 
        }
      </ul>
     
      
    </div>
  )
}
