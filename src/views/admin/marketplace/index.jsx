import Banner from "./components/Banner";
import guitar from "assets/img/nfts/acoustic-guitar-grey.jpg";
import avatar1 from "assets/img/avatars/avatar1.png";

import InstrumentCard from "components/card/InstrumentCard";

import useInstrumentStore from "store/instrumentStore";
import { useEffect, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, SortByDropdown, NoData } from "../../../components";
const Marketplace = () => {
  const { type } = useParams();
  const [status, setStatus] = useState("All");
  const [age, setAge] = useState("3-5");
  const [sort, setSort] = useState("");

  const { instruments, loading, fetchInstruments } = useInstrumentStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchInstruments(
        status.toLocaleLowerCase() !== "all" ? status.toLocaleLowerCase() : "",
        sort
      );
    };
    fetchData();
  }, [age, status, sort]);

  const isActiveAge = useCallback(
    (elem) => {
      if (!age || age === elem) {
        return "bg-kindydarkblue text-white";
      } else {
        return "text-blue-800";
      }
    },
    [age]
  );

  const isActiveCategory = useCallback(
    (elem) => {
      if (!status || status === elem) {
        return "bg-kindydarkblue text-white";
      } else {
        return "text-blue-800";
      }
    },
    [status]
  );

  return (
    <div className=" z-500 mt-3 grid h-full grid-cols-1 gap-5 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full md:col-span-4">
        <Banner />

        <div className=" z-1000 mb-4 mt-5 flex flex-col justify-between rounded-lg bg-kindyblue py-4 px-4 dark:bg-indigo-50 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-white dark:text-navy-700 ">
            Explore Instruments:
          </h4>
          <div className="flex items-center">
            <span className=" mr-2 text-sm font-light text-white dark:text-navy-700">
              Sort by :
            </span>
            <div className="relative z-10">
              <SortByDropdown
                onChange={setSort}
                value={sort}
                options={["", "-likeScore", "likeScore"]}
              />
            </div>
          </div>
          <Link
            to="/admin/marketplace/create"
            className="border-transparent border-1 rounded-lg bg-kindyorange py-2 px-4 text-white transition  duration-300 hover:border-gray-100 hover:bg-opacity-80  hover:text-white focus:outline-none "
          >
            + Post Instrument
          </Link>
        </div>

        <div className=" grid grid-cols-1 gap-5 md:grid-cols-4">
          <div className=" grid grid-cols-1 gap-5 md:col-span-3 md:grid-cols-3">
            {instruments.length > 0 ? (
              instruments.map((i) => (
                <InstrumentCard
                  bidders={[avatar1]}
                  image={guitar}
                  instrument={i}
                  key={i._id}
                />
              ))
            ) : (
              <div className="md:col-span-3">
                <NoData />
              </div>
            )}
          </div>
          <div className=" 3xl:p-![18px] relative  flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border !p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ">
            <div className="intro bg-dark layered-background h-32 rounded-lg py-6 px-6 ">
              <p className=" text-black text-left font-bold">
                El Kindy Marketplace
              </p>
              <p className=" text-black text-left opacity-70">
                Instruments Board
              </p>
            </div>
            <div className="">
            <div className="px-4">
                <p className=" text-black opacity-70">Filter by age:</p>
              </div>
              <div className="flex flex-wrap rounded-lg bg-white p-4">
                {["3-5", "4-5", "4-6", "5-7", "7-9", "9-12", "Adult"].map(
                  (age, i) => {
                    return (
                      <Button
                        onClick={(e) =>
                          setAge(e.target.innerText.toLowerCase())
                        }
                        key={i}
                        text={age}
                        className={
                          "my-1  mr-2 bg-indigo-50 py-2 hover:border-kindyorange " +
                          isActiveAge(age.toLowerCase())
                        }
                      />
                    );
                  }
                )}
              </div>
            </div>
            <div className="">
              <div className="px-4">
                <p className=" text-black text-left opacity-70">
                  Filter by category:
                </p>
              </div>
              <div className="flex flex-wrap rounded-lg bg-white p-4">
                {[
                  "All",
                  "Exchange",
                  "Maintenance",
                  "Available for borrow",
                  "Buy",
                ].map((cat, i) => {
                  return (
                    <Button
                      onClick={(e) =>
                        setStatus(e.target.innerText.toLowerCase())
                      }
                      key={i}
                      text={cat}
                      className={
                        "my-1  mr-2 bg-indigo-50 py-2 hover:border-kindyorange " +
                        isActiveCategory(cat.toLowerCase())
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Recently Added
          </h4>
        </div>

        {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <InstrumentCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price="0.91"
            image={NFt4}
          />
          <InstrumentCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price="0.7"
            image={NFt5}
          />
          <InstrumentCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price="2.91"
            image={NFt6}
          />
        </div> */}
      </div>

      {/* right side section */}

      {/* <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
        <HistoryCard />
      </div> */}
    </div>
  );
};

export default Marketplace;
