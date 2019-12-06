import React, {Component} from 'react';
import LandingHeader from '../LandingPage/LandingHeader/LandingHeader';

class MyFlux extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => { 
      this.setState({
        isLoaded: true,
        items: json
      })
    })
  }

  render(){

    let {isLoaded, items} = this.state;

    return(
      <div>
        <ul>
          {items.map(item => {
            // eslint-disable-next-line no-unused-expressions
            <li key={item.id}>
              Name: {item.name} | Email: {item.email}
            </li>
        })};
        </ul>
      </div>
    );
  }
}

export default Login;
