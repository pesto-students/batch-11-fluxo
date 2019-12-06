import React, { Component } from 'react';
import LandingHeader from '../LandingPage/LandingHeader/LandingHeader';

class MyFlux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/myflux')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          items: json
        });
      });
  }

  render() {
    return (
      <div>
        <LandingHeader buttonText="Create Flux" />
        <table border="3px" style={{margin: "300px auto"}}>
          <thead>
            <th>Name</th>
            <th>Event App</th>
            <th>Action App</th>
            <th>Event Name</th>
            <th>Action Name</th>
            <th>DeActivate</th>
          </thead>
          <tbody>
            {this.state.items.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.name}</td>
                  <td>{item.eventApp}</td>
                  <td>{item.actionApp}</td>
                  <td>{item.eventName}</td>
                  <td>{item.eventName}</td>
                  <td>{item.actionName}</td>
                  <td>{item.isEnable}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MyFlux;
