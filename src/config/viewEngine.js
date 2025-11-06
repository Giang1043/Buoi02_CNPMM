import express from "express"; //cú pháp khác tương đương: var express = require('express');

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); //thiết lập thư mục chứa images, css,..
    app.set("view engine", "ejs"); //thiết lập viewengine
    app.set("views", "./src/views"); //chỉ mục chứa views
}

module.exports = configViewEngine; //xuất nam ra