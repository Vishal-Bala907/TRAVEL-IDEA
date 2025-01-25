import React from "react";

const page = async ({ params }) => {
  const { name } = await params;
  return <div>{name}</div>;
};

export default page;
