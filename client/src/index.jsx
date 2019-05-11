import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);

  }

  componentDidMount(){
    axios.get('repos')
      .then((repos)=>{
        this.setState({
          repos : repos.data.sort((a, b)=>{return b.watchers - a.watchers})
        });
      })
  }

  search (term) {
    axios.post('/repos', {
      user : term
    })
    .then((repos)=>console.log(`${term} was searched and returned`, repos.data));
    // TODO
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));