const fastify = require("fastify")({
    logger: true
});

const cors = require("@fastify/cors");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const multipart = require('@fastify/multipart');
const nodemailer = require('nodemailer');

fastify.register(cors, {
    origin: 'http://localhost:5173',
    credentials: true
});
fastify.register(multipart);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'siskoolbe'
})

db.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {    
        
    }
})


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'izzyahnaf695@gmail.com',
        pass: 'rhjb qlto uxsp cjut'
    }
});

fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body

    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM siswa WHERE email = ? AND password = ?', [email, password], (err, result) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        })
        if(Exist.length > 0){
            const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });
            return reply.status(200).send({ token });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/register', async (request, reply) => {
    const { nik, name, email, password } = request.body

    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('INSERT INTO siswa (nik, name, email, password) VALUES (?, ?, ?, ?)', [nik, name, email, password], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(Exist.affectedRows > 0){
            return reply.status(200).send({ message: 'Register Success' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/forgotpassword', async (request, reply) => {
    const { email } = request.body
    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM siswa WHERE email = ?', [email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(Exist.length > 0){
            const mailoptions = {
                from : 'izzyahnaf695@gmail',
                to : email,
                subject : 'SMKN 1 Depok',
                text: `Formulir Password Baru`,
                html: `<a href="http://localhost:5173/Siskoolbe/resetpassword">Reset Password</a>`
            };
            await transporter.sendMail(mailoptions);
            return reply.status(200).send({ message: 'Email Sent' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/resetpassword', async (request, reply) => {
    const { email, password } = request.body
    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('UPDATE siswa SET password = ? WHERE email = ?', [password, email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(Exist.affectedRows > 0){
            return reply.status(200).send({ message: 'Password Changed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

const start = async () => {
    try {
      await fastify.listen({ port: 5000 , host: '127.0.0.1' });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  start();