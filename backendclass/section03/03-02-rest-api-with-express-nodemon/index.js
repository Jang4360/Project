//const express = require('express') //옛날 방식 ->commonjs
import express from 'express';       //요즘 방식 -> module
const app=express();
app.get('/qql',function(req,res){
    res.send('abcdefd')
})
app.listen(3000)