import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
class Micurso extends Component {
    constructor(props) {
    super(props);
    //Initialize the state in the constructor
    this.state = {
        cursos:[],
        currentcursos: null,
        cursoimagen:''
    }
}
    componentDidMount(){
    fetch('../cursousuario/getmisCursos')
        .then(response => {
        return response.json();
})
.then(response => {
    console.log(response.data);
    //Fetched product is stored in the state
    this.setState({cursos:response.data});
    console.log(this.state.cursos);
})
.catch(error=>{
    alert("Error "+error)
});
}
renderList(){
    return this.state.cursos.map((curso)=>{
        //this.setState({cursoimagen:'../'+curso.fotoport})
        return(
            <div className="col-md-4" key={curso.idcurso}>
                <div className="card">
                    <div className="card-header"><b>ENTRENAMIENTO:</b> {curso.nombre}</div>
                    <div className="card-body">
                        <img src={"../"+curso.fotoport} height='200px' width='100%'/>
                    </div>
                    <div className="card-footer small-box-footer">
                        <b>Profesor:</b> {curso.autor}<br></br>
                        <b>Horas:</b> {curso.horas}<br></br>
                        {ReactHtmlParser(curso.descripcion)}
                    </div>
                    <a href="#"  onClick={()=>this.verCurso(curso.idcurso)} className="card-footer small-box-footer">Entrenar <i className="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            )
    })
}
render() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                 {  this.renderList()}
            </div>
        </div>

        );
}
verCurso(idcurso){
    window.location.href = "../curso/vercurso?idcurso="+idcurso;
}


}
export default Micurso;
if (document.getElementById('micurso')) {
    ReactDOM.render(<Micurso/>, document.getElementById('micurso'));
}