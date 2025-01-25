// "use client";
import React from "react";
import Checkout from "../../../components/checkout/Checkout";

const Page = async ({ params }) => {
  const { name } = await params;
  const formattedName = name.replaceAll("%20", " ");
  // const [isVisa, setIsVisa] = useState(false);
  // const visas = useSelector((state) => state.visas.visas);
  // useEffect(() => {
  //   visas.forEach((visa) => {
  //     if (visa.countyName === name) {
  //       setIsVisa(true);
  //     }
  //   });
  // }, [name]);

  return (
    <>
      <Checkout formattedName={formattedName} />
    </>
  );
};

export default Page;
