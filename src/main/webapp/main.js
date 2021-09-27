$(function (){
        canvas = document.getElementById("canvas"); // строка сценария извлекает узел в модели DOM, представляющий <canvas>элемент, путем вызова document.getElementById()метода
        var ctx = canvas.getContext("2d"); // Когда у нас есть узел элемента, вы можете получить доступ к контексту рисования, используя его getContext()метод.
        var r = 2;
        setInterval( draw ,20);

        function windowToCanvas(canvas, x, y) {
            let bbox = canvas.getBoundingClientRect();
            return { x: x - bbox.left * (canvas.width / bbox.width),
                y: y - bbox.top * (canvas.height / bbox.height)
            };
        }

        function drawPoint(x, y, r, result) {
            ctx.beginPath();
            r=1;
            if (result == "Балдеж") {
                ctx.fillStyle = "rgba(0, 255, 0, 1)";
            }else {
                ctx.fillStyle = "rgba(255, 0, 0, 1)";
            }
            ctx.arc(250 + 2*x*20, 250 - 2*y*20, 3, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();

        }

        function checkTableAndDraw(){
            let cells = Array.prototype.slice.call(document.getElementById("table_data").getElementsByTagName("td"));
            let n = cells.length;
            if(Number(cells[2].innerHTML) !== 0){
                for(let i = 0; i < n; i = i + 6){
                    drawPoint(Number(cells[i].innerHTML), Number(cells[i + 1].innerHTML), Number(cells[i + 2]).innerHTML, "Есть пробитие");
                }
            }
        }

        canvas.onmousedown = function (e) {
            let s = 0;
            let radR = document.getElementById("R");
            if ((radR.value !=1)&&(radR.value !=2)&&(radR.value !=3)&&(radR.value !=4)&&(radR.value !=5)) {
                alert("Вы не выбрали R!");
                return 0;
            }else if(radR.value == 1) {
                s = 1;
            }
            else if (radR.value == 2) {
                s = 2;
            }else if(radR.value == 3) {
                s = 3;
            }else if(radR.value == 4) {
                s = 4;
            }else if (radR.value == 5) {
                s = 5;
            }


            let corArr = windowToCanvas(canvas, e.clientX, e.clientY);
            let x_real =  ((corArr.x - 250)/175);
            let y_real = (-1) *((corArr.y - 250)/175);

            //drawPoint(x_real,y_real,radR.value,"Есть пробитие");

            let out = document.getElementById("X");
            out.value = parseInt(x_real*s);

            out = document.getElementById("cordY");
            out.value = (y_real*s).toFixed(3);

            /* пока что коменчу что бы отладить правильный тык */
            out = document.getElementById("submint");
            out.click();
        }

        function draw(){

            let R = parseInt(document.getElementById("R").value);
            let step = 20;

            ctx.clearRect(0,0, 500, 500);
            ctx.beginPath();

            ctx.fillStyle = "rgba(255, 0, 0, 1)";

            ctx.moveTo(250,490);
            ctx.lineTo(250,10);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.moveTo(490,250);
            ctx.lineTo(10,250);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.moveTo(250,10);
            ctx.lineTo(257,17);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.moveTo(250,10);
            ctx.lineTo(243,17);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("Y", 245, 10);

            ctx.moveTo(490,250);
            ctx.lineTo(483,257);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.moveTo(490,250);
            ctx.lineTo(483,243);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("X", 490, 255);

            ctx.moveTo(250+step*5,255);
            ctx.lineTo(250+step*5,245);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("2.5", 250 + step*5, 265);

            ctx.moveTo(250+2*step*5,253);
            ctx.lineTo(250+2*step*5,247);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("5", 467, 262);

            ctx.moveTo(250-step*5,253);
            ctx.lineTo(250-step*5,247);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("-2.5", 135, 262);

            ctx.moveTo(250-2*step*5,253);
            ctx.lineTo(250-2*step*5,247);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("-5", 30, 262);

            ctx.moveTo(253,250 + step*5);
            ctx.lineTo(247,250 + step*5);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("-2.5", 262, 363);

            ctx.moveTo(253,250 + 2*step*5);
            ctx.lineTo(247,250 + 2*step*5);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("-5", 262, 473);

            ctx.moveTo(253,250 - step*5);
            ctx.lineTo(247,250 - step*5);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("2.5", 262, 144);

            ctx.moveTo(253,250 - step*5);
            ctx.lineTo(247,250 - step*5);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("5", 262, 34);

            ctx.moveTo(250,250 - step*R);
            ctx.lineTo(250 - step*R,250);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.moveTo(250-2*step*R,250);
            ctx.lineTo(250-2*step*R,250 + step*R);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.moveTo(250-2*step*R,250 + step*R);
            ctx.lineTo(250,250 + step*R);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.arc(250, 250, 2*step * R, -Math.PI / 2, 0, false);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();

            checkTableAndDraw();
        }
    }
);