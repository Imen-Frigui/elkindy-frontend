import { Inventory } from "components";
import Banner1 from "./Banner";
import banner from "assets/img/banner2.jpeg";

function InventoryList() {
    return (
        <div className=" z-500 mt-2 grid h-full grid-cols-1 gap-5 ">
            <div className="col-span-1 h-fit w-full md:col-span-5">
                <Banner1
                    title="Explore El Kindy's Instrument Inventory in 3D Mode"
                    backgroundImage={banner}
                />
                <Inventory />
            </div>
        </div>

    );
}

export default InventoryList;