import React, { useEffect } from 'react';
import classes from './Cockpit.module.css';

const cockpit = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
      setTimeout(() => {
        alert('Saved data to cloud!');
      }, 1000);
      return () => {
        console.log('[Cockpit.js] cleanup work in useEffect');
      }
    }, []);   

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      console.log('[Cockpit.js] 2nd useEffect');
      return () => {
        console.log('[Cockpit.js] cleanup work in 2nd useEffect');
      }
    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.persons.length <= 2) {
      assignedClasses.push(classes.Red);
    }

    if (props.persons.length <= 1) {
      assignedClasses.push(classes.Bold);
    }

    return (
      <div className={classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
            className={btnClass} 
            onClick={props.clicked} >
            Toggle Persons
        </button>
      </div>
    );
};

export default cockpit;