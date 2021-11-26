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
}
    handleChangeCodigo(event) {
    this.setState({codigo: event.target.value});
}
    /**
     * Funcion inicializamos el video componente
     */
    componentWillMount() {
    this.mediaHandler.getPermissions()
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
 * Funcion setup Pusher
 */
setupPusher() {
    // Pusher.logToConsole=true;
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
    //this.channel = this.pusher.subscribe('presence-video-channel');
    this.channel = this.pusher.subscribe(this.user.canal);
    console.log("Cont0========================="+this.user.canal);
    console.log(this.channel.members);
    if(this.channel.members.count==0){
        //mensaje.innerHTML("XXXXXXX");
    }
    this.channel.bind(`client-signal-${this.user.id}`, (signal) => {
        let peer = this.peers[signal.userId];
        //si peer no existe actualmente, recibimos una llamada entrante
        if(peer === undefined) {
            this.setState({otherUserId: signal.userId});
            peer = this.startPeer(signal.userId, false);
        }
        peer.signal(signal.data);
        console.log("Cont1=========================");
    });
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
    this.setupPusher();
    console.log("Cont2=========================");
    const peer = new Peer({
        initiator,
        stream: this.user.stream,
        trickle: false
    });
    peer.on('signal', (data) => {
        this.channel.trigger(`client-signal-${userId}`, {
        type: 'signal',
            userId: this.user.id,
            data: data
    });
    console.log("Cont3=========================");
});
peer.on('stream', (stream) => {
    try {
        this.userVideo.srcObject = stream;
} catch (e) {
    this.userVideo.src = URL.createObjectURL(stream);
}
this.userVideo.play();
console.log("Cont4=========================");
});
peer.on('close', () => {

    let peer = this.peers[userId];
if(peer !== undefined) {
    peer.destroy();
}
this.peers[userId] = undefined;
console.log("Cont5=========================");
});
console.log("Cont6=========================");
return peer;
}

codigo(){
    if(this.user.rol==0)
        return <input type="text" className ="form-control" placeholder="Fecha Apertura" value={this.state.codigo} onChange={this.handleChangeCodigo}/>
}
render() {
    return (
        <div className="App">
                {[1,2,7].map((userId) => {
                    return this.user.id !== userId ? <button key={userId} onClick={() => this.callTo(userId)}>Call {userId}</button> : null;
})}
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