const fastify = require("fastify")({
    logger: true,
    bodyLimit: 52428800,
    filePayload: 52428800  
});

const cron = require("node-cron");
const cors = require("@fastify/cors");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const multipart = require('@fastify/multipart');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const pipeline = require('stream/promises').pipeline;

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
        const sql2 = "SELECT id FROM guru";

        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const day = String(today.getDate()).padStart(2, '0'); 

            const tanggal = `${year}-${month}-${day}`;

            result.forEach(({ nis }) => {
                const checkQuery = "UPDATE absensisiswa SET status = 'closed' WHERE nis = ? AND status = 'open'";
                db.query(checkQuery, [nis], (error, result) => {
                    if(error){
                        console.error(error);
                    }else{
                        console.log(`Data updated for NIS ${nis} at ${tanggal}`);
                    }
                })
                const insertQuery = "INSERT INTO absensisiswa (nis, tanggal, status) VALUES (?, ?, ?)";
                db.query(insertQuery, [nis, tanggal, 'open'], (error, result) => {
                    if (error) {
                        console.error(`Error while inserting data for NIS ${nis}:`, error);
                    } else {
                        console.log(`Data inserted for NIS ${nis} at ${tanggal}`);
                    }
                });
            });
        });

        db.query(sql2, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const day = String(today.getDate()).padStart(2, '0'); 

            const tanggal = `${year}-${month}-${day}`;

            result.forEach(({ id }) => {
                const checkQuery = "UPDATE absensiguru SET status = 'closed' WHERE idguru = ? AND status = 'open'";
                db.query(checkQuery, [id], (error, result) => {
                    if(error){
                        console.error(error);
                    }else{
                        console.log(`Data updated for ID ${id} at ${tanggal}`);
                    }
                })
                const insertQuery = "INSERT INTO absensiguru (idguru, tanggal, status) VALUES (?, ?, ?)";
                db.query(insertQuery, [id, tanggal, 'open'], (error, result) => {
                    if (error) {
                        console.error(`Error while inserting data for ID ${id}:`, error);
                    } else {
                        console.log(`Data inserted for ID ${id} at ${tanggal}`);
                    }
                });
            })
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
        }else{
            return reply.status(401).send({ message: 'Invalid email or password' });
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
        const kelas = await new Promise((resolve, reject) => {
            db.query('SELECT kelas FROM kelas WHERE id = ?', [Exist[0].idkelas], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(Exist.length > 0){
            const data = await Promise.all(Exist.map(async (item) => {
                try{
                    const imagePath = './Gambar/Siswa/Profil/' + item.gambar_profil;
                    const Image = fs.readFileSync(imagePath, 'base64');
                    return {
                        ...item,
                        gambar_profil: Image,
                        nama_gambar: item.gambar_profil,
                        kelas: kelas[0].kelas
                    }                    
                }catch(err){
                    return {
                        ...item,
                        gambar_profil: null,
                        kelas: kelas[0].kelas
                    }
                }
            }))
            return reply.status(200).send(data);
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
                db.query('SELECT * FROM absensisiswa WHERE nis = ? ORDER BY tanggal DESC', [nis[0].nis], (err, result) => {
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

fastify.get('/absenChecker/:id', async (request, reply) => {
    const token  = request.headers.authorization;
    const id = request.params.id

    if(!token){
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM absensisiswa WHERE id = ? AND status = ?', [id, 'open'], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(Exist.length > 0){
            return reply.status(200).send({ message: 'Success' });
        }else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/absenmasuksiswa', async (request, reply) => {
    const { nis, id, time } = request.body

    try{
        const insert = await new Promise((resolve, reject) => {
            db.query('UPDATE absensisiswa SET absen_masuk = ? WHERE nis = ? AND id = ? AND status = open', [time, nis, id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(insert.affectedRows > 0){
            return reply.status(200).send({ message: 'Success' });
        }else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/absenkeluarsiswa', async (request, reply) => {
    const { nis, id, time } = request.body;
    const status = 'closed';
    try {
        const insert = await new Promise((resolve, reject) => {
            db.query(
                'UPDATE absensisiswa SET absen_keluar = ?, status = ? WHERE nis = ? AND id = ? AND status = ?',
                [time, status, nis, id, 'open'],
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
        }else{
            return reply.status(401).send({ message: 'Failed' });
        }
    } catch (err) {
        return reply.status(500).send({ message: err.message });
    }
});

fastify.post('/editsiswaProfileImage/:email', async (request, reply) => {
    const file = await request.file();
    const email = request.params.email;

    try{
        if(!file){
            return reply.status(401).send({ message: 'No file uploaded' });
        }

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Siswa/Profil/');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const getImage = await new Promise((resolve, reject) => {
            db.query('SELECT gambar_profil FROM siswa WHERE email = ?', [email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(getImage.length > 0){
            fs.unlinkSync(path.join(__dirname, 'Gambar/Siswa/Profil/', getImage[0].gambar_profil));
            const update = await new Promise((resolve, reject) => {
                db.query('UPDATE siswa SET gambar_profil = ? WHERE email = ?', [`${timestamp}-${file.filename}`, email], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
            if(update.affectedRows > 0){
                await pipeline(file.file, fs.createWriteStream(filepath));
                return reply.status(200).send({ message: 'Success' });
            }
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/editsiswaProfile/:email', async (request, reply) => {
    const {nama, email, alamat, no_hp} = request.body;

    try{
        const update = await new Promise((resolve, reject) => {
           db.query('UPDATE siswa SET ? WHERE email = ?', [{nama, alamat, no_hp}, email], (err, result) => {
               if(err){
                   reject(err);
               }else{
                   resolve(result);
               }
           })
        })
        if(update.affectedRows > 0){
            return reply.status(200).send({ message: 'Success' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/CheckIzinSiswa', async (request, reply) => {
    const token  = request.headers.authorization;
    if (!token) {
        return reply.status(401).send({ message: "Token not provided" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, 'secret');

        const checkAbsensi = await new Promise((resolve, reject) => {
            db.query('SELECT id FROM `absensisiswa` WHERE status = "open" ORDER BY `tanggal` DESC LIMIT 1', (err, result) => {
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        
        if(checkAbsensi.length > 0){
            return reply.status(200).send({message: 'true'});
        }else{
            return reply.status(401).send({message: 'false'});
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/IzinSiswa', async (request, reply) => {
    const token  = request.headers.authorization;
    const data = request.headers.data;
    const {izinType, alasan} = JSON.parse(data);
    const file = await request.file();

    if (!token) {
        return reply.status(401).send({ message: "Token not provided" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, 'secret');

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Siswa/Izin/');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        const SelectidAbsensi = await new Promise((resolve, reject) => {
            db.query('SELECT id FROM `absensisiswa` ORDER BY `tanggal` DESC LIMIT 1',(err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        const idAbsen = SelectidAbsensi[0].id;

        const IzinUpdate = await new Promise((resolve, reject) => {
            db.query('UPDATE absensisiswa SET izin = ?, detail_izin = ?, foto_izin_absensi = ?, status = ? WHERE id = ?', [`${izinType}`, `${alasan}`, `${timestamp}-${file.filename}`, `closed`, idAbsen], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(IzinUpdate.affectedRows > 0){
            await pipeline(file.file, fs.createWriteStream(filepath));
            return reply.status(200).send({ message: 'Success' });
        }else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err) {
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/DetailIzinSiswa/:id', async (request, reply) => {
    const id  = request.params.id;
    const token  = request.headers.authorization;

    if (!token) {
        return reply.status(401).send({ message: "Token not provided" });
    }

    try{
        const exist = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM absensisiswa WHERE id = ?', [id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(exist[0].izin === 'keterangan' || exist[0].izin === 'sakit'){
            const data  = await Promise.all(exist.map(async (item) => {
                const imagePath = path.join(__dirname, 'Gambar/Siswa/Izin', item.foto_izin_absensi);
                const base64 = fs.readFileSync(imagePath, { encoding: 'base64' });
                return { ...item, bukti: base64 };
            }))
            return reply.status(200).send(data);
        }else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

// Guru
fastify.get('/guru', async (request, reply) => {
    try{
        const token  = request.headers.authorization;
        if(!token){
            return reply.status(401).send({ message: "Token not provided" });
        }

        let decoded;

        try{
            decoded = jwt.verify(token, 'secret');
        }catch(err){
            return reply.status(401).send({ message: "Invalid token" });
        }

        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM guru WHERE email = ?', [decoded.email], (err, result) => {
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if(Exist.length > 0){
            const data = await Promise.all(Exist.map(async (item) => {
                try{
                    const imagePath = './Gambar/Guru/Profil/' + item.gambar_profil;
                    const base64 = fs.readFileSync(imagePath, { encoding: 'base64' });
                    return { 
                        ...item, 
                        gambar_profil: base64,
                        nama_gambar: item.gambar_profil
                    };
                }catch(err){
                    return { ...item, gambar_profil: null };
                }
            }))
            return reply.status(200).send(data);
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/absenguru', async (request, reply) => {
    const token  = request.headers.authorization;

    if (!token) {
        return reply.status(401).send({ message: "Token not provided" });
    }

    try{
        const decoded = jwt.verify(token, 'secret');

        const id = await new Promise((resolve, reject) => {
            db.query('SELECT id FROM guru WHERE email = ?', [decoded.email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(id.length > 0){
            const Exist = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM absensiguru WHERE idguru = ? ORDER BY tanggal DESC', [id[0].id], (err, result) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            if(Exist.length > 0){
                return reply.status(200).send(Exist);
            }
        }
       
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/absensimasukguru', async (request, reply) => {
    const token  = request.headers.authorization;
    const id  = request.body.id;

    if (!token) {
        return reply.status(401).send({ message: "Token not provided" });
    }

    try{
        const decoded = jwt.verify(token, 'secret');

        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
        
        const idguru = await new Promise((resolve, reject) => {
            db.query('SELECT id FROM guru WHERE email = ?', [decoded.email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })    
        })

        
        if(idguru.length > 0){
            const Exist = await new Promise((resolve, reject) => {
                db.query('UPDATE absensiguru SET absen_masuk = ? WHERE id = ? AND idguru = ?', [time, id, idguru[0].id], (err, result) => {
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

fastify.post('/absensikeluarguru', async (request, reply) => {
    const token  = request.headers.authorization;
    const id  = request.body.id;

    if (!token) {
        return reply.status(401).send({ message: "Token not provided" });
    }

    try{
        const decoded = jwt.verify(token, 'secret');

        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const idguru = await new Promise((resolve, reject) => {
            db.query('SELECT id FROM guru WHERE email = ?', [decoded.email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })    
        })

        if(idguru.length > 0){
            const Exist = await new Promise((resolve, reject) => {
                db.query('UPDATE absensiguru SET absen_keluar = ?, status = ? WHERE id = ? AND idguru = ?', [time, 'closed', id, idguru[0].id], (err, result) => {
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

fastify.get('/absensimasukCheckerGuru/:id', async (request, reply) => {
    const id  = request.params.id;
    const token  = request.headers.authorization;

    if (!token) {
        return reply.status(401).send({ message: "Token not provided" });
    }
    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT absen_masuk FROM absensiguru WHERE id = ?', [id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(Exist.length > 0){
            if(Exist[0].absen_masuk){
                return reply.status(200).send({ message: Exist[0].absen_masuk });
            }else{
                return reply.status(404).send({ message: 'not found' });
            }
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/absensikeluarCheckerGuru/:id', async (request, reply) => {
    const id  = request.params.id;
    const token  = request.headers.authorization;

    if (!token) {
        return reply.status(401).send({ message: "Token not provided" });
    }
    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT absen_keluar FROM absensiguru WHERE id = ?', [id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(Exist.length > 0){
            if(Exist[0].absen_keluar){
                return reply.status(200).send({ message: Exist[0].absen_keluar });
            }else{
                return reply.status(404).send({ message: err });
            }
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/absensiCheckerGuru/:id', async (request, reply) => {
    const id  = request.params.id;
    const token  = request.headers.authorization;

    if (!token) {
        return reply.status(401).send({ message: "Token not provided" });
    }

    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT status FROM absensiguru WHERE id = ? AND status = ?', [id, 'open'], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(Exist.length > 0){
            return reply.status(200).send({ message: Exist[0].status });
        }else{
            return reply.status(404).send({ message: 'Not found' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/editguruProfile/:email', async (request, reply) => {
    const email  = request.params.email;
    const { nama, alamat, no_hp } = request.body;

    try{
        const update = await new Promise((resolve, reject) => {
            db.query('UPDATE guru SET nama = ?, alamat = ?, no_hp = ? WHERE email = ?', [nama, alamat, no_hp, email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(update.affectedRows > 0){
            return reply.status(200).send({ message: 'Success' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/editguruProfileImage/:email', async (request, reply) => {
    const email  = request.params.email;
    const file = await request.file();

    try{
        if(!file){
            return reply.status(401).send({ message: 'File not found' });
        }

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Guru/Profil/');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const getImage = await new Promise((resolve, reject) => {
            db.query('SELECT gambar_profil FROM guru WHERE email = ?', [email], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(getImage.length > 0){
            fs.unlinkSync(path.join(__dirname, `./Gambar/Guru/Profil/${getImage[0].gambar_profil}`));
            const update = await new Promise((resolve, reject) => {
                db.query('UPDATE guru SET gambar_profil = ? WHERE email = ?', [filepath, email], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })

            if(update.affectedRows > 0){
                fs.renameSync(file.filepath, filepath);
                return reply.status(200).send({ message: 'Success' });
            }
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/CheckIzinGuru', async (request, reply) => {
    const token  = request.headers.authorization;
    if(!token){
        return reply.status(401).send({ message: 'Token not found' });
    }

    let decoded;
    try{
        const decoded = jwt.verify(token, 'secret');
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT id FROM `absensiguru` WHERE status = "open" ORDER BY `tanggal` DESC LIMIT 1', (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(Exist.length > 0){
            return reply.status(200).send({ message: Exist });
        }else{
            return reply.status(404).send({ message: 'Not found' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/IzinGuru', async (request, reply) => {
    const token = request.headers.authorization;
    const data = request.headers.data;
    const { izinType, alasan } = JSON.parse(data);
    const file = await request.file();

    if(!token){
        return reply.status(401).send({ message: 'Token not found' });
    }

    let decoded;
    try{
        decoded = jwt.verify(token, 'secret');

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Guru/Izin/');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        const SelectidAbsensi = await new Promise((resolve, reject) => {
            db.query('SELECT id FROM `absensiguru` ORDER BY `tanggal` DESC LIMIT 1', (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        const idAbsen = SelectidAbsensi[0].id;

        const IzinUpdate = await new Promise((resolve, reject) => {
            db.query('UPDATE absensiguru SET izin = ?, detail_izin = ?, foto_izin_absensi = ?, status = ? WHERE id = ?', [`${izinType}`, `${alasan}`, `${timestamp}-${file.filename}`, `closed`, idAbsen], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(IzinUpdate.affectedRows > 0){
            await pipeline(file.file, fs.createWriteStream(filepath));
            return reply.status(200).send({ message: 'Success' });
        }else{
            return reply.status(404).send({ message: 'Not found' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/DetailIzinGuru/:id', async (request, reply) => {
    const id = request.params.id;
    const token = request.headers.authorization;

    if(!token){
        return reply.status(401).send({ message: 'Token not found' });
    }
    try{
        const Select = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM absensiguru WHERE id = ?', [id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(Select[0].izin === "keterangan" || Select[0].izin === "sakit"){
            const data = await Promise.all(Select.map(async (item) => {
                const imagePath = path.join(__dirname, 'Gambar/Guru/Izin/', item.foto_izin_absensi);
                const base64 = fs.readFileSync(imagePath, {encoding: 'base64'});
                return { ...item, bukti: base64 };
            }))
            return reply.status(200).send(data);
        }else{
            return reply.status(401).send({ message: 'failed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
    return reply.status(200).send({ message: Select });
})

// Admin
fastify.get('/admin', async (request, reply) => {
    try {
        const token = request.headers.authorization;
        if (!token) {
            return reply.status(401).send({ message: "Token not provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, 'secret');
        } catch(err) {
            return reply.status(401).send({ message: "Invalid token" });
        }

        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM admin WHERE email = ?', [decoded.email], (err, result) => {
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if(Exist.length > 0){
            const data = await Promise.all(Exist.map(async (item) => {
                try {
                    const imagePath = './Gambar/Admin/Profil/' + item.gambar_profil;
                    const image = fs.readFileSync(imagePath, 'base64');
                    return { ...item, gambar_profil: image };       
                } catch(err) {
                    return { ...item, gambar_profil: null };
                }
            }));
            return reply.status(200).send(data);
        } else {
            return reply.status(404).send({ message: "Admin data not found" });
        }
    } catch(err) {
        return reply.status(500).send({ message: err.message });
    }
});


// -data-siswa
fastify.get('/getSiswa_Admin', async (request, reply) => {
    const { offset } = request.query || 0;
    const offsetint = parseInt(offset, 10);
    try{
        const [Exist, ExistLength] = await Promise.all([
            new Promise((resolve, reject) => {
                db.query('SELECT * FROM siswa LIMIT 10 OFFSET ?', [offsetint], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            }),
            new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total FROM siswa', (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        ])

        if(Exist.length > 0){
            const selectidjurusan = await new Promise((resolve, reject) => {
                db.query('SELECT jurusanid, kelas FROM kelas WHERE id = ?', [Exist[0].idkelas],(err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
            if(selectidjurusan.length > 0){
                const selectJurusan =  await new Promise((resolve, reject) => {
                    db.query('SELECT namajurusan, sub_jurusan FROM jurusan WHERE id = ?', [selectidjurusan[0].jurusanid],(err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                })

                const data = await Promise.all(Exist.map(async (item) => {
                    const imagePath = './Gambar/Siswa/Profil/' + item.gambar_profil;
                    const image = fs.readFileSync(imagePath, 'base64');

                    return {
                        ...item,
                        jurusan: selectJurusan[0].namajurusan,
                        sub_jurusan: selectJurusan[0].sub_jurusan,
                        kelas: selectidjurusan[0].kelas,
                        gambar_profil: image,
                    }
                }))

                dataClean = {
                    Length: ExistLength[0].total,
                    data: data
                }

                return reply.status(200).send(dataClean);
            }          
        }
        else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/getSiswa_Admin/:id', async (request, reply) => {
    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM siswa WHERE id = ?', [request.params.id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(Exist.length > 0){
            const selectidjurusan = await new Promise((resolve, reject) => {
                db.query('SELECT jurusanid, kelas FROM kelas WHERE id = ?', [Exist[0].idkelas],(err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
            if(selectidjurusan.length > 0){
                const selectJurusan =  await new Promise((resolve, reject) => {
                    db.query('SELECT namajurusan, sub_jurusan FROM jurusan WHERE id = ?', [selectidjurusan[0].jurusanid],(err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                })

                const data = await Promise.all(Exist.map(async (item) => {
                    const imagePath = './Gambar/Siswa/Profil/' + item.gambar_profil;
                    const image = fs.readFileSync(imagePath, 'base64');

                    return {
                        ...item,
                        jurusan: selectJurusan[0].namajurusan,
                        sub_jurusan: selectJurusan[0].sub_jurusan,
                        kelas: selectidjurusan[0].kelas,
                        bukti: image
                    }
                }))

                return reply.status(200).send(data);
            }          
        }
        else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/getSiswa_Admin/Search', async (request, reply) => {
    const keyword = request.query.keyword;
    try{
        const [Exist, ExistLength]= await Promise.all ([
            new Promise((resolve, reject) => {
                db.query('SELECT * FROM siswa WHERE nama LIKE ? OR nis LIKE ? OR nisn LIKE ?', [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            }),
            new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total FROM siswa WHERE nama LIKE ? OR nis LIKE ? OR nisn LIKE ?', [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        ])

        if(Exist.length > 0){
            const selectidjurusan = await new Promise((resolve, reject) => {
                db.query('SELECT jurusanid, kelas FROM kelas WHERE id = ?', [Exist[0].idkelas],(err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
            if(selectidjurusan.length > 0){
                const selectJurusan =  await new Promise((resolve, reject) => {
                    db.query('SELECT namajurusan, sub_jurusan FROM jurusan WHERE id = ?', [selectidjurusan[0].jurusanid],(err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                })

                const data = await Promise.all(Exist.map(async (item) => {
                    const imagePath = './Gambar/Siswa/Profil/' + item.gambar_profil;
                    const image = fs.readFileSync(imagePath, 'base64');

                    return {
                        ...item,
                        jurusan: selectJurusan[0].namajurusan,
                        sub_jurusan: selectJurusan[0].sub_jurusan,
                        kelas: selectidjurusan[0].kelas,
                        gambar_profil: image
                    }
                }))

                dataClean = {
                    Length: ExistLength[0].total,
                    data: data
                }
                return reply.status(200).send(dataClean);
            }
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/addSiswa_Admin', async (request, reply) => {
    const data = request.headers.data;
    const { nama, nis, nisn, nik, email, Password, alamat, noHp, tempatLahir, tanggalLahir, jenisKelamin, agama, kelas, jurusan, sub_jurusan} = JSON.parse(data);
    const file = await request.file();

    try{
        if(!file){
            return reply.status(401).send({ message: 'There is No File' });
        }

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Siswa/Profil');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        
        const selectJur = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM jurusan WHERE namajurusan = ? AND sub_jurusan = ?', [jurusan, sub_jurusan], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(selectJur.length <= 0){
            return reply.status(401).send({ message: jurusan + ' ' + sub_jurusan + ' Not Found' });
        }else{
            const selectKelas = await new Promise((resolve, reject) => {
                db.query('SELECT id FROM kelas WHERE kelas = ? AND jurusanid = ?', [kelas, selectJur[0].id], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })

            const insert = await new Promise((resolve, reject) => {
                db.query('INSERT INTO siswa (nama, nis, nisn, nik, email, password, idkelas, alamat, no_hp, tempat_lahir, tgl_lahir, jenis_kelamin, agama, gambar_profil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [nama, nis, nisn, nik, email, Password, selectKelas[0].id, alamat, noHp, tempatLahir, tanggalLahir, jenisKelamin, agama, `${timestamp}-${file.filename}`], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
            if(insert.affectedRows > 0){
                await pipeline(file.file, fs.createWriteStream(filepath));
                return reply.status(200).send({ message: 'Success' });
            }else{
                return reply.status(401).send({ message: 'Gagal Insert' });
            }
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }

})

fastify.post('/updateSiswa_Admin/:id', async (request, reply) => {
    const data = request.headers.data;
    const { nama, nis, nisn, nik, email, Password, alamat, noHp, tempatLahir, tanggalLahir, jenisKelamin, agama, kelas, jurusan, sub_jurusan} = JSON.parse(data);
    const file = await request.file();

    try{
        if(!file){
            return reply.status(401).send({ message: 'There is No File' });
        }

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Siswa/Profil');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        
        const selectJur = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM jurusan WHERE namajurusan = ? AND sub_jurusan = ?', [jurusan, sub_jurusan], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
        if(selectJur.length <= 0){
            return reply.status(401).send({ message: jurusan + ' ' + sub_jurusan + ' Not Found' });
        }else{
            const selectKelas = await new Promise((resolve, reject) => {
                db.query('SELECT id FROM kelas WHERE kelas = ? AND jurusanid = ?', [kelas, selectJur[0].id], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })

            const getImage = await new Promise((resolve, reject) => {
                db.query('SELECT gambar_profil FROM siswa WHERE id = ?', [request.params.id], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })

            if(getImage.length > 0){
                const oldPath = path.join(uploadDir, getImage[0].gambar_profil);
                if(fs.existsSync(oldPath)){
                    fs.unlinkSync(oldPath);
                }
            }

            const insert = await new Promise((resolve, reject) => {
                db.query('UPDATE siswa SET nama = ?, nis = ?, nisn = ?, nik = ?, email = ?, password = ?, idkelas = ?, alamat = ?, no_hp = ?, tempat_lahir = ?, tgl_lahir = ?, jenis_kelamin = ?, agama = ?, gambar_profil = ? WHERE id = ?',
                [nama, nis, nisn, nik, email, Password, selectKelas[0].id, alamat, noHp, tempatLahir, tanggalLahir, jenisKelamin, agama, `${timestamp}-${file.filename}`, request.params.id], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
            
            if(insert.affectedRows > 0){
                await pipeline(file.file, fs.createWriteStream(filepath));
                return reply.status(200).send({ message: 'Success' });
            }else{
                return reply.status(401).send({ message: 'Gagal Insert' });
            }
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }

})

fastify.post('/deleteSiswa_Admin/:id', async (request, reply) => {
    try{
        const getImage = await new Promise((resolve, reject) => {
            db.query('SELECT gambar_profil, nis FROM siswa WHERE id = ?', [request.params.id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(getImage.length > 0){
            const oldPath = path.join(__dirname, 'Gambar/Siswa/Profil', getImage[0].gambar_profil);
            if(fs.existsSync(oldPath)){
                fs.unlinkSync(oldPath);
            }

            const deleteAbsen = await new Promise((resolve, reject) => {
                db.query('DELETE FROM absensisiswa WHERE nis = ?', [getImage[0].nis], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })

            const deleteSiswa = await new Promise((resolve, reject) => {
                db.query('DELETE FROM siswa WHERE id = ?', [request.params.id], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })

            if(deleteSiswa.affectedRows > 0){
                return reply.status(200).send({ message: 'Success' });
            }
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

// -data-guru
fastify.get('/getGuru_Admin', async (request, reply) => {
    const { offset } = request.query || 0;
    const offsetint = parseInt(offset, 10);
    try{
        const [Exist, ExistLength] = await Promise.all([
            new Promise((resolve, reject) => {
                db.query('SELECT * FROM guru LIMIT 10 OFFSET ?', [offsetint], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            }),
            new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total FROM guru', (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        ])

        if(Exist.length > 0){
            const data = await Promise.all(Exist.map(async (item) => {
                const ImagePath = `./Gambar/Guru/Profil/${item.gambar_profil}`
                const Image = fs.readFileSync(ImagePath, 'base64');

                return { ...item, gambar_profil: Image }
            }))

            dataClean = {
                Length: ExistLength[0].total,
                Data: data
            }
            return reply.status(200).send(dataClean);
        }
        else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/getGuru_Admin/:id', async (request, reply) => {
    try{
        const Exist = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM guru WHERE id = ?', [request.params.id],(err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(Exist.length > 0){
            const data = await Promise.all(Exist.map(async (item) => {
                const ImagePath = `./Gambar/Guru/Profil/${item.gambar_profil}`
                const Image = fs.readFileSync(ImagePath, 'base64');

                return { ...item, bukti: Image }
            }))
            return reply.status(200).send(data);
        }
        else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.get('/getGuru_Admin/Search', async (request, reply) => {
    const { keyword } = request.query;
    try{
        const [Exist, ExistLength] = await Promise.all([
            new Promise((resolve, reject) => {
                db.query('SELECT * FROM guru WHERE nama LIKE ? OR email LIKE ? OR no_hp LIKE ? OR nik LIKE ?', [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`],(err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            }),
            new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total FROM guru WHERE nama LIKE ? OR email LIKE ? OR no_hp LIKE ? OR nik LIKE ?', [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`], (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        ])

        if(Exist.length > 0){
            const data = await Promise.all(Exist.map(async (item) => {
                const ImagePath = `./Gambar/Guru/Profil/${item.gambar_profil}`
                const Image = fs.readFileSync(ImagePath, 'base64');

                return { ...item, gambar_profil: Image }
            }))

            dataClean = {
                Length: ExistLength[0].total,
                Data: data
            }
            return reply.status(200).send(dataClean);
        }else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err){
        return reply.status(401).send({ message: err.message });
    }
})

fastify.post('/addGuru_Admin', async (request, reply) => {
    const data = request.headers.data;
    const { nik, nama, email, Password, alamat, noHp, tempatLahir, tanggalLahir, agama, jabatan, status, jenisKelamin } = JSON.parse(data);
    const file = await request.file();

    try{
        if(!file){
            return reply.status(401).send({ message: 'File not found' });
        }

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Guru/Profil');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }

        const insert = await new Promise((resolve, reject) => {
            db.query('INSERT INTO guru (nik, nama, email, password, alamat, no_hp, tempat_lahir, tgl_lahir, agama, jabatan, status, jenis_kelamin, gambar_profil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nik, nama, email, Password, alamat, noHp, tempatLahir, tanggalLahir, agama, jabatan, status, jenisKelamin, `${timestamp}-${file.filename}`], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(insert.affectedRows > 0){
            await pipeline(file.file, fs.createWriteStream(filepath));
            return reply.status(200).send({ message: 'Success' });
        }else{
            return reply.status(401).send({ message: 'Gagal Insert' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
});

fastify.post('/updateGuru_Admin/:id', async (request, reply) => {
    const data = request.headers.data;
    const { nik, nama, email, Password, alamat, noHp, tempatLahir, tanggalLahir, agama, jabatan, status, jenisKelamin } = JSON.parse(data);
    const file = await request.file();

    try{
        if(!file){
            return reply.status(401).send({ message: 'File not found' });
        }

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Guru/Profil');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }

        const getImage = await new Promise((resolve, reject) => {
            db.query('SELECT gambar_profil FROM guru WHERE id = ?', [request.params.id],(err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(getImage.length > 0){
            const oldFilePath = path.join(uploadDir, getImage[0].gambar_profil);
            if(fs.existsSync(oldFilePath)){
                fs.unlinkSync(oldFilePath);
            }
        }

        const update = await new Promise((resolve, reject) => {
            db.query('UPDATE guru SET nik = ?, nama = ?, email = ?, password = ?, alamat = ?, no_hp = ?, tempat_lahir = ?, tgl_lahir = ?, agama = ?, jabatan = ?, status = ?, jenis_kelamin = ?, gambar_profil = ? WHERE id = ?',
                [nik, nama, email, Password, alamat, noHp, tempatLahir, tanggalLahir, agama, jabatan, status, jenisKelamin, `${timestamp}-${file.filename}`, request.params.id], 
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
        
        if(update.affectedRows > 0){
            await pipeline(file.file, fs.createWriteStream(filepath));
            return reply.status(200).send({ message: 'Success' });
        }else{
            return reply.status(401).send({ message: 'Gagal update' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
});

fastify.post('/deleteGuru_Admin/:id', async (request, reply) => {
    try{
        const getImage = await new Promise((resolve, reject) => {
            db.query('SELECT gambar_profil FROM guru WHERE id = ?', [request.params.id],(err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(getImage.length > 0){
            const oldFilePath = path.join(__dirname, 'Gambar/Guru/Profil', getImage[0].gambar_profil);
            if(fs.existsSync(oldFilePath)){
                fs.unlinkSync(oldFilePath);
            }
        }

        const deleteGuru = await new Promise((resolve, reject) => {
            db.query('DELETE FROM guru WHERE id = ?', [request.params.id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })

        if(deleteGuru.affectedRows > 0){
            return reply.status(200).send({ message: 'Success' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
});

// -data-jurusan
fastify.get('/getJurusan_Admin', async (request, reply) => {
    try {
        const jurusanData = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM jurusan', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const jurusanWithImages = await Promise.all(jurusanData.map(async (jurusan) => {
            const imagePath = `./Gambar/Admin/Jurusan/${jurusan.gambar}`;
            const image = fs.readFileSync(imagePath, 'base64');

            return {
                ...jurusan,
                image: image
            };
        }));

        if (jurusanWithImages.length > 0) {
            return reply.status(200).send(jurusanWithImages);
        } else {
            return reply.status(401).send({ message: 'Data not found' });
        }
    } catch (err) {
        return reply.status(500).send({ message: err.message });
    }
});

fastify.get('/getJurusan_Admin/:id', async (request, reply) => {
    try {
        const jurusanData = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM jurusan WHERE id = ?', [request.params.id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const jurusanWithImages = await Promise.all(jurusanData.map(async (jurusan) => {
            const imagePath = `./Gambar/Admin/Jurusan/${jurusan.gambar}`;
            const image = fs.readFileSync(imagePath, 'base64');

            return {
                ...jurusan,
                image: image
            };
        }));

        if (jurusanWithImages.length > 0) {
            return reply.status(200).send(jurusanWithImages);
        } else {
            return reply.status(401).send({ message: 'Data not found' });
        }
    } catch (err) {
        return reply.status(500).send({ message: err.message });
    }
});

fastify.get('/getJurusan_Admin/Search', async (request, reply) => {
    const keyword = request.query.keyword;
    try {
        const jurusanData = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM jurusan WHERE namajurusan LIKE ?', [`%${keyword}%`], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const jurusanWithImages = await Promise.all(jurusanData.map(async (jurusan) => {
            const imagePath = `./Gambar/Admin/Jurusan/${jurusan.gambar}`;
            const image = fs.readFileSync(imagePath, 'base64');

            return {
                ...jurusan,
                image: image
            }
        }))

        if (jurusanWithImages.length > 0) {
            return reply.status(200).send(jurusanWithImages);
        }else{
            return reply.status(401).send({ message: 'Data not found' });
        }
    } catch (err) {
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/tambahjurusan', async (request, reply) => {
    const data = request.headers.data;
    const { namaJurusan, urutanJurusan } = JSON.parse(data);
    const file = await request.file();

    try {
       
        if (!file) {
            return reply.status(400).send({ message: 'No image provided' });
        }

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Admin/Jurusan');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const insert = await new Promise((resolve, reject) => {
            db.query('INSERT INTO jurusan (namajurusan, sub_jurusan, gambar) VALUES (?, ?, ?)', [namaJurusan, urutanJurusan, `${timestamp}-${file.filename}`], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (insert.affectedRows > 0) {
            const kelas = ['10', '11', '12'];
            for (let i = 0; i < kelas.length; i++) {
                const promise = new Promise((resolve, reject) => {
                    db.query('INSERT INTO kelas (kelas, jurusanid) VALUES (?, ?)', [kelas[i], insert.insertId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }
            await pipeline(file.file, fs.createWriteStream(filepath));
            return reply.status(200).send({ message: 'Success' });
        } else {
            return reply.status(401).send({ message: 'Failed' });
        }
    } catch (err) {
        return reply.status(500).send({ message: err.message });
    }
});

fastify.post('/updateJurusan/:id', async (request, reply) => {
    const data = request.headers.data;
    const { namaJurusan, urutanJurusan } = JSON.parse(data);
    const file = await request.file();

    try{
        if (!file) {
            return reply.status(400).send({ message: 'No image provided' });
        }

        const timestamp = Date.now();
        const uploadDir = path.join(__dirname, 'Gambar/Admin/Jurusan');
        const filepath = path.join(uploadDir, `${timestamp}-${file.filename}`);

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }

        const get = await new Promise((resolve, reject) => {
            db.query('SELECT gambar FROM jurusan WHERE id = ?', [request.params.id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
        if(get.length > 0){
            const oldFilePath = path.join(uploadDir, get[0].gambar);
            if(fs.existsSync(oldFilePath)){
                fs.unlinkSync(oldFilePath);
            }
        }
        const update = await new Promise((resolve, reject) => {
            db.query('UPDATE jurusan SET namajurusan = ?, sub_jurusan = ?, gambar = ? WHERE id = ?', [namaJurusan, urutanJurusan, `${timestamp}-${file.filename}`, request.params.id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
        if(update.affectedRows > 0){
            await pipeline(file.file, fs.createWriteStream(filepath));
            return reply.status(200).send({ message: 'Success' });
        }else{
            return reply.status(401).send({ message: 'Failed' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post('/deleteJurusan/:id', async (request, reply) => {
    try{
        const get = await new Promise((resolve, reject) => {
            db.query('SELECT gambar FROM jurusan WHERE id = ?', [request.params.id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
        if(get.length > 0){
 

            const selectKelas = await new Promise((resolve, reject) => {
                db.query('SELECT id FROM kelas WHERE jurusanid = ?', [request.params.id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
            if(selectKelas.length > 0){
                const updateSiswa = await new Promise((resolve, reject) => {
                    db.query("UPDATE siswa SET idkelas = '' WHERE idkelas IN (?)", [selectKelas], (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else{
                            resolve(result);
                        }
                    })
                })
            }

            const del = await new Promise((resolve, reject) => {
                db.query('DELETE FROM jurusan WHERE id = ?', [request.params.id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
            if(del.affectedRows > 0){
                const oldFilePath = path.join(__dirname, 'Gambar/Admin/Jurusan/', get[0].gambar);
                if(fs.existsSync(oldFilePath)){
                    fs.unlinkSync(oldFilePath);
                }
                return reply.status(200).send({ message: 'Success' });
            }
        }
        
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

// -data-kelas

fastify.get('/getKelas_Admin/:id', async (request, reply) => {
    const id = request.params.id;
    try {
        const resp = await new Promise((resolve, reject) => {
            db.query('SELECT kelas.id AS id, kelas.jurusanid, jurusan.namajurusan, jurusan.sub_jurusan, kelas.kelas, guru.nama AS namaguru FROM kelas JOIN jurusan ON kelas.jurusanid = jurusan.id LEFT JOIN guru ON kelas.idguru = guru.id  WHERE kelas.jurusanid = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })

        if (resp.length === 0) {
            return reply.status(404).send({ message: 'Data not found' });
        }

        return reply.status(200).send(resp);
    } catch (err) {
        return reply.status(500).send({ message: err.message });
    }
});


fastify.get('/getDetailKelas/:id', async (request, reply) => {
    const id = request.params.id;
    const { offset } = request.query || 0;
    const offsetint = parseInt(offset, 10);

    try{
        const resp = await new Promise((resolve, reject) => {
            db.query('SELECT kelas.kelas, guru.nama AS namaguru, guru.id AS idguru, jurusan.namajurusan, jurusan.sub_jurusan FROM kelas JOIN jurusan ON kelas.jurusanid = jurusan.id LEFT JOIN guru ON kelas.idguru = guru.id WHERE kelas.id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })

        const [resp2, resp2Length] = await Promise.all([
            new Promise((resolve, reject) => {
                db.query('SELECT * FROM siswa WHERE idkelas = ? LIMIT 10 OFFSET ?', [id, offsetint], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else{
                        resolve(result);
                    }
                })
            }),
            new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total FROM siswa WHERE idkelas = ?', [id], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else{
                        resolve(result);
                    }
                })
            })
        ])
        
        const resp2data = await Promise.all(resp2.map(async (item) => {
            const imagePath = `./Gambar/Siswa/Profil/${item.gambar_profil}`;
            const Image = fs.readFileSync(imagePath, 'base64');

            return { ...item, bukti: Image };
        }))

        const resp3 = await new Promise((resolve, reject) => {
            db.query('SELECT id, nama FROM guru', [id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })

        const data = {
            resp : resp[0],
            resp2data : resp2data,
            resp2length : resp2Length[0].total,
            resp3 : resp3
        }
        
        return reply.status(200).send(data);
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

fastify.post ('/ubahWaliKelas', async (request, reply) => {
    const { id, idguru } = request.body;
    try{
        const resp = await new Promise((resolve, reject) => {
            db.query('UPDATE kelas SET idguru = ? WHERE id = ?', [idguru, id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })

        if(resp.affectedRows > 0){
            return reply.status(200).send({ message: 'Success' });
        }
    }catch(err){
        return reply.status(500).send({ message: err.message });
    }
})

const start = async () => {
    try {
      await fastify.listen({
        port: 5000,
        host: 'localhost'
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  start();