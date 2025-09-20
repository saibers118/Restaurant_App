import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5174;
const DATA_FILE = path.join(process.cwd(), 'server', 'menu.json');

app.use(cors());
app.use(express.json());

// GET menu
app.get('/api/menu', async (req, res) => {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error('Failed to read menu.json', err);
    res.status(500).json({ error: 'Failed to read menu' });
  }
});

// POST add item { category, item }
app.post('/api/menu', async (req, res) => {
  try {
    const { category, item } = req.body || {};
    if (!category || !item) return res.status(400).json({ error: 'category and item required' });

    let data = { appetizers: [], mains: [], desserts: [], beverages: [] };
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8');
      data = JSON.parse(raw);
    } catch (e) {
      // file may not exist yet - we'll create it
    }

    if (!Array.isArray(data[category])) data[category] = [];
    // prepend new item so it appears first
    data[category] = [item, ...data[category]];

    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    res.json(data);
  } catch (err) {
    console.error('Failed to write menu.json', err);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

app.listen(PORT, () => {
  console.log(`Menu server listening on http://localhost:${PORT}`);
});
