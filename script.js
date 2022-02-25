require('dotenv').config();
const File = require('./model/file')
const fs = require('fs')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));


async function fetchData() {
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const files = await File.find({ createdAt: { $lt: pastDate } })

    if (files.length) {
        for (const file of files) {
           try{ fs.unlinkSync(file.path);
            await file.remove();
            console.log(`successfully deleted ${file.filename}`);
           } catch (err) {
               console.log(`Error while deleting file ${err}`);
            }
        }
        console.log('Job Done');
    }
}

fetchData().then(process.exit);