const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
const app = express();
app.use(express.static("public"));
var task=["Buy food","cook food","Eat food"];
var worktask=[];
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{useNewUrlParser:true});
const itemSchema={
    name:String
};
const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"Welcome to your todolist"
});
const item2=new Item({
    name:"Hit the + button to add a new item"
});
const item3=new Item({
    name:"<-- Hit this to delete an item"
});
const defaultItems=[item1,item2,item3];


app.get("/", function (req, res) {
  
  
  var today = new Date();
  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  }
  var day=today.toLocaleDateString("en-US",options);
  Item.find(function(err,items){
    if(err){
        console.log(err);
    }else{
      if(items.length==0)
  {
    Item.insertMany(defaultItems,function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Successfully saved all the itemss to itemsDB");
        }
    });
      }
        res.render("list2", { 
          foo: day,
          item:items
       });
      
  }});
 

});
app.get("/work", function (req, res) {
      
  var day="Work items";
    res.render("list2", { 
      foo: day,
      item:worktask
   });
  
  });
app.post("/delete",function(req,res){
    const itemid=req.body.checkbox;
    Item.findByIdAndRemove(itemid,function(err){
      if(!err)
      {
        console.log("Succesfully deleted");
        res.redirect("/");
      }
    })
})
app.post("/",function(req,res){
    if(req.body.list=="Work items")
    {worktask.push(req.body.task);  
    res.redirect("/work");}
    else
    {
        // task.push(req.body.task);
        const item=new Item({
            name:req.body.task
        });
        item.save();
        res.redirect("/");
    }
});
app.listen(3000, function () {
  console.log("Server on port 3000");
});
