import React from "react";
import BlogPageOne from "../../../components/blog/BlogPageone";
const Page = async ({ params }) => {
  const { countryName } = await params;
  // console.log(blogdata);

  return (
    <>
      <BlogPageOne countryName={countryName} />
    </>
  );
};

export default Page;
