# Web Scraper Application

A full-stack web scraping application built with Node.js, Express, React, and Vite. Extract data from any website and export it in multiple formats (JSON, Excel, CSV).

## 🏗️ Project Structure

```
scraper/
├── backend/          # Express.js API server
│   ├── routes/
│   │   ├── scraper.js     # Puppeteer & Cheerio scraping endpoints
│   │   └── export.js      # Excel, JSON, CSV export endpoints
│   ├── server.js     # Express server setup
│   ├── package.json
│   └── .env.example
├── frontend/         # React + Vite UI
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Scraping**: Puppeteer (JS-heavy sites), Cheerio (static HTML)
- **Frontend**: React, Vite, Tailwind CSS
- **Export**: ExcelJS, CSV export
- **Database**: MongoDB (optional, for storing scraped data)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📝 API Endpoints

### Scraping
- `POST /api/scraper/cheerio` - Scrape static HTML with CSS selectors
- `POST /api/scraper/puppeteer` - Scrape JavaScript-heavy sites

Request body:
```json
{
  "url": "https://example.com",
  "selectors": {
    "title": ".product-title",
    "price": ".price"
  }
}
```

### Export
- `POST /api/export/json` - Export to JSON
- `POST /api/export/excel` - Export to Excel (.xlsx)
- `POST /api/export/csv` - Export to CSV

Request body:
```json
{
  "data": [{ "title": "Item 1", "price": "$10" }],
  "filename": "export.json"
}
```

## 🎯 Features

- ✅ Scrape any website with CSS selectors
- ✅ Support for static and JavaScript-heavy sites
- ✅ Export to JSON, Excel, and CSV
- ✅ Multiple selector support
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Error handling and validation

## 📦 Dependencies

### Backend
- `express` - Web framework
- `puppeteer` - Browser automation
- `cheerio` - HTML parsing
- `axios` - HTTP client
- `exceljs` - Excel file generation
- `cors` - CORS middleware
- `dotenv` - Environment variables

### Frontend
- `react` - UI library
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `axios` - HTTP client

## 🔧 Development

### Adding New Selectors
Edit the selector list in the ScraperForm component to add custom data extraction fields.

### Customizing Export Formats
Modify the `/backend/routes/export.js` file to add new export formats.

### Database Integration (Future)
To store scraped data in MongoDB, update `/backend/routes/scraper.js` to save data before returning.

## ⚠️ Important Notes

1. **Rate Limiting**: Be respectful when scraping. Add delays between requests if scraping large amounts of data.
2. **Terms of Service**: Always check the website's ToS and robots.txt before scraping.
3. **Headless Browser**: Puppeteer downloads a browser on first install (~150MB).
4. **Selectors**: Test CSS selectors in browser DevTools before using them.

## 🐛 Troubleshooting

### Puppeteer issues
```bash
# If Puppeteer fails to download Chromium on Windows
npm install --build-from-source
```

### CORS errors
Ensure `CORS_ORIGIN` in `.env` matches your frontend URL.

### Port already in use
Change `PORT` in backend `.env` or `port` in frontend `vite.config.js`.

## 📄 License

MIT
