import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
class Curso extends Component {
    
    constructor(props) {
    super(props);
    //Initialize the state in the constructor
    this.state = {
        cursos:[],
        currentcursos: null
    }


}
    componentDidMount(){
    fetch('getDatos')
        .then(response => {
        return response.json();
})
.then(response => {
    //console.log(response.data);
    this.setState({cursos:response.data});
    console.log(this.state.cursos);
})
.catch(error=>{
    alert("Error "+error)
});
}
renderList(){
    return(
        <div className="container">
            <div className="row justify-content-center">
                         {this.renderCurso()}
            </div>
        </div>
        )
}

renderCurso(){
    const stylesImg = {
        marginleft: 'auto',
        marginright: 'auto',
        display: 'block',
    };

    return this.state.cursos.map((curso)=>{
        return(
            <div className="col-md-4" key={curso.idcurso}>
                <div className="card">
                    <div className="card-header"><b>{curso.nombre}</b></div>
                    <div className="card-body">
                        <img src={curso.fotoport} height='100%' width='100%' style={{stylesImg}}/>
                    </div>956888888888888888888888
                    
                    <div className="card-footer small-box-footer">
                        <b>Terapeuta:</b> {curso.autor}<br></br>
                        {ReactHtmlParser(curso.descripcion)}
                    </div>
                    <a href="#"  onClick={()=>this.registrarCurso(curso.idcurso)}  className="card-footer small-box-footer">Consultorio <i className="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            )
    })
}

registrarCurso(idcurso){
    const formData = new FormData()
    formData.append('idcurso',idcurso)
    axios.post('curso/registrarCurso',formData).then(response=>{
        if (response.data.success==true) {
        this.setState({varidcurso: response.data.idcurso});
        alert('Se ha registrado en el curso correctamente.')
        window.location.href = "curso/vercurso?idcurso="+idcurso;
    }
}).catch(error=>{
    alert("Error "+error)
})

}


render() {
    return (
        this.renderList()
        );
}
}
export default Curso;
if (document.getElementById('curso')) {
    ReactDOM.render(<Curso />, document.getElementById('curso'));
}