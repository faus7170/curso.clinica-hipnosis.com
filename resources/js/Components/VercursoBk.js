import React, { Component } from 'react';
//import React from 'react';
import ReactDOM from 'react-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import EmbedContainer from 'react-oembed-container';
class Vercurso extends Component {
    constructor(props) {
    super(props);
    //Initialize the state in the constructor
    this.state = {
        miscursos:[],
        contenidos:[],
        idcont:0,
        currentcursos: null,
        cursonombre:''
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
            <div className ="card-body">
                <b>Titulo:</b> {curso.nombre}<br></br>
                <b>Descripcion:</b>{ReactHtmlParser(curso.descripcion)}<br></br>
                <b>Autor:</b>{curso.autor}<br></br>
                <b> Duracion:</b>{curso.horas}<br></br>
                <b>Fecha Apertura:</b>{curso.fechaapertura}<br></br>

            </div>
            )
    })
}

renderLeccion(){
    return this.state.contenidos.map((lecccion)=>{
        return(
            <div id="accordion" key={lecccion.iduscur}>
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="#lecc">
                            {lecccion.titulo}

                            </button>
                        </h5>
                    </div>

                    <div id="lecc" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                       {ReactHtmlParser(lecccion.texto)}



                        </div>
                    </div>
                </div>
            </div>
            )

    })
}


render() {
    return (
        <div>
            <div className ="card card-info">
                <div className ="card-header">
                    <h3 className ="card-title">Curso: {this.state.cursonombre} </h3>
                </div>
                <div className ="card-body">
                {this.renderCurso()}
                    <button type="button" className="btn btn-primary" onClick={()=>this.videochat()}>Video</button>
                </div>

                <div className ="card-body">
            {this.renderLeccion()}
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