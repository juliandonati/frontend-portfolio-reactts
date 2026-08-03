import {type CSSProperties} from "react";
import { MoonLoader } from "react-spinners";

const override: CSSProperties = {
    display:"block",
//    margin:"15% auto",
    borderColor: "red",
};

interface LoadingCoverProps{
    loading:boolean
}

export function LoadingCover({loading}:LoadingCoverProps) {
    return loading && (
        <div className="sweet-loading w-full h-full fixed top-0">
            <div className="w-full h-full bg-black opacity-25 absolute"/>
            <div className="w-fit mx-auto mt-[50%] md:mt-[15%]">
                <MoonLoader
                    color="#ff006f"
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}
