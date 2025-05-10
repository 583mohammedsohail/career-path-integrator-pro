import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertHTMLToPDF(htmlPath, pdfPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const html = await fs.readFile(htmlPath, 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });

  await browser.close();
}

async function generateAllPDFs() {
  const students = [
    'priya-sharma',
    'rahul-patel',
    'anjali-gupta',
    'arjun-kumar'
  ];

  for (const student of students) {
    const htmlPath = path.join(__dirname, '..', 'src', 'data', 'resumes', `${student}.html`);
    const pdfPath = path.join(__dirname, '..', 'public', 'resumes', `${student}.pdf`);
    
    try {
      await fs.mkdir(path.join(__dirname, '..', 'public', 'resumes'), { recursive: true });
      await convertHTMLToPDF(htmlPath, pdfPath);
      console.log(`Generated PDF for ${student}`);
    } catch (error) {
      console.error(`Error generating PDF for ${student}:`, error);
    }
  }
}

generateAllPDFs().catch(console.error); 