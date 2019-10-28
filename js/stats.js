
$(document).ready(function(){
  var options = {
    // legend: false,
 
    responsive: false
  };
  var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');


ctx.strokeRect(10, 10, 100, 100);


  new Chart($("#canvas1"), {
    type: 'doughnut',

    tooltipFillColor: "rgba(51, 51, 51, 0.55)",
    data: {
    labels: [
      "Placed",
      "Being Picked",
      "Completed",
      "Shipped"
     
    ],
    datasets: [{
    data: [30, 15, 10,  15],
    backgroundColor: [
      "#73e2b7",
      "#ff883f",
      "#6094ff",
      "#bb78ff"
    ],
    hoverBackgroundColor: [
       "#73e2b7",
      "#ff883f",
      "#6094ff",
      "#bb78ff"
    ]
    }]
  },
    options: { responsive: false,
      position: "right",

     }

  });           
});
$(document).ready(function(){
  var options = {
    // legend: false,
    responsive: false
  };
  new Chart($("#canvas2"), {
    type: 'doughnut',
    tooltipFillColor: "rgba(51, 51, 51, 0.55)",
    data: {
    labels: [
      "Placed",
      "Being Picked",
      "Completed",
    
     
    ],
    datasets: [{
    data: [20, 20, 60,  ],
    backgroundColor: [
      "#73e2b7",
      "#096aba",
      "#f3f5fb",

    
    ],
    hoverBackgroundColor: [
      "#73e2b7",
      "#096aba",
      "#f3f5fb",
     
    ]
    }]
  },
    options: { responsive: false }
  });           
});
$(document).ready(function(){
  var options = {
    // legend: false,
    responsive: false
  };
  new Chart($("#canvas3"), {
    type: 'doughnut',
    tooltipFillColor: "rgba(51, 51, 51, 0.55)",
    data: {
    labels: [
      "Placed",
      "Being Picked",
      "Completed",
      "Shipped"
     
    ],
    datasets: [{
    data: [15, 20, 30,  10],
    backgroundColor: [
     "#73e2b7",
      "#ff883f",
      "#6094ff",
      "#bb78ff"
    ],
    hoverBackgroundColor: [
     "#73e2b7",
      "#ff883f",
      "#6094ff",
      "#bb78ff"
    ]
    }]
  },
    options: { responsive: false }
  });           
});

