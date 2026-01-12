import express from 'express';
import * as cheerio from 'cheerio';
import axios from 'axios';

const router = express.Router();

// Scrape with Cheerio (for static HTML)
router.post('/scrape', async (req, res) => {
  try {
    const { url, selectors } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });
      const $ = cheerio.load(response.data);

      const data = {};
      for (const [key, selector] of Object.entries(selectors)) {
        data[key] = $(selector)
          .map((i, el) => ({
            text: $(el).text().trim(),
            html: $(el).html()
          }))
          .get();
      }

      res.json({ success: true, data });
    } catch (axiosError) {
      res.status(400).json({ error: `Failed to fetch URL: ${axiosError.message}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Backward compatibility endpoint
router.post('/cheerio', async (req, res) => {
  try {
    const { url, selectors } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });
      const $ = cheerio.load(response.data);

      const data = {};
      for (const [key, selector] of Object.entries(selectors)) {
        data[key] = $(selector)
          .map((i, el) => ({
            text: $(el).text().trim(),
            html: $(el).html()
          }))
          .get();
      }

      res.json({ success: true, data });
    } catch (axiosError) {
      res.status(400).json({ error: `Failed to fetch URL: ${axiosError.message}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
