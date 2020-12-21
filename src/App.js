import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
// import {withRouter} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import xtype from 'xtypejs';


var FontAwesome = require('react-fontawesome')

    const locationItems = [
      {
          id: 0,
          title: 'Bangalore',
          selected: false,
          key: 'location'
      },
      {
        id: 1,
        title: 'Delhi',
        selected: false,
        key: 'location'
      },
      {
        id: 2,
        title: 'Mumbai',
        selected: false,
        key: 'location'
      },
      {
        id: 3,
        title: 'Lucknow',
        selected: false,
        key: 'location'
      },
      {
        id: 4,
        title: 'Kolkata',
        selected: false,
        key: 'location'
      }
    ];

    const pageSize = [
          {id: 0,
          title: '25',
            value: 25
        },
        {id: 1,
          title: '50',
            value: 50
        },
        {id: 2,
          title: '75',
            value: 75
        },
        {id: 3,
          title: '100',
            value: 100
        }
    ];

    const seeFavorites = [
      {id: 0, title: "Yes", value: true},
      {id: 1, title: "No", value: false}
    ];

    const todoItems = [
      {

      }
    ];

    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          todoList: todoItems,
          location: locationItems,
          headerTitle: 'Select location',
          pagination: pageSize,
          _pageSize: 10,
          selectedLocation: '',
          listOpen: false,
          listOpen2: false,
          listOpen3: false,
          _seefav: false
        };
      }
      addFavorite = (item) => {
        console.log(reactLocalStorage.get('favorite'));
        console.log(xtype(reactLocalStorage.get('favorite')));
        console.log(xtype(JSON.parse(reactLocalStorage.get('favorite'))));
        console.log(xtype(item))
        // var records = reactLocalStorage.get('favorite');
        // if(records == 0)
        // {
        //   records = []
        // }
        var records = reactLocalStorage.get('favorite') | []
        records.concat(item);
        reactLocalStorage.set('favorite', JSON.stringify(records));
          console.log(reactLocalStorage.get('favorite'));
      };
      renderItems = () => {
        const newItems = this.state.todoList
        return (
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>IFSC</th>
                <th>Bank</th>
                <th>Branch</th>
                <th>Address</th>
                <th>City</th>
                <th>District</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {newItems.map((item) => (
                 <tr onClick={(e) => this.addFavorite(item)}>
                  <td>{item.ifsc}</td>
                  <td>{item.bank}</td>
                  <td>{item.branch}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.district}</td>
                  <td>{item.state}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
        );
      };

      renderFavs = () => {
        const newItems = reactLocalStorage.get('favorite');
        if(newItems == 0)
          {
            this.setState({_seefav: false});
            return;
          }
        return (
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>IFSC</th>
                <th>Bank</th>
                <th>Branch</th>
                <th>Address</th>
                <th>City</th>
                <th>District</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {newItems.map((item) => (
                 <tr onClick={(e) => this.addFavorite(item)}>
                  <td>{item.ifsc}</td>
                  <td>{item.bank}</td>
                  <td>{item.branch}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.district}</td>
                  <td>{item.state}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
        );
      };

      toggleList(){
        this.setState(prevState => ({
          listOpen: !prevState.listOpen
        }))
      }
      
      toggleList2(){
        this.setState(prevState => ({
          listOpen2: !prevState.listOpen2
        }))
      }

      toggleList3(){
        this.setState(prevState => ({
          listOpen3: !prevState.listOpen3
        }))
      }
      

      componentDidMount () {
        //const apiUrl = 'https://fyle-test-dev.herokuapp.com/api/branches/autocomplete?q=RTGS&offset=0&limit=10'
        const apiUrl = `https://fyle-test-dev.herokuapp.com/api/branches/autocomplete?q=&offset=0&limit=${this.state._pageSize}`
          fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => this.setState({todoList: data,
        }));
      }

      toggleItem = (id, key) => {
        this.setState({selectedLocation: key}, () => {
          const apiUrl = `https://fyle-test-dev.herokuapp.com/api/branches/autocomplete?q=${this.state.selectedLocation}&offset=0&limit=${this.state._pageSize}`
        fetch(apiUrl)
         .then((response) => response.json())
          .then((data) => this.setState({todoList: data}));
        });
      };

      togglePageSize = (value) => {
        this.setState({_pageSize: value}, () => {
          const apiUrl = `https://fyle-test-dev.herokuapp.com/api/branches/autocomplete?q=${this.state.selectedLocation}&offset=0&limit=${this.state._pageSize}`
        fetch(apiUrl)
         .then((response) => response.json())
          .then((data) => this.setState({todoList: data}));
        });
      };

      toggleSeeFav = (value) => {
            this.setState({_seefav: value});
      } 
      handleChange = (e) => {
        const apiUrl = `https://fyle-test-dev.herokuapp.com/api/branches?q=${e.target.value}&offset=0&limit=${this.state._pageSize}`
        console.log(apiUrl);
        fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({todoList: data}));
      }

      renderDropdown =() => {
        const{location} = this.state
        const{listOpen, headerTitle} = this.state
        return(
          <div className="dd-wrapper">
           <div className="dd-header" onClick={() => this.toggleList()}>
              <div className="dd-header-title">{headerTitle}</div>
              {listOpen
                ? <FontAwesome name="angle-up" size="2x"/>
                : <FontAwesome name="angle-down" size="2x"/>
              }
            </div>
            {listOpen && <ul className="dd-list">
             {location.map((item) => (
              //  <li className="dd-list-item" key={item.id} >{item.title} onClick={() => toggleItem(item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/></li>
               <li className="dd-list-item" key={item.title} onClick={() => this.toggleItem(item.id, item.title)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
              ))}
            </ul>}
          </div>
        )
      };

      renderPageSize =() => {
        const{pagination} = this.state
        const{listOpen2} = this.state
        return(
          <div className="dd-wrapper">
           <div className="dd-header" onClick={() => this.toggleList2()}>
              <div className="dd-header-title">Select Pagination</div>
              {listOpen2
                ? <FontAwesome name="angle-up" size="10x"/>
                : <FontAwesome name="angle-down" size="10x"/>
              }
            </div>
            {listOpen2 && <ul className="dd-list">
             {pagination.map((item) => (
              //  <li className="dd-list-item" key={item.id} >{item.title} onClick={() => toggleItem(item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/></li>
               <li className="dd-list-item" key={item.title} onClick={() => this.togglePageSize(item.value)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
              ))}
            </ul>}
          </div>
        )
      };



      renderFavorites =() => {
        console.log("opening drop");
        const{listOpen3} = this.state
        return(
          <div className="dd-wrapper">
           <div className="dd-header" onClick={() => this.toggleList3()}>
              <div className="dd-header-title">See Favorites</div>
              {listOpen3
                ? <FontAwesome name="angle-up" size="10x"/>
                : <FontAwesome name="angle-down" size="10x"/>
              }
            </div>
            {listOpen3 && <ul className="dd-list">
             {seeFavorites.map((item) => (
               <li className="dd-list-item" key={item.title} onClick={() => this.toggleSeeFav(item.value)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
              ))}
            </ul>}
          </div>
        )
      };
      
      
      render() {
        return (
          <main className="content">
            <h1 className="text-white text-uppercase text-center my-4">Find Bank Details</h1>
            <div className="row ">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  {/* <div className="">
                   onChange={(e) => {this.handleChange(e)}}
                   value={this.state.selectedLocation}
                    <button className="btn btn-primary">Add task</button>
                  </div> */}
                  {this.renderDropdown()}
                  {this.renderPageSize()}
                  {this.renderFavorites()}
                  {!this.state._seefav && <input placeholder="Search" onChange={(e) => {this.handleChange(e)}} />}
                  <ul className="list-group list-group-flush">
                    {!this.state._seefav && this.renderItems()}
                    {this.state._seefav && this.renderFavs()}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        );
      }
    }
    export default App;