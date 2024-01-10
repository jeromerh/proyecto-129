rigth_wrist_x=0
rigth_wrist_y=0
left_wrist_x=0
left_wrist_y=0
score_right_wrist=0
score_left_wrist=0
sound=""
function setup(){
canvas=createCanvas(600,500)
canvas.center()
video=createCapture(VIDEO)
video.hide()
posenet=ml5.poseNet(video,modelLoad)
posenet.on("pose",gotPoses)
}
function preload(){
sound=loadSound("music.mp3")
}
function draw(){
 image(video,0,0,600,500)
 fill("blue")
 stroke("cyan")
 if(score_right_wrist>0.2){
 circle(rigth_wrist_x,rigth_wrist_y,20)
 if(rigth_wrist_y>0 && rigth_wrist_y<=100){
 document.getElementById("velocidad").innerHTML="velocidad igual a 0.5"
 sound.rate(0.5)
 }
 else if(rigth_wrist_y>100 && rigth_wrist_y<=200){
 document.getElementById("velocidad").innerHTML="velocidad igual a 1"
 sound.rate(1)
 }
 else if(rigth_wrist_y>200 && rigth_wrist_y<=300){
 document.getElementById("velocidad").innerHTML="velocidad igual a 1.5"
 sound.rate(1.5)
 }
 else if(rigth_wrist_y>300 && rigth_wrist_y<=400){
 document.getElementById("velocidad").innerHTML="velocidad igual a 2"
 sound.rate(2)
 }
 else if(rigth_wrist_y>400){
 document.getElementById("velocidad").innerHTML="velocidad igaul a 2.5"
 sound.rate(2.5)
 }
 }
 if(score_left_wrist>0.2){
 circle(left_wrist_x,left_wrist_y,20)
 convirtiendo=Number(left_wrist_y)
 nuevo_convirtiendo=floor(convirtiendo*2)
 dividiendo=nuevo_convirtiendo/1000
 document.getElementById("volumen").innerHTML="volumen"+dividiendo
 sound.setVolume(dividiendo)
 }
}
function modelLoad(){
    console.log("Modelo cargado correctamente")
}

function gotPoses(results){
    if(results.length>0){
       score_right_wrist=results[0].pose.keypoints[10].score
       score_left_wrist=results[0].pose.keypoints[9].score
       rigth_wrist_x=results[0].pose.rightWrist.x
       rigth_wrist_y=results[0].pose.rigthWrist.y
       left_wrist_x=results[0].pose.leftWrist.x
       left_wrist_y=results[0].pose.leftWrist.y

    }
}

function play(){
sound.play()
sound.setVolume(1)
sound.rate(1)
}
