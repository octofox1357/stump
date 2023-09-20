// url-rewrite.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class UrlRewriteMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.url.startsWith('/css/')) {
      const newPath = '/public/epubs/nwt_KO/OEBPS' + req.url;
      req.url = newPath;
      console.log('새로운 경로', req.url);
    }
    next();
  }
}
