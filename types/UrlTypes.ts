export interface urlInterface extends createUrl{
  id: number;
  // originalUrl: string;
  // shortId: string;
  createdAt: Date;
  clickCount: number;
}

export interface createUrl {
  originalUrl: string;
  // shortId: string
}

export interface updateUrlType extends createUrl {
  id: number
}

export interface updateUrlByShortIdType extends createUrl {
  shortId: string
}

export interface customClick {
  id: number,
  clicks: number,
}

export interface shortUrlType extends urlInterface, createUrl, updateUrlType {
  shortId: string
}