import React from 'react'
import Friends from '../Friends'
import {mount} from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

describe('Friends component', () => {
    const props = {
        userName: 'Maks',
        currentUserId: 'lJFZuJB1auOwDlHDt93wQoMKqox1',
        people: [
            {
                name:"Felix Devil",
                user: "bgie9AAbH7bmiWUYovEqY8cehRr1"
                }
            ],
        type: 'following' ,
    }

    const wrapper = mount(<MemoryRouter initialEntries={['http://localhost:3000/']} >
        <Friends people={props.people} currentUserId={props.currentUserId} userName={props.userName} type={props.type} />
        </MemoryRouter>)

    it('Should render correctly', ()=> {
        expect(wrapper.find({'aria-label':'user-friends'}).text()).toEqual(`${props.userName}'s ${props.type}`)
        expect(wrapper.find({'aria-label':'friends-list'}).children().length).not.toEqual(0)
    })

})
