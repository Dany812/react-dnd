import React, { Component } from 'react';  
import {   Button  } from 'react-bootstrap'; 
 export default class Save extends Component {
 
    render() { 
        return (
          <div className="container">
            <form action='http://localhost:3000/save'>
                <Button type='submit' > Сохранить в файл </Button>
            </form>
          </div>
        );
    }
}

 