const express = require('express');
const path = require('path')
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

//전역변수 같은 역활을 함
app.set('port', process.env.PORT || 3000);

//localhost:3000/zerocho.png 요청
app.use(morgan('combined')); // 1. 요청이 먼저 찍힘
//app.use('요청 경로', express.static('실제 경로')); // 보안 2. 
app.use(cookieParser('zerochopassword'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'zerochopassword',
    cookie:{
        httpOnly: true,
    },
    name: 'connect.sid' //읽을수 없는 문자로 되어있음
}))


const multer = require('multer');
const fs = require('fs');

try{
    fs.readdirSync('uploads');
}catch(error){
    console.log('uploads 폴더가 없어 upload폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
            destination(req, file, done){
                done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});

app.get('/upload', (req,res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

//app.use(upload.single('image')); 특정 라우터에서만 일어나는 경우에는 미들웨어를 굳이 안써도 된다.
// 이미지 한개만 저장할때
app.post('/upload', upload.single('image'),(req,res )=> {
    console.log(req.file);
    res.send('ok');
});

// 이미지 여러개 저장할때
app.post('/upload', upload.array('image'),(req,res )=> {
    console.log(req.file);
    res.send('ok');
});

app.post('/upload', upload.fields([{name: "image1", limits: 5}, {name: "image2"}, {name: "image3"}]),(req,res )=> {
    console.log(req.files.image1);
    console.log(req.files.image2);
    console.log(req.files.image3);
    res.send('ok');
});

app.post('/upload', upload.none(),(req,res )=> {
    res.send('ok');
});

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
