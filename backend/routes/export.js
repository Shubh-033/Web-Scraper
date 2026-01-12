import express from 'express';
import ExcelJS from 'exceljs';

const router = express.Router();

// Export to Excel
router.post('/excel', async (req, res) => {
  try {
    const { data, filename = 'export.xlsx' } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Data array is required' });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add headers
    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      worksheet.addRow(headers);

      // Style header row
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD3D3D3' }
      };

      // Add data rows
      data.forEach(row => {
        worksheet.addRow(Object.values(row));
      });

      // Auto-fit columns
      worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell?.({ includeEmpty: true }, cell => {
          const cellLength = cell.value ? cell.value.toString().length : 0;
          if (cellLength > maxLength) maxLength = cellLength;
        });
        column.width = Math.min(maxLength + 2, 50);
      });
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export to JSON
router.post('/json', async (req, res) => {
  try {
    const { data, filename = 'export.json' } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export to CSV
router.post('/csv', async (req, res) => {
  try {
    const { data, filename = 'export.csv' } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Data array is required' });
    }

    if (data.length === 0) {
      return res.status(400).json({ error: 'Data array is empty' });
    }

    const headers = Object.keys(data[0]);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Manual CSV writing
    const csv = [
      headers.map(h => `"${h}"`).join(','),
      ...data.map(r => headers.map(h => `"${r[h] || ''}"`).join(','))
    ].join('\n');

    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
