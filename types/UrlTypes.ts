export interface urlInterface extends createUrl{
  id: number;
  // originalUrl: string;
  // shortId: string;
  createdAt: Date;
  clickCount: number;
}

export interface createUrl {
  originalUrl: string;
  shortId: string
}