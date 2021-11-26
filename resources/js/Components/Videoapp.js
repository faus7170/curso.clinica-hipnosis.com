import React, { Component } from 'react';
//import React from 'react';
import ReactDOM from 'react-dom';
import MediaHandler from '../Mediahandler';
import Pusher from 'pusher-js';
import Peer from 'simple-peer';
const APP_KEY = '64956faaa3199da9043c';
class Videoapp extends Component {
    constructor() {
        super();
        this.state = {
            hasMedia: false,
            otherUserId: null,
            codigo:'',
            rol:''
        };
        this.user = window.user;
        this.user.stream = null;
        this.peers = {};
        this.mediaHandler = new MediaHandler();
        this.callTo = this.callTo.bind(this);
        this.setupPusher = this.setupPusher.bind(this);
        this.startPeer = this.startPeer.bind(this);
        this.handleChangeCodigo = this.handleChangeCodigo.bind(this);
        this.Conectar = this.Conectar.bind(this);

    }
    handleChangeCodigo(event) {
    this.setState({codigo: event.target.value});
}
    /**
     * Funcion inicializamos el video componente
     */
componentWillMount() {
    this.mediaHandler.getPermissions(false,true)
    .then((stream) => {
        this.setState({hasMedia: true});
        this.user.stream = stream;
        try {

            this.myVideo.srcObject = stream;
        } catch (e) {
            this.myVideo.src = URL.createObjectURL(stream);
        }
        this.myVideo.play();
    })

}
/**
 * Funcion llamar a
 */
Conectar() {
    this.setupPusher();
}
/**
 * Funcion setup Pusher
 */
setupPusher() {
    //Pusher.logToConsole=true;
    this.pusher = new Pusher(APP_KEY, {
        authEndpoint: '../auth',
        cluster: 'mt1',
        auth: {
            params: this.user.id,
            headers: {
                'X-CSRF-Token': window.csrfToken
            }
        }
    });
    this.pusher.unsubscribe('presence-video-channel');
    var state = this.pusher.connection.state;
    console.log("Cont>>>>>========================="+state);
    console.log("Cont0========================="+this.state.codigo);
    // this.channel = this.pusher.subscribe('presence-video-channel');
    if(this.user.rol==1){

        //this.setState({codigo: this.user.canal});
        // this.channel = this.pusher.subscribe(this.user.canal);
    }else
    {
        // this.channel = this.pusher.subscribe(this.state.codigo);
    }
    this.channel = this.pusher.subscribe('presence-video-channel');
    this.channel.bind(`client-signal-${this.user.id}`, (signal) => {
        let peer = this.peers[signal.userId];
        //si peer no existe actualmente, recibimos una llamada entrante
        if(peer === undefined) {
            this.setState({otherUserId: signal.userId});
            peer = this.startPeer(signal.userId, false);
        }
        peer.signal(signal.data);
    });
    console.log("Cont1.2=========================");
}

/**
 * Funcion llamar a
 */
callTo(userId) {
    console.log("Inicia coneccion con:"+userId);
    this.peers[userId] = this.startPeer(userId);
}
/**
 * Funcionstar Peer
 */
startPeer(userId, initiator = true) {
    console.log("Cont2 inicia perr =========================");
    const peer = new Peer({
        initiator,
        stream: this.user.stream,
        trickle: false
    });
    console.log(peer.on);
    peer.on('signal', (data) => {
        if(this.channel.members.count==0){
            console.log("No hay mas mimbros en el canal");
            //mensaje.innerHTML("XXXXXXX");
         }
        //console.log(this.channel.callbacks._callbacks);
        this.channel.trigger(`client-signal-${userId}`, {
                type: 'signal',
                userId: this.user.id,
                data: data
        });
        console.log("Cont 3 Signal ========================="+this.user.id+"---"+userId);
    });
    peer.on('stream', (stream) => {
       // console.log("STREAM:"+stream);
        try {
            this.userVideo.srcObject = stream;
        } catch (e) {
            this.userVideo.src = URL.createObjectURL(stream);
        }
        this.userVideo.play();
        console.log("Cont 4 Stream =========================");
        return ;
    });
    peer.on('close', () => {
        let peer = this.peers[userId];
        if(peer !== undefined) {
            peer.destroy();
        }
        this.peers[userId] = undefined;
        console.log("Cont 5 CLOSE ========================="+userId);
    });
console.log("Cont6 cierra =========================");
return peer;
}


activarAudio(){
    this.mediaHandler.getPermissions(false,true)
}
disconectPusher(){
    console.log("Salir>>>>>========================="+pusher);
    this.pusher.disconnect();
    console.log("Salir1>>>>>========================="+pusher);
}







codigo(){
    if(this.user.rol==0)
        return <input type="text" className ="form-control" placeholder="Fecha Apertura" value={this.state.codigo} onChange={this.handleChangeCodigo}/>
}
render() {
    return (
        <div className="App">
                {[1,2,3].map((userId) => {
                    return this.user.id !== userId ? <button key={userId} onClick={() => this.callTo(userId)}>Call {userId}</button> : null;
                    })}
        <button key={this.user.id} onClick={() => this.Conectar()}>Conectar</button>
            {this.codigo()}
            <div className="video-container">
                <video className="my-video" ref={(ref) => {this.myVideo = ref;}}></video>
                <video className="user-video" ref={(ref) => {this.userVideo = ref;}}></video>
                <div id="mensaje"></div>
            </div>
         </div>
             );
   }
}
export default Videoapp;
if (document.getElementById('videoapp')) {
    ReactDOM.render(<Videoapp />, document.getElementById('videoapp'));
    }