$(function () {
        canvas = document.getElementById("canvas"); // строка сценария извлекает узел в модели DOM, представляющий <canvas>элемент, путем вызова document.getElementById()метода
        var ctx = canvas.getContext("2d"); // Когда у нас есть узел элемента, вы можете получить доступ к контексту рисования, используя его getContext()метод.
        setInterval(draw, 20);

        function draw() {
            let R = parseInt(document.getElementById("R").value);
            let step = 20;

            ctx.clearRect(0, 0, 500, 500);
            ctx.beginPath();

            ctx.font = "8px Georgia";
            ctx.fillStyle = "#000000";

            drawAxis();
            drawMarkUp(step, 5);
            drawFigure(R, step);

            ctx.closePath();

            drawTable();



        }

        function drawTable(){
            let cells = Array.prototype.slice.call(document.getElementById("table_data").getElementsByTagName("td"));
            let n = cells.length;
            if(Number(cells[2].innerHTML) !== 0){
                for(let i = 0; i < n; i = i + 6){
                    drawPoint(Number(cells[i].innerHTML), Number(cells[i + 1].innerHTML),cells[i + 5].innerHTML, Number(cells[i+2].innerHTML));
                }
            }

        }

        function drawPoint(x,y,Result, R)
        {
            ctx.beginPath()
            if (Result == "Балдеж") {
                if (R == 1) ctx.fillStyle = "rgb(0,44,255)";
                if (R == 2) ctx.fillStyle = "rgb(208,0,255)";
                if (R == 3) ctx.fillStyle = "rgb(255,183,0)";
                if (R == 4) ctx.fillStyle = "rgb(0,225,255)";
                if (R == 5) ctx.fillStyle = "rgb(0,132,78)";

            }
            else ctx.fillStyle = "rgb(255,0,0)";
            ctx.arc(250 + 2*x*20, 250 - 2*y*20, 3, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.font = "16px Georgia";
            ctx.fillText(String(R),250 + 2*x*20, 250 - 2*y*20)

            ctx.fill();
            ctx.closePath();
        }

        function drawFigure(R,step)
        {
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


        }

        function drawMarkUp(step,MarkStep)
        {
            ctx.moveTo(250+step*5,255);
            ctx.lineTo(250+step*5,245);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText(String(MarkStep/2), 250 + step*5, 265);

            ctx.moveTo(250+2*step*5,253);
            ctx.lineTo(250+2*step*5,247);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText(""+String(MarkStep), 467, 262);

            ctx.moveTo(250-step*5,253);
            ctx.lineTo(250-step*5,247);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("-"+String(MarkStep/2), 135, 262);

            ctx.moveTo(250-2*step*5,253);
            ctx.lineTo(250-2*step*5,247);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("-"+String(MarkStep), 30, 262);

            ctx.moveTo(253,250 + step*5);
            ctx.lineTo(247,250 + step*5);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("-"+String(MarkStep/2), 262, 363);

            ctx.moveTo(253,250 + 2*step*5);
            ctx.lineTo(247,250 + 2*step*5);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText("-"+String(MarkStep), 262, 473);

            ctx.moveTo(253,250 - step*5);
            ctx.lineTo(247,250 - step*5);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText(String(MarkStep/2), 262, 144);

            ctx.moveTo(253,250 - step*5);
            ctx.lineTo(247,250 - step*5);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillText(String(MarkStep), 262, 34);

        }

        function drawAxis(){


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
            ctx.fillText("Y", 235, 10);

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
            ctx.fillText("X", 490, 265);
        }


    }
);