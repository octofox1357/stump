import * as fs from 'fs';
import { XMLParser } from "fast-xml-parser";
import * as path from 'path';

class EpubParser {
  private parser: XMLParser;
  private EPUB_PATH = '/Users/chan/Desktop/stump/server/public/epubs/'
  private bookName: string

  constructor(bookName: string) {
    this.bookName = bookName;
    this.parser = new XMLParser({
      ignoreAttributes: false
    });
  }

  static getAllEpubFileNames(): string[] {
    const EPUB_PATH = '/Users/chan/Desktop/stump/server/public/epubs/';
    const fileNames: string[] = fs.readdirSync(EPUB_PATH);

    // .epub 확장자를 가진 파일만 반환
    return fileNames.filter(name => path.extname(name) === '.epub');
  }

  private findContentOpfPath(): string {
    const containerXmlPath = path.join(this.EPUB_PATH, this.bookName, 'META-INF/container.xml');
    const containerXml = fs.readFileSync(containerXmlPath, 'utf-8');
    const containerObj = this.parser.parse(containerXml);
    const rootfiles = containerObj.container.rootfiles.rootfile;

    if (Array.isArray(rootfiles)) {
      // 여러 rootfile이 있는 경우, 일단 첫 번째 rootfile을 선택
      console.log(rootfiles)
      return rootfiles[0]['@_full-path'];
    } else if (rootfiles) {
      console.log(rootfiles)
      // 단일 rootfile만 있는 경우
      return rootfiles['@_full-path'];
    } else {
      // rootfile을 찾을 수 없는 경우
      throw new Error("rootfile not found in container.xml");
    }
  }

  getManifest(): object {
    const contentOpfPath = path.join(this.EPUB_PATH, this.bookName, this.findContentOpfPath());
    const contentOpfXml = fs.readFileSync(contentOpfPath, 'utf-8');
    const contentObj = this.parser.parse(contentOpfXml);

    const metadata = contentObj.package.metadata;
    const manifest = contentObj.package.manifest.item;
    const spine = contentObj.package.spine.itemref;

    const parsedMetadata = {
      "@type": "http://schema.org/Book",
      "title": metadata["dc:title"],
      "author": metadata["dc:creator"],
      "identifier": metadata["dc:identifier"],
      "language": metadata["dc:language"],
      "modified": metadata["dcterms:modified"]
    };

    const parsedLinks = [
      {
        "rel": "self",
        "href": `http://localhost:4000/${this.bookName}/manifest`,
        "type": "application/webpub+json"
      }
    ]

    const parsedSpine = spine.map(item => {
      const correspondingManifestItem = manifest.find(mItem => mItem['@_id'] === item['@_idref']);
      return {
        "href": correspondingManifestItem['@_href'],
        "type": correspondingManifestItem['@_media-type'],
      };
    });

  
    const parsedResources = manifest.reduce((acc, item) => {
      if (item['@_media-type']) {
        if (['image/jpeg', 'font/ttf', 'text/css'].includes(item['@_media-type']) || item['@_id'] === 'toc') {
          let resource = {};
    
          if (item['@_media-type'] === 'image/jpeg' && item['@_id'] === 'cover-image') {
            resource = {
              'rel': 'cover',
              'href': item['@_href'],
              'type': item['@_media-type'],
              'height': 600,
              'width': 400
            };
          } else if (item['@_id'] === 'toc') {
            resource = {
              'href': item['@_href'],
              'type': item['@_media-type']
            };
          } else {
            resource = {
              'href': item['@_href'],
              'type': item['@_media-type']
            };
          }
    
          acc.push(resource);
        }
      }
      return acc;
    }, []);
    

    return {
      "@context": "http://readium.org/webpub/default.jsonld",
      "metadata": parsedMetadata,
      "links": parsedLinks,
      "spine": parsedSpine,
      "resources": parsedResources
    };
  }

  getToc(): string {
    const contentOpfPath = path.join(this.EPUB_PATH, this.bookName, this.findContentOpfPath());
    const contentOpfXml = fs.readFileSync(contentOpfPath, 'utf-8');
    const contentObj = this.parser.parse(contentOpfXml);
  
    const spine = contentObj.package.spine;  // 이 부분이 수정됩니다.
    const manifest = contentObj.package.manifest.item;
    
    const tocId = spine['@_toc']; // 여기서 'ncx'가 나와야 합니다.
    
    if (!tocId) {
      throw new Error("TOC not found in the OPF file");
    }
  
    const tocItem = manifest.find(item => item['@_id'] === tocId);
    
    if (!tocItem) {
      throw new Error("TOC not found in the manifest");
    }
    
    const tocFilePath = path.join(this.EPUB_PATH, this.bookName, tocItem['@_href']);
    
    if (!fs.existsSync(tocFilePath)) {
      console.log(tocFilePath)
      throw new Error("TOC file does not exist at the specified path");
    }
    
    const tocXml = fs.readFileSync(tocFilePath, 'utf-8');
    return tocXml;
  }
}

export default EpubParser;
