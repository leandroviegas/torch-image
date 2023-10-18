export type Like = { UserId: string; username: string; profilePicture: string };

type Image = {
  name: string;
  sourceId: string;
  sourceImageURL: string;
  imageLink: string;
  previewLink: string;
  imageWidth: number;
  imageHeight: number;
  tags: string[];
  likes: Like[];
  owner: {
    username: string;
    profilePicture: string;
    userLink: string;
  };
  provider: {
    name: string;
    URL: string;
    providerPicture: string;
  };
};

export type Comment = {
  id?: string;
  content: string;
  referenceId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id?: string;
    username: string;
    profilePicture: string;
    userLink: string;
  };
};

export type Collection = {
  id?: string;
  name: string;
  description: string;
  link: string;
  owner: {
    username: string;
    profilePicture: string;
    link: string;
  };
  images: {
    id: string;
    identification: string;
    provider: string;
  }[];
};

export default Image;
