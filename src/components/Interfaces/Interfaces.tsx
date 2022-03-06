import { Basic } from "unsplash-js/dist/methods/photos/types";

export interface IPhoto extends Basic {
  tags: ITag[];
}

export interface ITag {
  title: string;
  type: string;
}
