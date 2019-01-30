import React, { Component } from 'react'
import './App.css'

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: 'Redux 2',
    url: 'https://redux.js.org/',
    author: 'Jacob',
    num_comments: 4,
    points: 3,
    objectID: 2
  }
]

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase())

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list,
      searchTerm: ''
    }

    this.onDissmiss = this.onDissmiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onDissmiss(id) {
    const isNotID = item => item.objectID !== id
    const updatedList = this.state.list.filter(isNotID)
    this.setState({ list: updatedList })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { searchTerm, list } = this.state
    return (
      <div className="App">
        <form>
          <input
            type="text"
            onChange={this.onSearchChange}
            value={searchTerm}
          />
        </form>
        {list.filter(isSearched(searchTerm)).map(item => {
          return (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                  onClick={() => this.onDissmiss(item.objectID)}
                  type="button"
                >
                  Dismiss
                </button>
              </span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
