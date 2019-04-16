
var startDate = new Date("Apr 17, 2019 13:41:00.725").getTime();
var endDate   = new Date("Apr 17, 2019 13:51:00.725").getTime();
var cronometro = 0;
var shouldstop = false;


function stop(stop)
{
    shouldstop = true;
    let li = document.createElement('li');
    li.innerText = this.format((cronometro /2.5 /100).toFixed(3));
    this.results.appendChild(li);
}
function start()
{
    cronometro = 0;
    shouldstop = false;
}
function cont()
{
    shouldstop = false;
}
// Update the count down every 1 second
function fstart()
{
    var x = setInterval(function() {
        if (!shouldstop)
        {
          // Get todays date and time
          var now = new Date().getTime();
        
          // Find the distance between now and the count down date
          //var distance = countDownDate - now;
          cronometro = cronometro + 1; 
          // Time calculations for days, hours, minutes and seconds
          //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          //var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          //var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          //var milisecond = Math.floor((distance % (1000)));
          // Display the result in the element with id="demo"
          document.getElementById("timer").innerHTML = (cronometro /2.5 /100).toFixed(3);/*days + " " + hours + " "
          + minutes + " " + seconds + " " + milisecond + " ";
        */
        }
          // If the count down is finished, write some text 
          else if (shouldstop) {
            document.getElementById("timer").innerHTML = (cronometro /2.5 /100).toFixed(3);
          }
          console.log("Test ");
        }, 1);
}
function reset()
{
    cronometro = 0;
}
