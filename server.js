const http=require('http')
const fs=require('fs')
const ulrLib=require("url")
const paht=require("path")
const server=http.createServer((req,res)=>{
    console.log(req);
    const {header,url,method}=req;
    res.setHeader('content-type','text/html')

    if(url==='/'){
      fs.readFile('./src/index.html','utf8',(error,data)=>{
        if(error){
            res.statusCode=500
            res.write('<h1>Error !</h1>')
            res.end()
        }
        else{
            res.statusCode=200
            res.write(data)
            res.end()
        }
      })
        // res.end()
    }
    else if(url==='/login'){
        fs.readFile('./src/login.html','utf8',(error,data)=>{
            
                res.statusCode=200
                res.write(data)
                res.end()
            
        })

    }
    else if(url==='/logincheck' && method==="POST"){
        const  body=[]
     req.on('data',(chunk)=>{
        body.push(chunk)
     
      });

      req.on('end',()=>{
        const parsedBody=Buffer.concat(body).toString();
        const password=parsedBody.split("=")[2];
        console.log(password);
        if(password==="saraa55"){
        res.statusCode=302
        res.setHeader('Location','/home')
        }else{
            res.statusCode=302
            res.setHeader('Location','/error')
        }
        res.end()
        }
    
      )
    }
    else if(url==="/home"){
        fs.readFile('./src/home.html','utf8',(error,data)=>{
            if(error){
                res.statusCode=500
                res.write('<h1>Error !</h1>')
                res.end()
            }
            else{
                res.statusCode=200
                res.write(data)
                res.end()
            }
        })
    }
    else if(url==="/error"){
        fs.readFile('./src/error.html','utf8',(error,data)=>{
            if(error){
                res.statusCode=500
                res.write('<h1>Error !</h1>')
                res.end()
            }
            else{
                res.statusCode=200
                res.write(data)
                res.end()
            }
        })
    }
    else if(url.endsWith('.jpg'|| url.endsWith('.png'))){
        const parse=ulrLib.parse(url)
        const filename=paht.basename(parse.pathname)

        fs.readFile('./src/img/'+filename,(error,data)=>{
                res.statusCode=200
                res.setHeader("content-type","image/jpg")
                res.end(data)
        })
    }
    else {
        res.statusCode=404;
        res.write('<h1> 404 not found <h1/>')
console.log(url);
        res.end()
    }

   
})


server.listen(5000,()=>{
    console.log('http server started port 5000');
})