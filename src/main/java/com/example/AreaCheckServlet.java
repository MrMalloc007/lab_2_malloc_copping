package com.example;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String x = request.getParameter("coor_X").replace(",","."); // вызываем метод getParametr у объекта request,в параметре метода имя инпута
        String y = request.getParameter("coordinata_Y").replace(",",".");
        String r = request.getParameter("coor_R").replace(",",".");



        String valid = main_validate(x,y,r);

        if (valid.equals("okey")) {

            double new_x = Double.parseDouble(x);// парсим значения в дабл
            double new_y = Double.parseDouble(y);
            double new_r = Double.parseDouble(r);

            long time = System.nanoTime();

            String result = check_oblast(new_x, new_y, new_r);

            ServletContext context = getServletContext();

            ArrayList historyList;

            Tochks vistrel = new Tochks(new_x, new_y, new_r, String.valueOf((System.nanoTime() - time) / 1000) + " mcs", String.valueOf(LocalTime.now()), result);

            if (context.getAttribute("tochka_list") == null) {
                historyList = new ArrayList();
            } else {
                historyList = (ArrayList) context.getAttribute("tochka_list");
            }

            historyList.add(vistrel);

            context.setAttribute("tochka_list", historyList);
            request.setAttribute("tochka_list", historyList);
            context.getRequestDispatcher("/index.jsp").forward(request, response);

      } else {
           request.getSession().setAttribute("serverInfo", valid);
            getServletContext().getRequestDispatcher("/index.jsp").forward(request,response);
        }
    }


    public String main_validate(String x, String y, String r){
        if (!validate_for_X(x)){
            return "Вы ввели некорректное значение";
        }else if (!validate_for_Y(y)){
            return "Вы ввели некорректное значение";
        }else if (!validate_for_R(r)){
            return "Вы ввели некорректное значение";
        }else {
            return "okey";
        }
    }

    public boolean validate_for_X(String x){ // валидация для x
        try {
            double doub_x = Double.parseDouble(x);
            return (doub_x >= -4) && (doub_x <= 4);
        }catch (NumberFormatException e){
            return false;
        }
    }

    public boolean validate_for_Y(String y){// валидация для y
        try {
            double doub_y = Double.parseDouble(y);
            return !(doub_y > 3) && !(doub_y < -5);
        }catch (NumberFormatException e){
            return false;
        }
    }

    public boolean validate_for_R(String r){//валидация для r
        try {
            Double[] array_of_x_value = {1.0,2.0,3.0,4.0,5.0}; // массив для сравнения
            double rARR = Double.parseDouble(r); // парсим в добл
            return Arrays.asList(array_of_x_value).contains(rARR);// asList фигачит листок(объект java.util.Arrays) из массива, а contains вернет true, если список содержит нужный элемент
        }catch (NumberFormatException e){ // ошибка парса(например если будет null)
            return false;
        }
    }

    public String first_oblast(double x, double y, double r){ // чек попадания в первой области
        if (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2)) return "Балдеж";
        return "Не балдеж";
    }

    public String second_oblast(double x, double y, double r){// чек попадания во второй области
        if (x <= 0 && y >= 0 && y <= x + (r/2)) {
            return "Балдеж";
        }else{
            return "Не балдеж";
        }
    }

    public String third_oblast(double x, double y, double r){// чек попадания в третьей области
        if (x >= -r && y >= -r/2){
            return "Балдеж";
        }else{
            return "Не балдеж";
        }
    }

    public String oblast_osi(double x, double y, double r){// чек попадания на осях
        if (x == 0){
            if (y <= r && y >= (-r/2)){
                return "Балдеж";
            }else {
                return "Не балдеж";
            }
        }else{
            if (Math.abs(x) <= r){
                return "Балдеж";
            }else{
                return "Не балдеж";
            }
        }
    }

    public String check_oblast(double x, double y, double r){// определение области
        if (x > 0 && y > 0 ){
            return first_oblast(x, y, r);
        }else if (x < 0 && y > 0){
            return second_oblast(x, y, r);
        }else if (x < 0 && y < 0){
            return third_oblast(x, y, r);
        }else if (x > 0 && y < 0){
            return "Не балдеж";
        }else {
            return oblast_osi(x, y, r);
        }
    }
}
