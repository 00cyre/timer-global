var cronometro = new Date().getMilliseconds();
var shouldstop = false;
var tempo = 0;
var startTime = 0;
var currentitem;
var strs = new Array();
function clearids()
{
    var classes = document.getElementsByClassName("timer");
    for (var i = 0;i < classes.length;i++)
    {
        classes[i].innerHTML = (tempo/ 1000 ).toFixed(3);
        classes[i].removeAttribute("class");
    }
}

function fill(data)
{
    data.dupla = data;
    for(var i = 0; i < data.dupla.length;i++)
    {
        var element = data.dupla[i];
        var str = "";
        str +=`<tr class="items"><th scope="row" class="pos">` + (i +1) +`</th><td>`;
        element.competidores.forEach(elz => {
            str += ``+ elz + `<br>`;
        });
        str += `</td><td>`;
        element.animais.forEach(an => {
            str += ``+ an + `<br>`;
        });
        str += `</td>
      </tr>
      `
    strs.push(str);
    document.getElementById("Entrada").innerHTML += str;
    }  
}
function stop(stop)
{
    data.dupla = data;
    tempo = cronometro;
    shouldstop = true;
    clearids();
    

}
var sortstart = false;
function start(data)
{
    
    data.dupla = data;
    if (!sortstart)
        {
            sort();
            sortstart = true;
        }
    tempo = new Date(data.dupla[0].tempoini).getMilliseconds();;
    clearids();
    cronometro = 0;
    shouldstop = false;
    if (data.dupla.length > 0)
    {
        let now;
        document.getElementById("categoria").innerHTML = data.dupla[0].categoria;
        if (data.dupla[0].tempofim != "")
        {
            now = data.dupla[0].tempofim;
        }
        else
        {
            now = new Date();
        }
        let received = new Date(data.dupla[0].tempoini);
        let diff = (now -  received) ;
        startTime = received;
        cronometro = cronometro + diff;
        let numeracao = 1;
        var str = "";
        data.dupla.forEach(element => {
            str +=`<tr class="items"><th scope="row" class="pos"></th><td>`;
            element.competidores.forEach(elz => {
                str += ``+ elz + `<br>`;
            });

            str += `</td><td>`;
            element.animais.forEach(an => {
                str += ``+ an + `<br>`;
            });
            if (element.tempofim != "SAT")
            {
            str += `</td>
            <td class='timer'></td>
          </tr>
          `;
            }else
            {
                str += `</td>
                <td>SAT</td>
              </tr>
              `;  
            }
        });
        strs.push(str);
        document.getElementById("Classificacao").innerHTML += str;
    }


}
function cont()
{
    shouldstop = false;
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function sort(){
    var x = setInterval(function(){
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("Classificacao");
    var pos;
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        //check if the two rows should switch place:
        if(y.innerHTML != "SAT")
        {
            
            rows[i + 1].getElementsByTagName("TH")[0].innerHTML = i + 1;
            if (x.innerHTML != "SAT")
            {
                rows[i].getElementsByTagName("TH")[0].innerHTML = i;
            }
            if (y.innerHTML < x.innerHTML) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
            }
        }
        else if (y.innerHTML == "SAT")
            {
                //rows[i].parentNode.insertAfter(rows[i + 1], rows[i])
            }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    },1000);
}
// Update the count down every 1 second
function fstart()
{
    startTime = Date.now();
    
    var x = setInterval(function() {
        if (!shouldstop)
            {
                
                cronometro = Date.now() - startTime;
                var classes = document.getElementsByClassName("timer");
                
                Array.prototype.forEach.call (classes, function (node) {
                    if (node.innerHTML == null)
                    {
                        node.innerHTML = (cronometro / 1000 ).toFixed(3);
                    }
                    else
                    {
                        node.innerHTML = (cronometro / 1000 ).toFixed(3);
                    }
                } );

                document.getElementById("timer").innerHTML = (cronometro / 1000 ).toFixed(3);

            }
        else if (shouldstop) 
            {
                
            }
        }, 10);
        
    clearids();
}
function reset()
{
    cronometro = 0;
}
