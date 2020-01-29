import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';


class App extends Component{
  constructor(props) {
    super(props);
    console.log('[App.js] constructor' );
  }

  state = {
    persons: [
      {id: 'asdf', name: "Jeff", age: "32"},
      {id: 'zxcv', name: "Maria", age: 27},
      {id: 'qree', name: "John", age: 30}
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[Apps.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    //const persons = [...this.state.persons];
    //Equivalent to the first copy method.
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render(){
  console.log('[App.js] render');
  let persons = null;

  if ( this.state.showPersons ) {
    persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />;
  }

  return (
    <Aux>
      <button onClick={() => {
        let showCockpit = this.state.showCockpit;
        this.setState({showCockpit: !showCockpit});
      }}>Remove Cockpit</button>
      {this.state.showCockpit ? <Cockpit 
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        personsLength={this.state.persons.length}
        clicked={this.togglePersonHandler} />
      : null}
      {persons}
    </Aux>
  );
  }
}

export default withClass(App, classes.App);
