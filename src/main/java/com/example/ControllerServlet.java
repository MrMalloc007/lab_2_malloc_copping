package com.example;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// сервлет наследуется от класса HttpServlet
public class ControllerServlet extends HttpServlet {

    @Override
    //обрабатываем Post запрос
    //HttpServletRequest инкапсулирует(хранит информацию о запросе) всю информацию о запросе
    //HttpServletResponse позволяет управлять ответом
    protected void doPost(HttpServletRequest request , HttpServletResponse response) throws ServletException, IOException {

        ServletContext servletContext = getServletContext(); // с помощью метода getServletContext() получаем объект ServletContext, который представляет суть запроса.
        RequestDispatcher requestDispatcher = servletContext.getRequestDispatcher("/AreaCheckServlet"); // с помощью метода(getRequestDispatcher), объекта servletContext перенаправляем запрос(адресс указываем в параметр метода getRequestDispatcher)
        requestDispatcher.forward(request,response);// у объекта requestDispatcher вызываем метод forward(перенаправляет запрос на другой ресурс)

    }

    @Override
    // обрабатываем Get запрос
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{

        ServletContext servletContext = getServletContext();
        RequestDispatcher requestDispatcher = servletContext.getRequestDispatcher("/index.jsp");
        requestDispatcher.forward(request,response);

    }
}
