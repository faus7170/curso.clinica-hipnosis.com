import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import ReactHtmlParser from 'react-html-parser';
class Curso extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            cursos:[],
            currentcursos: null
        }
    
    
    }*/

    render() {
        return (
            <div>Hola Mundo como estas</div>
            )
    }
}

export default Curso;
if (document.getElementById('curso')) {
    ReactDOM.render(<Curso />, document.getElementById('curso'));
}
