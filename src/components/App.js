import React, { Component } from 'react';

import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import {findIndex, without } from 'lodash';


class App extends Component {

constructor() {
  super();
  this.state = {
    myAppointments: [],
    lastIndex: 0,
    formDisplay: false,
    orderBy: 'company',
    orderDir: 'asc',
    queryText: ''
  };
  this.deleteAppointment = this.deleteAppointment.bind(this);
  this.toggleForm = this.toggleForm.bind(this);
  this.addAppointment = this.addAppointment.bind(this);
  this.changeOrder = this.changeOrder.bind(this);
  this.searchApts = this.searchApts.bind(this);
  this.updateInfo = this.updateInfo.bind(this);
}


changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  updateInfo(name, value, id) {
   let tempApts = this.state.myAppointments;
   let aptIndex = findIndex(this.state.myAppointments, {//lodash method findIndex
     aptId: id
   });
   tempApts[aptIndex][name] = value;
   this.setState({
     myAppointments: tempApts
   });
 }


addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }


deleteAppointment(apt) {
  let tempApts = this.state.myAppointments;
  tempApts = without(tempApts, apt);//lodash => updating array after deletion

  this.setState( {
    myAppointments: tempApts
  });
}

toggleForm() {
  this.setState({
    formDisplay: !this.state.formDisplay
  });
}

searchApts(query) {
    this.setState({ queryText: query });
  }

componentDidMount() {
  fetch('./data.json')
  .then(response => response.json())
  .then(result =>
  {
    const apts = result.map(item => {
      item.aptId = this.state.lastIndex;
      this.setState({lastIndex: this.state.lastIndex + 1});
      return item;
    })
    this.setState({
      myAppointments: apts
    });
  });
}

  render() {

    let order;
   let filteredApts = this.state.myAppointments;
   if (this.state.orderDir === 'asc') {
     order = 1;
   } else {
     order = -1;
   }

   filteredApts = filteredApts.sort((a, b) => {//higher order function needs naming to filteredApts
     if (
       a[this.state.orderBy].toLowerCase() <
       b[this.state.orderBy].toLowerCase()
     ) {
       return -1 * order;
     } else {
       return 1 * order;
     }
   })
   .filter(eachItem => {//search function
        return (
          eachItem['company']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['job']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['notes']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    return (
      <main className="page bg-white" id="petratings">
       <div className="container">
         <div className="row">
           <div className="col-md-12 bg-white">
             <div className="container">
               <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm}  addAppointment={this.addAppointment}/>
               <SearchAppointments  orderBy={this.state.orderBy} orderDir={this.state.orderDir} changeOrder={this.changeOrder} searchApts={this.searchApts}/>
             <ListAppointments appointments={filteredApts} deleteAppointment={this.deleteAppointment}  updateInfo={this.updateInfo} />
             </div>
           </div>
         </div>
       </div>
     </main>
    );
  }
}

export default App;
