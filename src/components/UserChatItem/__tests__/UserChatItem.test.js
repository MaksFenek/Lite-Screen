import React from 'react'
import UserChatItem from '../UserChatItem'
import {mount} from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

describe('UserChatItem component', () => {
    const props = {
        name: 'Arthur',
        id: 'lJFZuJB1auOwDlHDt93wQoMKqox1',
        photo: 'https://firebasestorage.googleapis.com/v0/b/lite-screen.appspot.com/o/users%2FlJFZuJB1auOwDlHDt93wQoMKqox1%2Fphoto?alt=media&token=469012b0-429d-4dcf-b98a-aa18e22886e7',
        lastMessage: 'Hello'
    }

    const wrapper = mount(<MemoryRouter initialEntries={['http://localhost:3000/']} >
        <UserChatItem name={props.name} id={props.id} photo={props.photo} lastMessage={props.lastMessage} />
    </MemoryRouter>)

    it('should render correcly', ()=> {
        expect(wrapper.find({'aria-label':'avatar'}).find('img').prop('src')).toEqual(props.photo)
        expect(wrapper.find({'aria-label':'user-name'}).text()).toEqual(props.name)
        expect(wrapper.find({'aria-label':'last-message'}).text()).toEqual(props.lastMessage)
    })
})
