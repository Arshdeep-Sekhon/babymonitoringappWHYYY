status = "";
objects = [];
person = "";
alarm = "";

function setup() {
    canvas = createCanvas(450, 450);
    canvas.position(460, 75);
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
}

function draw() {
    image(video, 0, 0, 450, 450);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "STATUS : DETECTED OBJECTS";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person") {
                person = true;
            }
            if(person == true) {
                document.getElementById("detected_or_not_detected").innerHTML = "BABY FOUND";
                alarm.stop();
            }
            else if(person != true) {
                document.getElementById("detected_or_not_detected").innerHTML = "BABY NOT FOUND";
                alarm.speed(1);
                alarm.volume(2);
                alarm.play();
            }
        }
    }
}

function preload() {
    alarm = "alarm_clock_samsung.mp3";
}

function modelLoaded() {
    console.log("OBJECT DETECTOR NAME : COCOSSD, STATUS : MODEL SUCCESSFULY LOADED");
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}