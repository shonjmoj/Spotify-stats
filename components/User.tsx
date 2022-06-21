import Image from "next/image";
import React, { FC } from "react";
import { UserInfo } from "../types";

export const UserProfile: FC<UserInfo> = ({
  display_name,
  images,
  external_urls,
}) => {
  return (
    <div>
      <h1>{display_name}</h1>
      <img src={images?.[0].url} height={50} width={50} />
      <a href={external_urls?.spotify}>link</a>
    </div>
  );
};
