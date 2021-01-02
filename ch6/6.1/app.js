const express = require('express');
const path = require('path')

const app = express();

//전역변수 같은 역활을 함
app.set('port', process.env.PORT || 3000);

app.get('/', (req,res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname,'./index.html'));
})

// app.get('/', (req,res) => {
//     res.send('hello express');
// })

app.post('/', (req, res) => {
    res.send('hello express');
})

app.get('/about', (req, res) => {
    res.send('hello express');
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});
