import React, { Component } from 'react';
//import React from 'react';
import ReactDOM from 'react-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';

import md5 from 'md5';

class Nuevocurso extends Component {
    constructor(props) {
    super(props);
    //Initialize the state in the constructor
    this.state = {
        frmNombre:'',
        frmDescripcion:'',
        frmAutor:'',
        frmTiempo:'',
        frmValor:'',
        frmImpuesto:'',
        frmFechaper:'',
        frmFechcierre:'',
        frmFotoport:null,
        varidcurso:0,
        frmLecTitulo:'',
        frmLecDescripcion:'',
        idcurso:'',
        nombreCurso:'',
        miscursos:[]
    }
    this.handleChangeNombre = this.handleChangeNombre.bind(this);

    this.handleChangeAutor = this.handleChangeAutor.bind(this);
    this.handleChangeTiempo = this.handleChangeTiempo.bind(this);
    this.handleChangeValor = this.handleChangeValor.bind(this);
    this.handleChangeImpuesto = this.handleChangeImpuesto.bind(this);
    this.handleChangeFechaper = this.handleChangeFechaper.bind(this);
    this.handleChangeFechcierre = this.handleChangeFechcierre.bind(this);
    this.handleChangeFotoport = this.handleChangeFotoport.bind(this);
    this.handleChangeLecTitulo = this.handleChangeLecTitulo.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeDescripcion = this.handleOnChangeDescripcion.bind(this);

    //this.fileUpload = this.fileUpload.bind(this)
    //this.onChangeFoto = this.onChangeFoto.bind(this);
}





    handleChangeNombre(event) {
    this.setState({frmNombre: event.target.value});
}
    /* handleChangeDescripcion(event) {
     this.setState({frmDescripcion: event.target.value});
     }*/
    handleChangeAutor(event) {
    this.setState({frmAutor: event.target.value});
}
    handleChangeTiempo(event) {
    this.setState({frmTiempo: event.target.value});
}
    handleChangeValor(event) {
    this.setState({frmValor: event.target.value});
}
    handleChangeImpuesto(event) {
    this.setState({frmImpuesto: event.target.value});
}
    handleChangeFechaper(event) {
    this.setState({frmFechaper: event.target.value});
}
    handleChangeFechcierre(event) {
    this.setState({frmFechcierre: event.target.value});
}

    /**
     * Para subir archivos
     */

    /*onChangeFoto(e) {
     console.log("Entro archivo");
     let files = e.target.files || e.dataTransfer.files;
     if (!files.length)
     return;
     this.createImage(files[0]);
     }*/
    handleChangeFotoport(event) {
  //  console.log( 'XXXXXX'+event);
    // this.setState({frmFotoport: event.target.files});
    let files = event.target.files || event.dataTransfer.files;
    this.setState({frmFotoport: event.target.files[0],loaded: 0 })
//    console.log(this.state.frmFotoport);
    //reader.readAsDataURL(file);
}

    /**
     * Cambios en leccciones
     */
    handleChangeLecTitulo(event) {
    this.setState({frmLecTitulo: event.target.value});
}
    handleOnChangeDescripcion(e,editor) {
    this.setState({frmDescripcion: editor.getData()});
}
handleOnChange(e,editor) {
//console.log("=====================");
    ///console.log(editor.getData());
  this.setState({frmLecDescripcion: this.utf8_to_b64(editor.getData())});

   // console.log(this.state.frmLecDescripcion);
}



componentDidMount(){
  this.cargaComponetes();
}
cargaComponetes(){
    fetch('../curso/getCursos')
        .then(response => {
        return response.json();
})
.then(response => {
    //console.log(response.data);
    //Fetched product is stored in the state
    this.setState({miscursos:response.data});
})
.catch(error=>{
    alert("Error "+error)
});

}

renderList(){
    const stylemodallec = {
        display: "block",
        paddingRight: "17px"
    };
    return(
        <div className="componente">
            <form>
                <div className ="card card-info">
                    <div className ="card-header">
                        <h3 className ="card-title">Crear curso editado</h3>
                    </div>
                    <div className ="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className ="input-group mb-3">
                                    <div className="col-md-4">
                                        <span>Nombre editado</span>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className ="form-control" placeholder="Nombre"  value={this.state.frmNombre} onChange={this.handleChangeNombre}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className ="input-group mb-3">
                                    <div className ="col-md-2 ">
                                        <span>Descripcion</span>
                                    </div>
                                    <div className ="col-md-10">
                                        <CKEditor

                                        editor={ClassicEditor}
                                        onChange={this.handleOnChangeDescripcion}
                                        config={{
                                            toolbar: {
                                                items: [
                                                    'heading',
                                                    '|',
                                                    'bold',
                                                    'underline',
                                                    'italic',
                                                    'link',
                                                    'bulletedList',
                                                    'numberedList',
                                                    '|',
                                                    'indent',
                                                    'outdent',
                                                    'alignment',
                                                    '|',
                                                    'blockQuote',
                                                    'insertTable',
                                                    'mediaEmbed',
                                                    'undo',
                                                    'redo',
                                                    '|',
                                                    'codeBlock',
                                                    'pageBreak',
                                                    '|',
                                                    'fontBackgroundColor',
                                                    'fontColor',
                                                    'fontSize',
                                                    'fontFamily',
                                                    '|',
                                                    'exportPdf'
                                                ]
                                            },
                                        heading: {
                                            options: [
                                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                                        ]
                                        },
                                      }}

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className ="input-group mb-3">
                                    <div className ="col-md-4">
                                        <span>Autor</span>
                                    </div>
                                    <div className ="col-md-8">
                                        <input type="text" className ="form-control" placeholder="Autor" value={this.state.frmAutor} onChange={this.handleChangeAutor}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className ="input-group mb-3">
                                    <div className ="col-md-4">
                                        <span>Tiempo</span>
                                    </div>
                                    <div className ="col-md-8">
                                        <input type="text" className ="form-control" placeholder="Ejm: 1 Hora" value={this.state.frmTiempo} onChange={this.handleChangeTiempo}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className ="input-group mb-3">
                                    <div className ="col-md-4">
                                        <span>Valor</span>
                                    </div>
                                    <div className ="col-md-8">
                                        <input type="text" className ="form-control" placeholder="Valor" value={this.state.frmValor} onChange={this.handleChangeValor} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className ="input-group mb-3">
                                    <div className ="col-md-4">
                                        <span >Impuesto</span>
                                    </div>
                                    <div className ="col-md-8">
                                        <input type="text" className ="form-control" placeholder="Impuesto" value={this.state.frmImpuesto} onChange={this.handleChangeImpuesto} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className ="input-group mb-3">
                                    <div className ="col-md-4">
                                        <span>Fecha Apertura</span>
                                    </div>
                                    <div className ="col-md-8">
                                        <input type="text" className ="form-control" placeholder="Fecha Apertura" value={this.state.frmFechaper} onChange={this.handleChangeFechaper}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className ="input-group mb-3">
                                    <div className ="col-md-4">
                                        <span>Fecha Cierre</span>
                                    </div>
                                    <div className ="col-md-8">
                                        <input type="text" className ="form-control" placeholder="Fecha Cierre" value={this.state.frmFechcierre} onChange={this.handleChangeFechcierre}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className ="input-group mb-3">
                                    <div className ="col-md-4">
                                        <span>Foto Portada</span>
                                    </div>
                                    <div className ="col-md-8">
                                        <input type="file" name="file"  className ="form-control" readOnly = {true} onChange={this.handleChangeFotoport}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group">
                            <button type="button" className="btn btn-info" onClick={()=>this.sendNetworkProduct()}>Guardar</button>
                            <input type="text" className ="form-control" placeholder="id" value={this.state.varidcurso} style={{ display: 'none'}} />
                        </div>
                    </div>
                </div>
            </form>
            <form>
                <div className="modal fade show" id="modal-leccion" style={{stylemodallec}} aria-modal="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Curso: {this.state.idcurso} {this.state.nombreCurso} - Nueva Lacción</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className ="form-group">
                                            <span>Titulo</span>
                                            <input type="text" className ="form-control" placeholder="Nombre"  value={this.state.frmLecTitulo} onChange={this.handleChangeLecTitulo}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className ="form-group mb-3">
                                            <span>Contenido leccion</span>
                                            <CKEditor
                                            editor={ClassicEditor}
                                            onChange={this.handleOnChange}
                                            config={{
                                                mediaEmbed:{
                                                    previewsInData:true,
                                                    htmlEncodeOutput:false,
                                                    TextTransformation:false
                                                },
                                                toolbar: {
                                                    items: [
                                                        'CKFinder',
                                                        'heading',
                                                        '|',
                                                        'bold',
                                                        'underline',
                                                        'italic',
                                                        'link',
                                                        'bulletedList',
                                                        'numberedList',
                                                '|', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify',
                                                        '|',
                                                        'indent',
                                                        'outdent',
                                                        'alignment',
                                                        '|',
                                                        'blockQuote',
                                                        'insertTable',
                                                        'mediaEmbed',
                                                        'undo',
                                                        'redo',
                                                        '|',
                                                        'codeBlock',
                                                        'pageBreak',
                                                        '|',
                                                        'fontBackgroundColor',
                                                        'fontColor',
                                                        'fontSize',
                                                        'fontFamily',
                                                        '|',
                                                        'exportPdf'
                                                    ]
                                                },
                                            alignment: {
                                                options: [ 'left', 'right' ]
                                                },
                                            link: {
                                                // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
                                                addTargetToExternalLinks: true,

                                                // Let the users control the "download" attribute of each link.
                                                decorators: [
                                                {
                                                mode: 'manual',
                                                label: 'Downloadable',
                                                attributes: {
                                                download: 'download'
                                                }
                                            }
                                            ]
                                            },
                                            language: 'es',
                                           table: {
                                                contentToolbar: [
                                                'tableColumn',
                                                'tableRow',
                                                'mergeTableCells',
                                                'tableProperties'
                                                ]
                                                },
                                                heading: {
                                                        options: [
                                                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                                                                  ]
                                                         },

                                            image: {
                                                // You need to configure the image toolbar, too, so it uses the new style buttons.
                                                toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],

                                                styles: [
                                                // This option is equal to a situation where no style is applied.
                                                'full',

                                                // This represents an image aligned to the left.
                                                'alignLeft',

                                                // This represents an image aligned to the right.
                                                'alignRight'
                                                ]
                                                },

                                            ckfinder: {
                                                    openerMethod: 'popup',
                                                    // Upload the images to the server using the CKFinder QuickUpload command
                                                    // You have to change this address to your server that has the ckfinder php connector
                                                    uploadUrl: 'http://localhost/livechatweb/public/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
                                                    //uploadUrl: 'http://localhost/livechatweb/public/ckfinder/connector?command=QuickUpload&type=Images&responseType=json'
                                                //toolbar: [ 'ckfinder', '|', 'heading', '|', 'bold', 'italic','link', '|', 'undo', 'redo' ,'table'],
                                                    options: {
                                                        resourceType: 'Images'
                                                    }
                                                }
                                            }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={()=>this.sendLeccion(this.state.idcurso)}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


            <div className ="card card-info">
                <div className ="card-header">
                    <h3 className ="card-title">Mis curso</h3>
                </div>
                <div className ="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th width="20%">Nombre</th>
                                <th width="35%">Descripcion</th>
                                <th width="15%">Autor</th>
                                <th width="10%">Precio</th>
                                <th width="20%">...</th>
                            </tr>
                        </thead>
                        <tbody>
                                 {this.renderListDatos()}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        )
}
renderListDatos(){
    return this.state.miscursos.map((data)=>{
        return(
            <tr key={data.idcurso}>
                <td>{data.nombre}</td>
                <td> {ReactHtmlParser(data.descripcion)}</td>
                <td>{data.autor}</td>
                <td>{data.precio}</td>
                <td>
                    <button  type="button" className="btn btn-info" data-toggle="modal" data-target="#modal-leccion" onClick={()=>this.setDatosLeccion(data)}> <i class="far fa-address-card"></i></button>
                    <button  type="button" className="btn btn-info" onClick={()=>this.setDatosEditar(data)}><i class="far fa-edit"></i></button>
                    <button  type="button" className="btn btn-info" onClick={()=>this.setDatosEmininar(data)}><i class="far fa-trash-alt"></i></button>
                    <button onClick={()=>this.verCurso(data.idcurso)} type="button" className="btn btn-info" ><i class="far fa-eye"></i></button>
                </td>
            </tr>
            )
    })
}

setDatosLeccion(data){
    this.setState({idcurso: data.idcurso});
    this.setState({nombreCurso: data.nombre});
}

setDatosEditar(data){
    this.setState({frmNombre: data.nombre});
    this.setState({frmDescripcion: data.descripcion});
    this.setState({frmAutor: data.autor});
    this.setState({frmTiempo: data.horas});
    this.setState({frmValor: data.valor});
    this.setState({frmImpuesto: data.impuesto});
    this.setState({frmFechaper: data.fechaapertura});
    this.setState({frmFechcierre: data.fechacierre});
    this.setState({frmFotoport: data.fotoport});
    this.setState({varidcurso: data.idcurso});

}

render() {
    return (
        this.renderList()
        );
}

__cargaArchivo1(e){
    $("#nameArchivo1").html("<img src='img/loader5.gif' height='32' width='32'>");
    $.each(e.target.files, function(key, file) {
        $('.files').append('<li>' + file.name + '</li>');
        var data = new FormData();
        data.append("archivo", file);
        console.log(file);
        $.post({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: baseUrl('obligaciones/cargaArchivo'),
            //type: 'POST',
            dataType: 'json',
            contentType:false,
            processData: false,
            data: data
        }, function(r){
            if(r.response) {
                $("#nameArchivo1").html(r.archivo);
                $("#namefile1").val(r.newfilename);
                self.namefile1=r.newfilename;

            } else {
                $("#nameArchivo1").html('Examinar...');
                $("#namefile1").val();
                alert(r.error);
            }
        }, 'json');
    });
}

setKey(data){
    this.setState({frmNombre: data.nombre});
    this.setState({varidcurso: data.idcurso});
}
verCurso(idcurso){
    window.location.href = "../curso/vercurso?idcurso="+idcurso;
}
setDatosEmininar(data){
    const formData = new FormData()
    formData.append('idcurso',data.idcurso)
    axios.post('delete',formData).then(response=>{
        if (response.data.success==true) {
        this.setState({varidcurso: response.data.idcurso});
        alert('Registro eliminado exito')
        this.cargaComponetes();
        }
    }).catch(error=>{
            alert("Error "+error)
    })
}
sendNetworkProduct(){
    const formData = new FormData()
    formData.append('nombre',this.state.frmNombre)
    formData.append('descripcion',this.state.frmDescripcion)
    formData.append('autor',this.state.frmAutor)
    formData.append('horas',this.state.frmTiempo)
    formData.append('valor',this.state.frmValor)
    formData.append('impuesto',this.state.frmImpuesto)
    formData.append('fechaapertura',this.state.frmFechaper)
    formData.append('fechacierre',this.state.frmFechcierre)
    formData.append('fotoport',this.state.frmFotoport)
    formData.append('idcurso',this.state.varidcurso)

    //console.log(formData);
    axios.post('save',formData).then(response=>{
        if (response.data.success==true) {
        this.setState({varidcurso: response.data.idcurso});
        this.cargaComponetes();
        alert('Curso Guardado con exito')
    }
}).catch(error=>{
    alert("Error "+error)
})
}

utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

sendLeccion(idcurso){
    const formData = new FormData()
    formData.append('titulo',this.state.frmLecTitulo)
    formData.append('texto',this.state.frmLecDescripcion)
    formData.append('idcurso',idcurso)
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
export default Nuevocurso;
if (document.getElementById('nuevocurso')) {
    ReactDOM.render(<Nuevocurso />, document.getElementById('nuevocurso'));
}
