export interface DataResponse {
  data: {
    artists: {
      items: [{}];
    };
  };
}

export interface UserInfo {
  display_name?: string;
  external_urls?: {
    spotify: string;
  };
  images?: [
    {
      url: string;
    }
  ];
}
