// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const { execFile } = require('child_process');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// const upload = multer({ dest: 'uploads/' });

// app.post('/api/process-signature', upload.single('image'), (req, res) => {
//   const imagePath = req.file.path;
//   const outputPath = `processed/${req.file.filename}.png`;
//   const color = req.body.color || '#000000';

//   execFile(
//     'python', // Use 'python3' on Linux/macOS or just 'python' on Windows
//     ['process.py', imagePath, outputPath, color],
//     (error, stdout, stderr) => {
//       console.log('stdout:', stdout);
//       console.log('stderr:', stderr);

//       if (error) {
//         console.error('Python error:', error);
//         return res.status(500).json({ error: 'Processing failed' });
//       }

//       res.sendFile(path.resolve(outputPath), () => {
//         fs.unlink(imagePath, () => {});
//         fs.unlink(outputPath, () => {});
//       });
//     }
//   );
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

//New version
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Allow requests from Netlify frontend
app.use(cors({
  origin: ['https://storied-capybara-d10d34.netlify.app'],
  methods: ['GET', 'POST'],
}));

app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/process-signature', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;
  const outputPath = `processed/${req.file.filename}.png`;
  const color = req.body.color || '#000000';

  execFile(
    'python', // Use 'python3' on Linux/macOS or just 'python' on Windows
    ['process.py', imagePath, outputPath, color],
    (error, stdout, stderr) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);

      if (error) {
        console.error('Python error:', error);
        return res.status(500).json({ error: 'Processing failed' });
      }

      res.sendFile(path.resolve(outputPath), () => {
        fs.unlink(imagePath, () => {});
        fs.unlink(outputPath, () => {});
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
