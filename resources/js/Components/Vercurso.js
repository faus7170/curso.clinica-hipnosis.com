import React, { Component } from 'react';
//import React from 'react';
import ReactDOM from 'react-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ReactHtmlParser from 'react-html-parser';
import EmbedContainer from 'react-oembed-container';
import {extract,} from 'oembed-parser';

class Vercurso extends Component {
    constructor(props) {
    super(props);
    //Initialize the state in the constructor
    this.state = {
        miscursos:[],
        contenidos:[],
        idcont:0,
        currentcursos: null,
        cursonombre:'',
        cursoimagen:''
    }
}

    componentDidMount(){
    const idcurso=document.getElementById("idcurso").value;
    fetch('../curso/getVerMiCurso?idcurso='+idcurso)
        .then(response => {
        return response.json();
})
.then(response => {
    //console.log(response.data);
    this.setState({miscursos:response.data});
    this.setState({contenidos:response.contenido});

    console.log('xxxx');
    console.log(this.state.miscursos);
    const listItems = this.state.miscursos.map((curso) =>
        this.setState({cursonombre:curso.nombre})

);
    const listItems1 = this.state.miscursos.map((curso) =>
    this.setState({cursoimagen:'../'+curso.fotoport})

);

    console.log('yyyyyyyy');
    console.log(this.state.cursonombre);




})
.catch(error=>{
    alert("Error "+error)
});
}
renderCurso(){
    return this.state.miscursos.map((curso)=>{
        return(
            <div key={curso.idcurso}>
                <b>Entrenamiento:</b> {curso.nombre}<br></br>
                <b>Descripcion:</b>{ReactHtmlParser(curso.descripcion)}<br></br>
                <b>Profesor:</b>{curso.autor}<br></br>
                <b>Duracion:</b>{curso.horas}<br></br>
                <b>Fecha Apertura:</b>{curso.fechaapertura}<br></br>
            </div>
            )
    })
}
htmlMedia(){
    console.log("Control oembebe");

}

renderLeccion(){
      return this.state.contenidos.map((lecccion)=>{
        return(

                    <a  className="row bg-light color-palette" href={'leccion?cur='+lecccion.idcurso + '&lec='+lecccion.idcont}>
                        <i className="fas fa-arrow-circle-right"></i> {' '+lecccion.titulo}

                    </a>

            )
    })
}

render() {

    const stylesDiv = {
        overflow: 'scroll',
    };


    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className ="card card-info">
                        <div className ="card-header">
                            <h3 className ="card-title"><b>Entrenamiento: {this.state.cursonombre}</b> </h3>
                        </div>
                        <div className ="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <img src={this.state.cursoimagen} height='300px' width='90%'/>
                                </div>
                                <div className="col-md-4" style={{stylesDiv}}>
                                    <div className="col-md-12">
                                        {this.renderCurso()}
                                    </div>
                                    <div className="col-md-12">
                                    {" "}
                                    </div>
                                    <div className="col-md-12">
                                        <h5>Sesiones<br></br></h5>
                                    </div>
                                    <div className="col-md-12">
                                        {this.renderLeccion()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className ="card-footer">
                            <button type="button" className="btn btn-primary" onClick={()=>this.videochat()}>Mi cancha</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}
videochat(){
    window.location.href = "../curso/videochat";
}
setKey(data){
    this.setState({frmNombre: data.nombre});
    this.setState({varidcurso: data.idcurso});
}
sendNetworkProduct(){
    const formData = new FormData()
    console.log(this.state.frmNombre)
    console.log(this.state.frmNombre)
    formData.append('nombre',this.state.frmNombre)
    formData.append('descripcion',this.state.frmDescripcion)
    formData.append('autor',this.state.frmAutor)
    formData.append('valor',this.state.frmValor)
    formData.append('impuesto',this.state.frmImpuesto)
    formData.append('fechaapertura',this.state.frmFechaper)
    formData.append('fechacierre',this.state.frmFechcierre)
    formData.append('fotoport',this.state.frmFotoport)
    axios.post('save',formData).then(response=>{
       if (response.data.success==true) {
            this.setState({varidcurso: response.data.idcurso});
            alert('Curso Guardado con exito')
       }
    }).catch(error=>{
        alert("Error "+error)
    })
}
sendLeccion(){
        console.log(this.state.frmLecDescripcion);
        const formData = new FormData()
        formData.append('titulo',this.state.frmLecTitulo)
        formData.append('texto',this.state.frmLecDescripcion)
        axios.post('saveLeccion',formData).then(response=>{
            if (response.data.success==true) {
            this.setState({varidcurso: response.data.idcurso});
            alert('Leccion guardada con exito')
            }
        }).catch(error=>{
            alert("Error "+error)
        })
    }
}
export default Vercurso;
if (document.getElementById('vercurso')) {
    ReactDOM.render(<Vercurso />, document.getElementById('vercurso'));
}