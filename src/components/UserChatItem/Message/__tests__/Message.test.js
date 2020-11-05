import React from 'react'
import Message from '../Message'
import {mount} from 'enzyme'

describe('Message component', () => {
    const props = {
        currentUserId:'lJFZuJB1auOwDlHDt93wQoMKqox1',
        text: 'Hello',
        date: '12:20',
        author: 'lJFZuJB1auOwDlHDt93wQoMKqox1',
        userId:'lJFZuJB1auOwDlHDt93wQoMKqox1',
        answerId: '1200',
        reply: {
            text: "How are you",
            answerId: 12200,
            date: '12:25',
            author: 'you',
        },
        name: "Maks",
        setReply: jest.fn(),
        deleteMessage: jest.fn()
    }

    const wrapper = mount(<Message
        currentUserId={props.currentUserId}
        text={props.text}
        author={props.author}
        userId={props.userId}
        date={props.date}
        answerId={props.messageId}
        setReply={props.setReply}
        reply={props.reply}
        name={props.name}
        deleteMessage={props.deleteMessage}
      />)
    
      it('should render correctly', ()=> {
        expect(wrapper.find({'aria-label':'message'}).hasClass('message own')).toBeTruthy()
        expect(wrapper.find({'aria-label':'reply-author'}).text()).toEqual('You:')
        expect(wrapper.find({'aria-label':'reply-text'}).text()).toEqual(props.reply.text)
        expect(wrapper.find({'aria-label':'message-text'}).text()).toEqual(props.text)
        expect(wrapper.find({'aria-label':'message-date'}).text()).toEqual(props.date)
      })

      it('should correclty call functions', ()=> {
        wrapper.find({'aria-label':'menu'}).at(0).simulate('click')

        wrapper.find({'aria-label':'reply'}).at(0).simulate('click')
        expect(props.setReply.mock.calls.length).not.toEqual(0)

        wrapper.find({'aria-label':'delete'}).at(0).simulate('click')
        expect(props.deleteMessage.mock.calls.length).not.toEqual(0)

        props.setReply.mockClear()
        props.deleteMessage.mockClear()

      })
})
