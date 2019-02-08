import React, { Component } from "react";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: "Redux 2",
    url: "https://redux.js.org/",
    author: "Jacob",
    num_comments: 4,
    points: 3,
    objectID: 2
  }
];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ""
    };
  }

  onDismiss = id => {
    const isNotID = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotID);
    this.setState({ list: updatedList });
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App page">
        <div className="interactinos">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;

    return (
      <form>
        {children}
        <input type="text" value={value} onChange={event => onChange(event)} />
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    const largeColumn = {
      width: "40%"
    };
    const midColumn = {
      width: "30%"
    };
    const smallColumn = {
      width: "10%"
    };
    return (
      <div className="table">
        {list.filter(isSearched(pattern)).map(item => {
          return (
            <div key={item.objectID} className="table-row">
              <span style={largeColumn}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span style={midColumn}>{item.author}</span>
              <span style={smallColumn}>{item.num_comments}</span>
              <span style={smallColumn}>{item.points}</span>
              <span>
                <Button
                  onClick={() => onDismiss(item.objectID)}
                  className="button-inline"
                >
                  Dismiss
                </Button>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

class Button extends Component {
  render() {
    const { onClick, className = "", children } = this.props;

    return (
      <button className={className} onClick={onClick} type="button">
        {children}
      </button>
    );
  }
}

/*
// old way for functions ES5
function Search(props) {
  const { value, onChange, children } = props;
  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  );
}

// second old way using destructoring
function Search({ value, onChange, children }) {
  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  );
}
*/

export default App;
