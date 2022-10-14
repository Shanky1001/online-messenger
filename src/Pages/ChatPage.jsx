import { Avatar, Card, Text, TextField, } from '@shopify/polaris'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Styles/Style.css'
import { Refreshing, Sending_Msg } from '../Redux/Actions'

const ChatPage = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  // const message = JSON.parse(localStorage.getItem('messages'));

  // State for Msg typed
  const [msg, setMsg] = useState('')

  // function for msg send
  const handleMsgSent = () => {
    if (msg === '')
      alert('Please write something to send');
    else {
      const data = { userId: state.user, messageID: state.messages.length + 1, msg: msg, time: new Date().toLocaleString() }
      dispatch(Sending_Msg(data))
      setMsg('')
    }
  }


  return (
    <div className="chatPageContainer">
      <div className="navbar">
        <Avatar source='https://ghantee.com/wp-content/uploads/2022/08/most-beautiful-trishul-image-on-the-internet-today-576x1024.jpg' />
        <Text color='primary' variant='headingLg' as='h5' >
          Your Chat group Name
        </Text>
      </div>
      <div className="refresh" onClick={() => { setMsg(''); dispatch(Refreshing()); window.history.go(0) }}>
        Refresh <i className="fa-solid fa-arrows-rotate" ></i>
      </div>
      <div className="chatArea">
        {state.messages.sort((a, b) => b.messageID-a.messageID).map((val) => {
          if (val.userId === state.user) {
            return (
              <div className="mine" key={val.messageID}>
                <Card sectioned subdued >
                  <Text variant='headingSm' as='h5' color='success' alignment='left' >
                    You at <span style={{ color: "blue" }}>{val.time}</span>
                  </Text>
                  <Text variant='headingSm' as='h1'>
                    {val.msg}
                  </Text>
                </Card>
              </div>
            )
          } else {
            return (
              <div className="others" key={val.messageID}>
                <Card sectioned className='others'>
                  <Text variant='headingSm' as='h5' color='warning' alignment='left' >
                    <span style={{ color: "red" }}>{val.userId}</span>  at <span style={{ color: "blue" }}>{val.time}</span>
                  </Text>
                  <p>{val.msg}</p>
                </Card>
              </div>
            )
          }
        })}

      </div>


      <div className="message">
        <TextField suffix={<i className="fa-solid fa-paper-plane" style={{ cursor: "pointer" }} onClick={() => handleMsgSent()}></i>} type='text' placeholder='Enter your message' autoFocus value={msg} onChange={(e) => setMsg(e)} />
      </div>
    </div>
  )
}

export default ChatPage