import React, { Component } from 'react';
import style from './DashBoard.module.scss';

class Dash extends Component {
  state = {
    sourceApp: '',
    sourceTrigger: '',
    sourceInApp: '',
    targetApp: '',
    targetDo: '',
    targetWith: '',
    targetInApp: '',
  };

  fluxFormHandler = async (e) => {
    const element = e.target.elements;
    e.preventDefault();
    await this.setState({
      sourceApp: element.whenApp.value,
      sourceTrigger: element.whenTrigger.value,
      sourceInApp: element.whenIn.value,
      targetApp: element.thenApp.value,
      targetDo: element.thenDo.value,
      targetWith: element.thenWith.value,
      targetInApp: element.thenIn.value,
    });
    const dashBoardData = this.state;
    const res = await fetch('http://localhost:5000/api/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dashBoardData),
    });
    const data = await res.json();
    console.log(data);
  };
  render() {
    return (
      <div className={style.Dash}>
        <h2>Create Flux</h2>
        <form onSubmit={this.fluxFormHandler}>
          <h3>When</h3>
          {/* App */}
          <label htmlFor='app-select'>App</label>
          <select id='app-select' name='whenApp'>
            <option>Slack</option>
            <option>Gmail</option>
          </select>

          {/* Trigger */}
          <label htmlFor='trigger-select'>Triggers</label>
          <select id='trigger-select' name='whenTrigger'>
            <option>New message</option>
            <option>Mentions</option>
          </select>

          {/* in */}
          <label htmlFor='in-select'>in</label>
          <select id='in-select' name='whenIn'>
            <option>Slack</option>
            <option>Gmail</option>
          </select>
          <hr></hr>
          {/*  */}
          {/* then */}
          <h3>then</h3>
          {/* App */}
          <label htmlFor='then-app-select'>App</label>
          <select id='then-app-select' name='thenApp'>
            <option>Slack</option>
            <option>Gmail</option>
          </select>

          {/* Trigger */}
          <label htmlFor='then-do-select'>do</label>
          <select id='then-do-select' name='thenDo'>
            <option>New message</option>
            <option>Mentions</option>
          </select>
          {/* with */}
          <label htmlFor='then-with-in-select'>with</label>
          <select id='then-with-in-select' name='thenWith'>
            <option>from</option>
            <option>subject</option>
            <option>content</option>
          </select>

          {/* in */}
          <label htmlFor='in-select'>in</label>
          <select id='in-select' name='thenIn'>
            <option>Hitesh Slack</option>
            <option>Pesto Students</option>
          </select>
          <div className={style.Button}>
            <button type='submit'>Submit</button>
            <button type='submit' onClick={this.fluxCancelHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Dash;
// {
//   /* <div className={style.Dash}>
//         <h2>Create Flux</h2>
//         <form onSubmit={this.fluxFormHandler}>
//           <h3>When</h3>
//           {/* App */
// }
// // <label htmlFor='app-select'>App</label>
// // <select id='app-select' name='whenApp'>
// //   <option>Slack</option>
// //   <option>Gmail</option>
// // </select>

// {
//   /* Trigger */
// }
// // <label htmlFor='trigger-select'>Triggers</label>
// // <select id='trigger-select' name='whenTrigger'>
// //   <option>New message</option>
// //   <option>Mentions</option>
// // </select>

// {
//   /* in */
// }
// // <label htmlFor='in-select'>in</label>
// // <select id='in-select' name='whenIn'>
// //   <option>Slack</option>
// //   <option>Gmail</option>
// // </select>
// // <hr></hr>
// // {/*  */}
// // {/* then */}
// // <h3>then</h3>
// // {/* App */}
// // <label htmlFor='then-app-select'>App</label>
// // <select id='then-app-select' name='thenApp'>
// //   <option>Slack</option>
// //   <option>Gmail</option>
// // </select>

// // {/* Trigger */}
// // <label htmlFor='then-do-select'>do</label>
// // <select id='then-do-select' name='thenDo'>
// //   <option>New message</option>
// //   <option>Mentions</option>
// // </select>
// // {/* with */}
// // <label htmlFor='then-with-in-select'>with</label>
// // <select id='then-with-in-select' name='thenWith'>
// //   <option>from</option>
// //   <option>subject</option>
// //   <option>content</option>
// // </select>

// //       {/* in */}
// //       <label htmlFor='in-select'>in</label>
// //       <select id='in-select' name='thenIn'>
// //         <option>Hitesh Slack</option>
// //         <option>Pesto Students</option>
// //       </select>
// //       <div className={style.Button}>
// //         <button type='submit'>Submit</button>
// //         <button type='submit' onClick={this.fluxCancelHandler}>
// //           Cancel
// //         </button>
// //       </div>
// //     </form>
// //   </div>
// // ); */}
