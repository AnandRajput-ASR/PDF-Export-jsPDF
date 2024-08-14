import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePDF() {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.save('sample.pdf');
  }

  private async loadFont(doc: jsPDF, fontName: string, fontFile: string, fontType: 'ttf' | 'base64'): Promise<void> {
    if (fontType === 'base64') {
      doc.addFileToVFS(`${fontName}.ttf`, fontFile);
    } else {
      const fontFilePath = `../../assets/fonts/${fontFile}`;
      const response = await fetch(fontFilePath);
      const buffer = await response.arrayBuffer();
      const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      doc.addFileToVFS(`${fontName}.ttf`, base64String);
    }
    doc.addFont(`${fontName}.ttf`, fontName, 'normal');
  }
  
  async generatePdfNew(contentKey: string, language: string, translations: any, fontName: string, fontFile: string, fontType: 'ttf' | 'base64'): Promise<void> {
    const doc = new jsPDF();
    await this.loadFont(doc, fontName, fontFile, fontType); // Ensure font is loaded
    doc.setFont(fontName);
  
    const translatedContent = translations[language][contentKey];
    doc.text(translatedContent, 10, 10);
    doc.save('document.pdf');
  }
  
  async generatePDF1(contentKey: string, language: string, translations: any, fontName: string, fontFile: string, fontType: 'ttf' | 'base64'): Promise<void> {
    const doc = new jsPDF();

    // Load custom font
    await this.loadFont(doc, fontName, fontFile, fontType);
    doc.setFont(fontName);

    // Set document properties
    doc.setProperties({
      title: 'My Document',
      subject: 'PDF generation with jsPDF',
      author: 'Angular App',
      keywords: 'pdf, angular, jspdf',
      creator: 'jsPDF'
    });

    // Add text
    const translatedContent = translations[language][contentKey];
    doc.text(translatedContent, 10, 20);

    // Add an image
    // Replace with actual Base64 string
    const imgData = 'data:image/png;base64,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';
    doc.addImage(imgData, 'JPEG', 10, 40, 50, 50);

    // Draw shapes
    doc.setDrawColor(0, 255, 0);
    doc.rect(70, 40, 50, 50);

    doc.setDrawColor(0, 0, 255);
    doc.circle(100, 100, 30);

    // Add a hyperlink
    doc.textWithLink('Go to Google', 10, 100, { url: 'https://www.google.com' });

    // Add a new page
    doc.addPage();
    doc.text('This is page 2', 10, 10);

    // Create a table
    autoTable(doc, {
      head: [['Name', 'Email']],
      body: [
        ['John Doe', 'john@example.com'],
        ['Jane Doe', 'jane@example.com'],
      ],
    });

    // Save the PDF
    doc.save('document.pdf');
  }
}
