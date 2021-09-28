<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %> <!--(Как можно догадаться из названия, данная директива предоставляет атрибуты для JSP страницы.) Данный атрибут задаёт тип MIME для вывода и по желанию можно задать кодировку знаков в ответе (HTML ответе). По умолчанию в качестве значения MIME используется text/html. Для наглядности можем использовать следующий пример: -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- подключаем функционал библиотек jstl -->

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div class="main">
    <div class="shapka"><p>SHAPKA</p>
        <div>
            <p>Алентьев Александр Георгиевич</p>
            <p>Р3232</p>
            <p id="variant">Вариант: <a class="link" href="https://se.ifmo.ru/ru/courses/web" target="_blank">12938</a></p>
        </div>
    </div>

    <div class="image">
        <canvas class="canvas" width="500" height="500" id="canvas"
                onmousemove = "MouseXY.value = event.clientX+':'+event.clientY "
                onclick = " let Ypass = false;
                            let Xpass = false;
                            if ((((event.clientX - 720)/40) <= 4) && (((event.clientX - 720)/40) >= -4)){
                                X.value = ((event.clientX - 720)/40);
                                Xpass = true;
                            } else alert('X вышел за пределы допустимых значений');
                            if (((505 - event.clientY )/40 >= -5) && ((505 - event.clientY )/40 <= 3)){
                                cordY.value = (505 - event.clientY )/40;
                                Ypass = true;
                            } else alert('Y вышел за пределы допустимых значений');

                            if (Xpass && Ypass){
                            if (R.value>0){
                                submint.click();
                            }
                            else alert('Вы не выбрали R');
                                }">
        </canvas>

    </div>

    <div class="inputvalue">
        <form method="post" action="ControllerServlet" name="my" id="mainform">
            <div class="zagolovok1">
                <p>INPUTVALUE</p>
            </div>

            <div class="inputinpvalue">

                    <p>X</p>
                <span class = "checkboxV"><input type="checkbox" name="coordinate_X" value="-4" onclick=" X.value = -4 "  >-4</span>
                <span class = "checkboxV"><input type="checkbox" name="coordinate_X" value="-3" onclick=" X.value = -3 ">-3</span>
                <span class = "checkboxV"><input type="checkbox" name="coordinate_X" value="-2" onclick=" X.value = -2 ">-2</span>
                <span class = "checkboxV"><input type="checkbox" name="coordinate_X" value="-1" onclick=" X.value = -1 ">-1</span>
                <span class = "checkboxV"><input type="checkbox" name="coordinate_X" value="0" onclick=" X.value = 0 ">0</span>
                <span class = "checkboxV"><input type="checkbox" name="coordinate_X" value="1" onclick=" X.value = 1 ">1</span>
                <span class = "checkboxV"> <input type="checkbox" name="coordinate_X" value="2" onclick=" X.value = 2 ">2</span>
                <span class = "checkboxV"><input type="checkbox" name="coordinate_X" value="3" onclick=" X.value = 3 ">3</span>
                <span class = "checkboxV"><input type="checkbox" name="coordinate_X" value="4" onclick=" X.value = 4 ">4</span>
                    <input type="hidden" id="X" name="coor_X">

                <div class="tablevalue">
                    <div>
                    <p>Y</p>
                    <p>Введите число от -5 до 3</p>
                    <input class="inputtable" id="cordY" tabindex="1" name="coordinata_Y" type="text" ></div>
                </div>

                <div class="tablevalue" >
                    <p>R</p>
                    <input class="inputbutton" id="mybutton_1" type="button" name="coordinata_R" value="1" onclick=" R.value = 1 ">
                    <input class="inputbutton" id="mybutton_2" type="button" name="coordinata_R" value="2" onclick=" R.value = 2 ">
                    <input class="inputbutton" id="mybutton_3" type="button" name="coordinata_R" value="3" onclick=" R.value = 3 ">
                    <input class="inputbutton" id="mybutton_4" type="button" name="coordinata_R" value="4" onclick=" R.value = 4 ">
                    <input class="inputbutton" id="mybutton_5" type="button" name="coordinata_R" value="5" onclick=" R.value = 5 ">

                    <input type="hidden" id="R" name="coor_R" value = "0">
                </div>
                <div class="buttonsent"><button id="submint" type="submit">Отправить</button></div>
                <div class="buttonresent"><button id="resent" type="reset">Сбросить</button></div>
            </div>
            <p><input id="MouseXY" name = "MouseXY" type="hidden"></p>
        </form>
    </div>
    <div class="outputvalue">
        <div class="zagolovok2">
            <p>OUTPUTVALUE</p>
        </div>
        <div class="table">
            <table class="table1table" id="table_data">
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>currentttime</th>
                    <th>scripttime</th>
                    <th>Result</th>
                </tr>
                <script src="https://code.jquery.com/jquery-3.5.1.min.js" type=""></script>
                <script src="main.js"></script>
                <c:forEach var="tochks" items="${requestScope.tochka_list}">
                    <tr>
                        <td>${tochks.coordinate_x}</td>
                        <td>${tochks.coordinate_y}</td>
                        <td>${tochks.radius}</td>
                        <td>${tochks.runTime}</td>
                        <td>${tochks.localTime}</td>
                        <td>${tochks.result}</td>
                    </tr>
                </c:forEach>
            </table>
        </div>
    </div>
</div>

</body>
</html>