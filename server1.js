const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p> Hello Sooram</p>');
})
    .listen(8080); 
    // 2가지 방법
    //.listen(8080,() =>{
    //  console.log('8080번 포트에서 서버 대기 중입니다.');
    //})

server.on('listening', () =>{
    console.log('8080번 포트에서 서버 대기 중입니다.');
});
server.on('error', (error) =>{
    console.log(error);
});


const server2 = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p> Hello Sooram</p>');
})
    .listen(8081); 