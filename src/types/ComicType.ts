export type ThumbnailComicsType = {
  path: string;
  extension: string;
};

export type CollectedIssuesType = [
  {
    resourceURI: string;
    name: string;
  },
];

export type ComicsType = {
  id: number;
  title: string;
  description: string;
  thumbnail: ThumbnailComicsType;
  collectedIssues: CollectedIssuesType;
};
