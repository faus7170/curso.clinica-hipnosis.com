import React, { Component } from 'react';
//import React from 'react';
import ReactDOM from 'react-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import media from '@ckeditor/ckeditor5-media-embed';

import ReactHtmlParser from 'react-html-parser';
import EmbedContainer from 'react-oembed-container';
import {extract,} from 'oembed-parser';

class Verleccion extends Component {
    constructor(props) {
    super(props);
    //Initialize the state in the constructor
    this.state = {
        miscursos:[],
        contenidos:[],
        idcont:0,
        frmidcurso:0,
        currentcursos: null,
        cursonombre:'',
        cursoimagen:'',
        textoleccion:'',
        lecciontitulo:''
    }
}

componentDidMount(){
    const idcurso=document.getElementById("idcurso").value;
    const idcont=document.getElementById("idcont").value;
    this.setState({frmidcurso:idcurso});
    fetch('../curso/getVerLeccion?idcurso='+idcurso+'&idcont='+idcont)
        .then(response => {
        return response.json();
})
.then(response => {
    //console.log(response.data);
    this.setState({contenidos:response.contenido});

    const listItems = this.state.contenidos.map((leccion) =>
        this.setState({lecciontitulo:leccion.titulo})

);
    console.log(this.state.contenidos);

}).catch(error=>{
    alert("Error "+error)
});
}

getIframelyHtml(){
    var container = this.state.textoleccion;
    container.querySelectorAll( 'oembed[url]' ).forEach( element => {
        iframely.load( element, element.attributes.url.value );
} );
    // If you use embed code from API
    //return {__html: this.state.textoleccion};

    // Alternatively, if you use plain embed.js approach without API calls:
    // return {__html: '<a href="' + this.url + '" data-iframely-url></a>'};
    // no title inside <a> eliminates the flick

    // but getting actual HTML from our APIs is still recommended
    // as it will have better sizing initially
}
/*renderCurso(){
    return this.state.miscursos.map((curso)=>{
        return(
            <div key={curso.idcurso}>
                <b>Curso:</b> {curso.nombre}<br></br>
                <b>Descripcion:</b>{ReactHtmlParser(curso.descripcion)}<br></br>
                <b>Autor:</b>{curso.autor}<br></br>
                <b>Duracion:</b>{curso.horas}<br></br>
                <b>Fecha Apertura:</b>{curso.fechaapertura}<br></br>
            </div>
            )
    })
}*/
htmlMedia(){
    console.log("Control oembebe");

}

renderLeccion(){
    const divStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px'
    };
      return this.state.contenidos.map((lecccion)=>{
          return(
            <div key={lecccion.idcont} className="row bg-light color-palette">
                <div className="col-md-10">
                    <a href="#">
                        {lecccion.titulo}
                    </a>
                </div>
                <div className="col-md-2">
                    <i className="fas fa-arrow-circle-right"></i>
                </div>
                <div className="col-md-10" > {ReactHtmlParser(lecccion.texto)}</div>
            </div>
              )
    })
}
render() {

    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className ="card card-info">
                        <div className ="card-header">
                            <h3 className ="card-title"><b>Curso: {this.state.lecciontitulo}</b> </h3>
                        </div>
                        <div className ="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="col-md-12">
                                            {this.renderLeccion()}
                                    </div>
                                </div>
                            </div>
                         </div>
                        <div className ="card-footer">
                            <button type="button" className="btn btn-primary" onClick={()=>this.regresarCurso()}>Regresar</button>
                            <button type="button" className="btn btn-primary" onClick={()=>this.videochat()}>Video</button>
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
regresarCurso(){
    window.location.href = "vercurso?idcurso="+this.state.frmidcurso;
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
export default Verleccion;
if (document.getElementById('verleccion')) {
    ReactDOM.render(<Verleccion />, document.getElementById('verleccion'));
}