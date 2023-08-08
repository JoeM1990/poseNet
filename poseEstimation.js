let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  
  poseNet = ml5.poseNet(video, modelReady);
  
  poseNet.on('pose', function(results) {
    poses = results;

    //console.log(poses[0].pose);

  });
  
  video.hide();
}

function modelReady() {
  select('#status').html('Api chargé avec success');
}

function draw() {
  image(video, 0, 0, width, height);

 
  drawKeypoints();
  drawSkeleton();
}

function drawKeypoints()  {
  
  for (let i = 0; i < poses.length; i++) {
    
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      
      let keypoint = pose.keypoints[j];
     
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        stroke(255, 255, 255);
        strokeWeight(1);
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

        
      }

     
    }
  }
}

function drawSkeleton() {
  
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
   
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 255, 255);
      strokeWeight(5);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}