import * as fs from 'fs';

class EpubFetcher {
  private epubPath: string;

  constructor(epubPath: string) {
    this.epubPath = epubPath;
  }

  // EPUB 리소스의 내용을 가져옵니다.
  getResourceContent(filePath: string): string {
    const fullPath = this.epubPath + filePath;
    return fs.readFileSync(fullPath, 'utf-8');
  }

  // 리소스를 복호화합니다. (예시로만 작성)
  deobfuscateResource(content: string): string {
    // 복호화 로직
    return content;
  }

  // HTML 리소스에 CSS 또는 JS를 주입합니다.
  injectResource(htmlContent: string, cssContent?: string, jsContent?: string): string {
    let newContent = htmlContent;
    if (cssContent) {
      newContent = newContent.replace('</head>', `<style>${cssContent}</style></head>`);
    }
    if (jsContent) {
      newContent = newContent.replace('</body>', `<script>${jsContent}</script></body>`);
    }
    return newContent;
  }

  // HTML 리소스에 사용자 설정을 주입합니다. (CSS custom properties)
  injectUserSettings(htmlContent: string, customCssProperties: { [key: string]: string }): string {
    let customProperties = '';
    for (const [key, value] of Object.entries(customCssProperties)) {
      customProperties += `${key}: ${value};\n`;
    }
    return htmlContent.replace('</head>', `<style>:root { ${customProperties} }</style></head>`);
  }
}

export default EpubFetcher;
