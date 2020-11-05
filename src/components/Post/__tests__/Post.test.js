import React from 'react'
import Post from '../Post'
import { mount } from 'enzyme'
import { MemoryRouter, Router, Switch } from 'react-router-dom'

describe('Post component', () => {
    const props = {
            photo:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goodfon.ru%2Fwallpaper%2Fminimalizm-naushniki-fon-goluboi-rozovyi.html&psig=AOvVaw0xJnr2nBUO0vZ2mzQic0zO&ust=1604503278908000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCQztHW5uwCFQAAAAAdAAAAABAD',
            name:'Arthur',
            comments:[{author:
                "lJFZuJB1auOwDlHDt93wQoMKqox1",
                authorPhoto:
                "https://firebasestorage.googleapis.com/v0/b/lite-screen.appspot.com/o/users%2FlJFZuJB1auOwDlHDt93wQoMKqox1%2Fphoto?alt=media&token=469012b0-429d-4dcf-b98a-aa18e22886e7",
                commentId:
                1603800801345,
                date:
                "15:13",
                text:
                "Hello my friend"}],
            content:'Hi',
            likes:['lJFZuJB1auOwDlHDt93wQoMKqox1'],
            author:'lJFZuJB1auOwDlHDt93wQoMKqox1',
            likePost: jest.fn(),
            authorPhoto:'https://firebasestorage.googleapis.com/v0/b/lite-screen.appspot.com/o/users%2FgBbLFK3KV5PDNrrdmtnaFAYrK0E3%2Fphoto?alt=media&token=2234863c-1f6d-4e08-8e30-b0c8a2ebb230',
            date:['Oct', '23', '2020','14:16:15'],
            id: 123456,
            userId: 'lJFZuJB1auOwDlHDt93wQoMKqox1',
            commentPost: jest.fn(),
            deletePost: jest.fn()
          }

        const wrapper = mount(<MemoryRouter initialEntries={['http://localhost:3000/']} ><Post {...props} /></MemoryRouter>)

    it('should render correctly', ()=> {
        
        expect(wrapper.find({'aria-label':'avatar'}).prop('src')).toEqual(props.authorPhoto)
        expect(wrapper.find({'aria-label' : "title"}).at(0).text()).toEqual(props.name)
        expect(wrapper.find({'aria-label' : "date"}).at(0).text()).toEqual(`${props.date[3]} ${props.date[0]} ${props.date[1]}, ${props.date[2]}`)
        expect(wrapper.find(".user-post-photo").at(0).find('img').prop('src')).toEqual(props.photo)
        expect(wrapper.find({'aria-label' : "content"}).at(0).text()).toEqual(props.content)
        expect(wrapper.find({'aria-label' : "likes"}).at(0).text()).toEqual(`${props.likes.length}`)
        expect(wrapper.find({'aria-label' : "comments"}).at(0).text()).toEqual(`${props.comments.length}`)

    })

    it('should like post', ()=> {
        wrapper.find({'aria-label':'addToFavorites'}).at(0).simulate('click')
        expect(props.likePost.mock.calls.length).toEqual(1)
        props.likePost.mockClear()
    })

    it('should open the menu', ()=> {
        wrapper.find({'aria-label':'menu'}).at(0).simulate('click')
        expect(wrapper.find({'aria-label':'menu-window'}).find({'aria-label':'menu-delete'}).at(0).text()).toEqual('Delete')
    })

    it('should delete the post', ()=> {
        wrapper.find({'aria-label':'menu-delete'}).at(0).simulate('click')
        expect(props.deletePost.mock.calls.length).toEqual(1)
        props.deletePost.mockClear()
    })

    it('should open the comments', ()=> {
        wrapper.find({'aria-label':'btn-comments'}).at(0).simulate('click')
        expect(wrapper.find({'aria-label':'comments-paper'}).length).not.toEqual(0)
    })

    it('should render comment', ()=> {
       const comment = wrapper.find({'aria-label':'comment-item'})
       expect(comment.find({'aria-label':'comment-avatar'}).find('img').prop('src')).toEqual(props.comments[0].authorPhoto)
       expect(comment.find({'aria-label':'comment-text'}).at(0).text()).toEqual(props.comments[0].text)
       expect(comment.find({'aria-label':'comment-date'}).at(0).text()).toEqual(props.comments[0].date)
    })

    // it('should send comment', ()=> {
    //     const hello = 'Hello'
    //     wrapper.find({'aria-label':'input'}).at(1).simulate('change', { target: { value: hello } })
    //     console.log(wrapper.find({'aria-label':'input'}).at(1).debug())
    //     expect(wrapper.find({'aria-label':'input'}).at(1).prop('value')).toEqual('Hello')
    //     wrapper.find({'aria-label':'btn-send'}).at(1).simulate('click')
    //     expect(wrapper.find({'aria-label':'input'}).at(1).prop('value')).toEqual('')
    //     expect(props.commentPost.mock.calls.length).toEqual(1)
    //     props.commentPost.mockClear()
    // })
    
})

