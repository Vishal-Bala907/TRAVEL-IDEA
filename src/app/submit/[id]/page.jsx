
import React from "react";
import StepsHeader from "../../../components/formFilling/StepsHeader";
import Steps from "../../../components/formFilling/Steps";

const Page = async ({ params }) => {
    const { id } = await  params;

    return (
        <div>
            <StepsHeader />
            <div>
                <Steps id={id} />
            </div>
        </div>
    );
};

export default Page;