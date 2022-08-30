/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    //console.log(FileTransfer);
    //console.log(navigator.device.capture);
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');


}

function getcamera() {
    
    navigator.device.capture.captureVideo(captureSuccess, captureError, { limit: 1 });
    function captureSuccess(mediaFiles) {
            uploadFile(mediaFiles);
    };

    // capture error callback
    function captureError(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    function uploadFile(mediaFiles) {
        var win = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        var fail = function (error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }


        var fileURL = mediaFiles;
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = "fileName.mp4";
        options.mimeType = "video/mp4";
        options.chunkedMode = false;
        // options.headers = {
        //     Connection: "close"
        //  };
        // var params = {};
        // params.value1 = fileURL[0].size;
        // params.value2 = fileURL[0].name;
        // options.params = params;

        var ft = new FileTransfer();
        ft.upload(fileURL[0].fullPath, encodeURI("https://brightnerd.site/uploadvideo.php"), win, fail, options);
    }

}
