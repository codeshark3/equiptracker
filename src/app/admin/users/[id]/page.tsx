import React from "react";
interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params: { id } }: Props) => {
  return <div>page id: {id}</div>;
};

export default page;
