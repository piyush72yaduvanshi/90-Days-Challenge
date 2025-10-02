// const http = require("http");

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("Hello Chai aur Code");
//   }else if (req.url === '/ice-tea') {
//      res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("Thanks for ordering tea");
//   }else{
//     res.statusCode = 404
//     res.setHeader('Content-Type','text/plain')
//     res.end('404 not found')
//   }
// });

// server.listen(port, hostname, () => {
//   console.log(`Server is running on http://${hostname}:${port}`);
// });
  

const http = require("http");
const port=3000;
const hostname="127.0.0.1";

const serve = http.createServer((req,res)=>{
  if(req.url==="/"){
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    res.end("Hello Ice-Tea");
  }else if(req.url==="/ice-tea"){
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    res.end("Thanks for ordering Ice-Tea");
  }else{
    res.statusCode=404;
    res.setHeader("Content-Type","text/plain");
    res.end("404 not found");
  }
})

serve.listen(port,hostname,()=>{
  console.log(`Server is running on http://${hostname}:${port}`);
})

