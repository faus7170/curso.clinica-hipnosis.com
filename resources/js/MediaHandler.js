export default class MediaHandler {
    getPermissions(audio,video) {
        return new Promise((res, rej) => {
            navigator.mediaDevices.getUserMedia({video: video, audio: audio})
            .then((stream) => {
                res(stream);
            })
            .catch(err => {
                    throw new Error(`Unable to fetch stream ${err}`);
                })
            });
        }
}