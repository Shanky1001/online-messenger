import { Box, Card, Modal, Select, Text, TextField } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Adding_User, User_Logging } from '../Redux/Actions'
import '../Styles/Style.css'

const HomePage = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // state for select
    const [selected, setSelected] = useState('');
    // State for Modal Input fields
    const [user, setUser] = useState({ name: '', userName: '' })

    // State for modal
    const [open, setOpen] = useState(false)


    // Use Effect for Modal open / Close
    useEffect(() => {
        selected === 'add' ? setOpen(true) : setOpen(false);
    }, [selected])

    // Options for Select Box
    let options = [
        { label: 'Select any options', value: '' },
        { label: 'Add User', value: 'add' },
    ]

    // Dynamic option creation
    state.users.forEach((val) => {
        options = [...options, { label: val.name, value: val.userID }]
    })

    const handleSelect = (value) => {
        setSelected(value)
        if (value !== 'add' && value !== '') {
            dispatch(User_Logging(value))
            window.open('http://localhost:3000/chatpage','_blank');
        }
    }

    // Handling action from Modal
    const handleAction = () => {
        if (user.name === '' || user.userName === '') {
            alert('Enter Both your name and your user name')
        } else {
            const userID = user.userName + "_" + (10000 + state.users.length);
            dispatch(Adding_User({ data: { name: user.name, userID: userID }, user: user.userName }))
            setOpen(false);
            navigate('/chatpage');
        }
    }

    return (
        <div className="HomePageContainer">
            <Box as='div' shadow='card' padding='2' >
                <div style={{ marginTop: '3rem' }}>
                    <Text variant='heading2xl' as='h1' alignment='center'>
                        Welcome to Messenger
                    </Text>
                </div>
                <div style={{ marginTop: "3rem" }}>
                    <Select label='Select your action' options={options} value={selected} onChange={(value) => handleSelect(value)} />
                </div>
            </Box>
            <Modal open={open} title='Add New User' onClose={() => setOpen(false)} primaryAction={{
                content: 'Add user', onAction: handleAction
            }} >
                <Modal.Section>
                    <Card>
                        <TextField placeholder='Enter Name' value={user.name} onChange={(e) => setUser({ ...user, name: e })} />
                    </Card>
                    <Card>
                        <TextField placeholder='Enter User Name' value={user.userName} onChange={(e) => setUser({ ...user, userName: e })} />
                    </Card>
                </Modal.Section>
            </Modal>
        </div>
    )
}

export default HomePage