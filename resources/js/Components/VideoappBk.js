import React, { Component } from 'react';
//import React from 'react';
import ReactDOM from 'react-dom';
import MediaHandler from '../Mediahandler';
import Pusher from 'pusher-js';
import Peer from 'simple-peer';
const APP_KEY = '64956faaa3199da9043c';
class Videoapp extends Component {
    constructor(){
    super();
    this.state={
        hasMedia:false,
        hasVideo:false,
        hasAudio:false,
        otherUserId:null
    }
    this.user = window.user;
    this.user.stream = null;
    this.peers = {};
    this.mediaHandler = new MediaHandler();
    this.setupPusher();
    this.callTo = this.callTo.bind(this);
    this.setupPusher = this.setupPusher.bind(this);
    this.startPeer = this.startPeer.bind(this);
}
componentWillMount(){

}
setupPusher() {
    Pusher.logToConsole=true;
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
    this.channel = this.pusher.subscribe('presence-video-channel');
    this.channel.bind(`client-signal-${this.user.id}`, (signal) => {

        let peer = this.peers[signal.userId];
        // if peer is not already exists, we g  ot an incoming call
        if(peer === undefined) {
            this.setState({otherUserId: signal.userId});
            peer = this.startPeer(signal.userId, false);
        }
        peer.signal(signal.data);
    });
}
startPeer(userId, initiator = true) {
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
    });
    peer.on('stream', (stream) => {
        try {
                this.userVideo.srcObject = stream;
            } catch (e) {
                this.userVideo.src = URL.createObjectURL(stream);
        }
        this.userVideo.play();
    });
    peer.on('close', () => {
        let peer = this.peers[userId];
console.log("Revision de peerrrrr================================");
console.log(peer);
        if(peer !== undefined) {
            peer.destroy();
        }
        this.peers[userId] = undefined;
    });
    return peer;
}
callTo(userId) {
    this.peers[userId] = this.startPeer(userId);
}

encenderCamara(){
this.mediaHandler.getPermissions()
        .then((stream)=>{
            this.setState({hasVideo:true});
            this.user.stream = stream;
    console.log("XXXX")
    console.log(stream)
    //exit;
            try{
                this.myVideo.srcObject=stream;
            }catch(e){
                this.myVideo.src=URL.createObjectURL(stream);
            }
           // this.myVideo.AudioStreamTrack.enable=true;
            //this.myVideo.VideoStreamTrack.enable=true;
            this.myVideo.play();
        })
}
encenderAudio(){
    this.mediaHandler.getPermissions()
        .then((stream)=>{
        this.setState({hasMedia:true});
    this.user.stream = stream;
    try{
        this.myVideo.srcObject=stream;
    }catch(e){
        this.myVideo.src=URL.createObjectURL(stream);
    }
    this.myVideo.play();
})
}

render() {
    return (
        <div className="App">
             {[1,2,3,4,5].map((userId) => {
                 return this.user.id !== userId ? <button key={userId} onClick={() => this.callTo(userId)}>Call {userId}</button> : null;
                })}
            <div className="video-container">
                <video className="my-video" ref={(ref) => {this.myVideo = ref;}}></video>
                <video className="user-video" ref={(ref) => {this.userVideo = ref;}}></video>
            </div>
            <div className="Controles">
                <a href="#"  onClick={()=>this.encenderCamara()} className="card-footer small-box-footer">Camara <i className="fas fa-arrow-circle-right"></i></a>
            </div>
        </div>
        );
    }
}

export default Videoapp;
if (document.getElementById('videoapp')) {
    ReactDOM.render(<Videoapp />, document.getElementById('videoapp'));
}