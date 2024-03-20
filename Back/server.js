const fastify = require("fastify")({
    logger: true
});

const cron = require("node-cron");
const cors = require("@fastify/cors");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const multipart = require('@fastify/multipart');
const nodemailer = require('nodemailer');

fastify.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
        setTimeout(handleDisconnect, 1000);
    } else {    
        console.log('connected to database');
    }
})

db.on('error', (err) => {
    console.log(err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
    } else {
        console.log.error(err);
    }
})

function handleDisconnect(){
    db.connect((err) => {
        if(err){
            console.log(err);
            setTimeout(handleDisconnect, 2000);
        }else{
            console.log('connected to database again');
        }
    })
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'izzyahnaf695@gmail.com',
        pass: 'rhjb qlto uxsp cjut'
    }
});


cron.schedule('0 0 * * *', () => {
    try {
        const sql = "SELECT nis FROM siswa";
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            const tanggal = new Date().toISOString().slice(0, 19).replace('T', ' ');

            result.forEach(({ nis }) => {
                const insertQuery = "INSERT INTO absensisiswa (nis, tanggal) VALUES (?, ?)";
                db.query(insertQuery, [nis, tanggal], (error, result) => {
                    if (error) {
                        console.error(`Error while inserting data for NIS ${nis}:`, error);
                    } else {
                        console.log(`Data inserted for NIS ${nis} at ${tanggal}`);
                    }
                });
            });
        });
    } catch (err) {
        console.log(err);
    }
});

// Auth
fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body

    try{
        const ExistAdmin = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], (err, result) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        })

        const ExistSiswa = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM siswa WHERE email = ? AND password = ?', [email, password], (err, result) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        })

        const ExistGuru = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM guru WHERE email = ? AND password = ?', [email, password], (err, result) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        })

        if(ExistAdmin.length > 0){
            const token = jwt.sign({ email, role: 'admin' }, 'secret', { expiresIn: '30d' });
            return reply.status(200).send({ token });
        }
        else if(ExistSiswa.length > 0){
            const token = jwt.sign({ email, role: 'siswa' }, 'secret', { expiresIn: '30d' });
            return reply.status(200).send({ token });
        }
        else if(ExistGuru.length > 0){
            const token = jwt.sign({ email, role: 'guru' }, 'secret', { expiresIn: '30d' });
            return reply.status(200).send({ token });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/register', async (request, reply) => {
    const { nik, nis, name, email, password } = request.body

    try{ 
        const dataExist = await new Promise((resolve, reject) => {
            db.query('SELECT nik, nis, email FROM siswa WHERE email = ? OR nik = ? OR nis = ?', [email, nik, nis], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(dataExist.length > 0){
            if(nik == dataExist[0].nik){
                return reply.status(401).send({ message: 'NIK sudah terdaftar' });
            }else if(nis == dataExist[0].nis){
                return reply.status(401).send({ message: 'NIS sudah terdaftar' });
            }else if(email === dataExist[0].email){
                return reply.status(401).send({ message: 'Email sudah terdaftar' });
            }
        }else{
            const Exist = await new Promise((resolve, reject) => {
                db.query('INSERT INTO siswa (nik, nis, nama, email, password) VALUES (?, ?, ?, ?, ?)', [nik, nis, name, email, password], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
            if(Exist.affectedRows > 0){
                return reply.status(200).send({ message: 'Success' });
            }
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

// Siswa
fastify.get('/siswa', async (request, reply) => {
    const token  = request.headers.authorization;

    const decoded = jwt.verify(token, 'secret');

    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM siswa WHERE email = ?', [decoded.email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(Exist.length > 0){
            return reply.status(200).send(Exist);
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/absensiswa', async (request, reply) => {
    const token  = request.headers.authorization;

    const decoded = jwt.verify(token, 'secret');

    try{
        const nis = await new Promise((resolve, reject) => {
            db.query('SELECT nis FROM siswa WHERE email = ?', [decoded.email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(nis.length > 0){
            const Exist = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM absensisiswa WHERE nis = ?', [nis[0].nis], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })

            if(Exist.length > 0){
                return reply.status(200).send(Exist);
            }
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/absenmasuksiswa', async (request, reply) => {
    const { nis, id, time } = request.body

    try{
        const insert = await new Promise((resolve, reject) => {
            db.query('UPDATE absensisiswa SET absen_masuk = ? WHERE nis = ? AND id = ?', [time, nis, id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(insert.affectedRows > 0){
            return reply.status(200).send({ message: 'Success' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/absenkeluarsiswa', async (request, reply) => {
    const { nis, id, time } = request.body;

    try {
        const insert = await new Promise((resolve, reject) => {
            db.query(
                'UPDATE absensisiswa SET absen_keluar = ? WHERE nis = ? AND id = ?',
                [time, nis, id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        if (insert.affectedRows > 0) {
            return reply.status(200).send({ message: 'Success' });
        }
    } catch (err) {
        return reply.status(500).send({ message: err.message });
    }
});

// Guru


// Admin


const start = async () => {
    try {
      await fastify.listen({
        port: 5000,
        host: '127.0.0.1'
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  start();