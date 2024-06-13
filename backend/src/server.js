import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '../data/uploads');
fs.mkdir(uploadDir, {recursive: true}, (err) => {
  if (err) {
    console.error('Error creating upload directory:', err);
    process.exit(1); // Exit the process with an error code
  } 
});
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function(req, file, cb) {
    cb(null, file.fieldname + crypto.randomBytes(18).toString('hex') + path.extname(file.originalname))
  }
});
const upload = multer({
  storage: storage
});

/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json())
// Enable CORS for the frontend so it can call the backend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../data/uploads')));

const jsonFilePath = path.join(__dirname, '../data/partners.json');

const readJsonFile = async () => {
  try {
    const data = await fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
};

const writeJsonFile = (data) => {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
};

/*
  APPLICATION ROUTES
*/

app.get('/partners', async (req, res) => {
  res.status(200).send(await readJsonFile());
})

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})

app.post('/submit', upload.single('logo'), async (req, res) => {
 
  try {
    const { name, description, active } = req.body;
    const newEntry = {
      name,
      description,
      active: active === 'true',
    };

    if (req.file) {
      const path = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      newEntry.logo = path; // Save the file path
    }
    const existingData = await readJsonFile();
    existingData.push(newEntry);
    writeJsonFile(existingData);

    // delay to load images
    setTimeout(function() {
      alert('setTimeout');
    }, 2000);

    res.status(200).json({ message: 'Form data submitted successfully!' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form data', error });
  }
});

app.post('/button', async (req, res) => {
  try {
    const {name} = req.body;
    const existingData = await readJsonFile();
    let file;
    var filtered = existingData.filter(function(partner) {
      if (partner.name==name) {
        file = partner.logo;
      }
      return partner.name!=name;
    });
    const path = "backend/data" + file.substring(21);
    fs.unlink(path,(function(err) {
      if(err) {
        console.log(err);
      }  else {
        console.log("logo deleted");
      }
    }));
    writeJsonFile(filtered);
    res.status(200).json({message: 'Partner deleted successfully!'});
  } catch (error) {
    res.status(500).json({ message: 'Error deleting partner', error });
  }
})