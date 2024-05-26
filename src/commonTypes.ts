export interface Image {
  id: string;
  description: string;
  likes: number;
  urls: {
    regular: string;
    small: string;
  };
  user: {
    name: string;
  };
}
