const express = require('express');
const path = require('path')

const app = express();

//전역변수 같은 역활을 함
app.set('port', process.env.PORT || 3000);

app.use('/about', (req,res, next) => {
    console.log('모든 요청에 실행하고 싶어요 ')
    next();
},(req,res, next) => {
    console.log('모든 요청에 실행하고 싶어요2 ')
    next();
},(req,res, next) => {
    console.log('모든 요청에 실행하고 싶어요3 ')
    next();
});

app.get('/', (req,res,next) => {
    res.json({hello: 'sooram'});
    if(false){
        next('route');
    }else{
        next()
    }
}, (req, res)=> {
    console.log('if문이 false일때 이리로 옴');
});

app.get('/', (req,res) => {
    console.log('next(route)일때 이리로 옴');
})

app.use((req, res, next) => {
    res.status(404).send('404에러 미들웨어');
})

//에러 미들웨어는 err도 있어야 하고, next도 있어야 함
app.use((err, req,res,next) => {
    console.error(err);
    res.send('에러 화면 커스터마이징');
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});
