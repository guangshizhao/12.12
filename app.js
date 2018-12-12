const express=require("express");
const http=express();
const dbModle=require("./public/db.js");
const db= new dbModle("liuyan");
const bodyParse=require("body-parser")//解析post发送的数据

http.use(bodyParse.urlencoded({extended:false}))//t解析post发送的数据//不保留扩展名
http.use(express.static("./public"));
http.use(express.static("./css"));

//post接收数据
http.post("/add",(req,res)=>{
    let obj=req.body;
    console.log("11",obj);
    db.count("my", obj,(err,data1)=>{
        console.log(data1);
        if(data1==0){
            obj.time=new Date().getTime()+"";
            obj.statics='white';
            db.insertOne("my",obj,(err,data)=>{
                if(err) throw err;
                res.send({
                    status:"1",
                    statusText:"添加成功"
                });
            })
        }else if(data1>=1){

            res.send({
                status:"-1",
                statusText:"愿望已存在,请重新输入"
            })
        }
    })
})

//渲染页面
http.get("/show",(req,res)=>{
       db.find("my",{
           limit:8
       },(err,data)=>{
           if(err) throw err;
           res.send(data)
       })
})
//删除按钮
http.get("/get",(req,res)=>{
    let obj=req.query;
    db.deleteById("my",obj.id,(err,data)=>{
        if(err) throw err;
        console.log("删除接口",data.result);
        res.send("删除成功")
    })
})

//变色按钮
http.get("/bian",(req,res)=>{
    let obj=req.query;
    console.log(obj);
    db.findById("my",obj.Id,(err,data)=>{
        console.log("wwww",data);
        if(data.statics=="white"){
            db.updateById("my",data._id, {statics:obj.statics},(err,data1)=>{
                console.log(data1);
                if(err) throw  err;
                    res.send({status:"2"})
            })
        }else{
            res.send({
                status:"-2"
            })
        }
    })
})

http.listen(8080,()=>{
    console.log("妮可");
})