import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfService } from './services/pdf.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'PDF-Export-jsPDF';
  translations: any;
  constructor(private PDFService: PdfService){
  }

  ngOnInit(): void {
    // Mock API response for translations
    this.translations = {
      en: { content: 'Hello, this is a translated text in English!' },
      fr: { content: 'Bonjour, ceci est un texte traduit en français!' }
    };
  }

  downloadPDF(){
    this.PDFService.generatePDF();
  }
  exportPdf(contentKey: string, language: string): void {
    const fontName = 'chilispepper';
    const fontFile = 'chilispepper.ttf';
    const fontType: 'ttf' | 'base64' = 'ttf';
    this.PDFService.generatePdfNew(contentKey, language, this.translations, fontName, fontFile, fontType);
  }

  downloadPDF1(contentKey: string, language: string){
    const fontName = 'chilispepper';
    const fontFile = 'chilispepper.ttf';
    const fontType: 'ttf' | 'base64' = 'ttf';
    this.PDFService.generatePDF1(contentKey, language, this.translations, fontName, fontFile, fontType);
  }
}
