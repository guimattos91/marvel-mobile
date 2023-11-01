export type ThumbnailType = {
  path: string;
  extension: string;
};
export type ItemEventType = {
  resourceURI: string;
  name: string;
  type: string;
};

export type EventType = {
  available: number;
  collectionURI: string;
  items: ItemEventType[];
};
export type ComicCharacterType = {
  available: number;
  collectionURI: string;
  items: ItemEventType[];
};

export type CharacterType = {
  id: number;
  name: string;
  thumbnail: ThumbnailType;
  description: string;
  events: EventType;
  comics: ComicCharacterType;
};
