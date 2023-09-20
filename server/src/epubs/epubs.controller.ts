import { Controller, Get, Query, Res } from '@nestjs/common';
import { EpubsService } from './epubs.service';
import EpubParser from 'src/streamer/EpubParser';
import { Response } from 'express';

@Controller()
export class EpubsController {
  constructor(private readonly epubService: EpubsService) {}

  @Get('books')
  async getBooks() {
    return EpubParser.getAllEpubFileNames();
  }

  @Get('manifest')
  async manifest(bookName: string = 'nwt_KO') {
    const parser = new EpubParser(bookName);
    const manifest = parser.getManifest();
    return manifest;
  }

  @Get('getToc')
  async getToc(bookName: string = 'nwt_KO') {
    const parser = new EpubParser(bookName);
    const res = parser.getToc();
    return res;
  }

  // @Get('getContent')
  // async getContent(
  //   @Query('bookName') bookName: string = 'nwt_KO',
  //   @Query('content') content: string,
  //   @Res() res: Response,
  // ) {
  //   const parser = new EpubParser(bookName);
  //   const result = parser.getContent(content);
  //   res.write(result);
  //   res.end();
  //   // return result
  // }

  // @Get('getCss')
  // async getCss(
  //   @Query('bookName') bookName: string = 'nwt_KO',
  //   @Res() res: Response
  // ) {
  //   const parser = new EpubParser(bookName);
  //   const { content } = parser.getCss();

  //   res.setHeader('Content-Type', 'text/css');
  //   res.write(content);
  //   res.end();
  // }

  // @Get('getFonts')
  // async getFonts(bookName: string = 'nwt_KO') {
  //   const parser = new EpubParser(bookName);
  //   const res = parser.getFonts();
  //   return res;
  // }

  @Get('test')
  async test(bookName: string = 'nwt_KO') {
    const parser = new EpubParser(bookName);
    const res1 = parser.getManifest();
    console.log(res1);
    return res1;
  }
}
