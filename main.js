var song1="";
var song2="";
var leftWristX=0;
var leftWristY=0;
var rightWristX=0;
var rightWristY=0;
var scoreLeftWrist=0;
var scoreRightWrist=0;



function setup(){
    canvas=createCanvas(800,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    
    posenetVar=ml5.poseNet(video,playSound);
    posenetVar.on('pose',showDot);

    
}

function preload() {
    song1=loadSound("sound.mp3");
    song2=loadSound("music.mp3");
}

function draw() {
    
    image(video,0,0,800,400);
    
    fill("#6a85b0");
    stroke("#6a85b0");

    if(scoreLeftWrist>0.1){
    circle(leftWristX+120,leftWristY,35);
     document.getElementById("speed").innerHTML="Song : Run To Break Free";
    song1.play();
    song2.stop();
    }

     if(scoreRightWrist>0.1){
    circle(leftWristX+120,leftWristY,35);
     document.getElementById("speed").innerHTML="Song : DJ Song";
    song2.play();
    song1.stop();
     }
}

function music() {
    song1.play();
    song2.setVolume(0.5);
    song2.rate(1);
    song1.setVolume(0.5);
    song1.rate(1);
}

function playSound() {
    console.log("model is loaded.");
}

function showDot(results) {
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}