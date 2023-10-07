export type Like =  { UserId: string; username: string; profilePicture: string }

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

export default Image;
