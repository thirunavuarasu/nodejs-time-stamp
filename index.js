import express from 'express';
import cors from 'cors'; // Importing cors for Cross-Origin Resource Sharing
import fs from 'fs'; // Importing fs for file system operations
import { format } from 'date-fns'; // Importing format function from date-fns

const app = express(); // Renaming App to app (conventionally lowercase)
const PORT = 5000; // Port number can be configured via environment variables (.env)

app.use(cors()); // Using cors middleware to enable Cross-Origin Resource Sharing

app.get('/first', (req, res) => {
  res.status(200).json({ message: 'hello' }); // Simple GET endpoint for testing
});

app.get('/writereadfile', (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy-HH-mm-ss"); // Formatting current date/time
  console.log(today);
  const filepath = `TimeStamp/${today}.txt`; // Filepath where the timestamp will be stored

  // Writing timestamp to file synchronously
  try {
    fs.writeFileSync(filepath, today, 'utf8');
    console.log(`Timestamp saved to ${filepath}`);

    // Reading timestamp from file and sending it as response
    let data = fs.readFileSync(filepath, 'utf8');
    res.status(200).send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to write/read timestamp file' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
