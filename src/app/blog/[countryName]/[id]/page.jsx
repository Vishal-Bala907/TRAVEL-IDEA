import React from "react";
import BlogPageTwo from "../../../../components/blog/BlogPageTwo";

async function page({ params }) {
  const { countryName, id } = await params;
  return (
    <div>
      <BlogPageTwo countryName={countryName} id={id} />
    </div>
  );
}

export default page;
