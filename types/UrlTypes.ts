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

export interface shortUrlType extends urlInterface, createUrl, updateUrlType {
  shortId: string
}