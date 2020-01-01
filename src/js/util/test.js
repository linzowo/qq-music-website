// import MyVue from './myvue.js';
const MyVue = require("./myvue.js");
const vue = new MyVue({
    el:"#app",
    data:{
        name:"lin",
        age:25,
        sex:"man"
    }
});

console.log(vue.data.name);
vue.data.name = "li";
console.log(vue.data.name);
