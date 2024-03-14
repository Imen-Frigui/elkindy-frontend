import Banner from "./components/Banner";
import guitar from "assets/img/nfts/acoustic-guitar-grey.jpg";
import avatar1 from "assets/img/avatars/avatar1.png";

import InstrumentCard from "components/card/InstrumentCard";

import useInstrumentStore from "store/instrumentStore";
import { useEffect, useCallback, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, SortByDropdown, NoData, SearchBar } from "../../../components";
import InstrumentSkeleton from "./components/InstrumentSkeleton";
import { useQuery } from "../../../hooks/useQuery";
import useShowToast from "../../../hooks/useShowToast";

const Marketplace = ({ location }) => {
  const { type } = useParams();
  const query = useQuery();
  const showToast = useShowToast();

  const [status, setStatus] = useState("All");
  const [age, setAge] = useState("3-5");
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const searchQuery = query.get("search") || "";
  const {
    instruments,
    loading,
    fetchInstruments,
    searchInstruments,
    hasMorePages,
  } = useInstrumentStore();

  useEffect(() => {
    const fetchData = async () => {
      if (hasMorePages) {
        if (searchQuery) {
          await searchInstruments(
            status.toLocaleLowerCase() !== "all"
              ? status.toLocaleLowerCase()
              : "",
            sort,
            searchQuery,
            page
          );
        } else {
          await fetchInstruments(
            status.toLocaleLowerCase() !== "all"
              ? status.toLocaleLowerCase()
              : "",
            sort,
            page
          );
        }
      }
    };
    fetchData();
  }, [page, age, status, sort, searchQuery, hasMorePages]);

  const isActiveAge = useCallback(
    (elem) => {
      if (!age || age === elem) {
        return "bg-kindyorange text-white";
      } else {
        return " bg-indigo-50 text-kindyblue";
      }
    },
    [age]
  );

  const isActiveCategory = useCallback(
    (elem) => {
      if (!status || status === elem) {
        return "bg-kindyorange text-white";
      } else {
        return " bg-indigo-50 text-kindyblue";
      }
    },
    [status]
  );

  const handleShowFilters = () => {
    setShowFilter((showFilter) => !showFilter);
  };
  const observer = useRef(null);

  const lastInstrument = useCallback(
    (node) => {
      if (!node) return;
      const options = {
        threshold: 1,
        rootMargin: "0px",
      };
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage(page + 1);
        }
      }, options);
      observer.current.observe(node);
    },
    [page, hasMorePages, status, searchQuery]
  );

  return (
    <div className=" z-500 mt-2 grid h-full grid-cols-1 gap-5 md:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full md:col-span-5">
        <Banner />
        <div className=" mb-2 mt-2  flex flex-col flex-wrap justify-between rounded-[20px] bg-kindydarkblue py-0 px-4 dark:bg-indigo-50 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-white dark:text-navy-700 ">
            Explore Instruments:
          </h4>
          <div className="flex flex-wrap items-center justify-between">
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
            <SearchBar />
          </div>
          <button
            onClick={handleShowFilters}
            className="border-transparent border-1 w-58 mb-3 flex items-center rounded-lg  bg-kindyorange py-2 px-4 text-white transition duration-300  hover:border-gray-100 hover:bg-opacity-80 hover:text-white  focus:outline-none md:mb-0 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Filter
          </button>
        </div>

        <div className=" grid grid-cols-1 gap-3 md:grid-cols-5">
          <div
            className={
              !showFilter
                ? `grid grid-cols-1 gap-5 md:col-span-5 md:row-span-1 md:grid-cols-4 `
                : `grid grid-cols-1 gap-5 md:col-span-4 md:row-span-1 md:grid-cols-4 `
            }
          >
            {loading ? (
              <>
                {"123456".split("").map((v) => (
                  <InstrumentSkeleton key={v} />
                ))}
              </>
            ) : instruments.length > 0 ? (
              instruments.map((data, index) => (
                <div
                  ref={index === instruments.length - 1 ? lastInstrument : null}
                >
                  <InstrumentCard
                    bidders={[avatar1]}
                    image={guitar}
                    instrument={data}
                    key={index}
                  />
                </div>
              ))
            ) : (
              <div className="md:col-span-3">
                <NoData />
              </div>
            )}
          </div>

          <div
            className="order-first md:order-last md:grid-rows-4"
            hidden={!showFilter}
          >
            <div className="grid grid-cols-1  ">
              <div className=" h-15 md:h20 mb-2 flex items-baseline justify-between space-y-1 overflow-hidden rounded-[20px] bg-kindydarkblue py-5 px-6 dark:bg-indigo-50 md:flex-col  ">
                <p className=" text-left font-bold text-white  dark:text-navy-800">
                  El Kindy Marketplace
                </p>
                <p className=" mr-3 text-left text-white opacity-80 dark:text-navy-800">
                  Instruments Board
                </p>
              </div>
              <div className="mb-3 flex flex-wrap items-center rounded-[20px] bg-white p-4 ">
                <p className=" text-black opacity-80 dark:text-navy-800">
                  Filter by age:
                </p>
                <div className=" flex flex-wrap rounded-lg bg-white md:w-72">
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
                            "my-1  mr-2   py-2 hover:border-kindyorange  " +
                            isActiveAge(age.toLowerCase())
                          }
                        />
                      );
                    }
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center rounded-[20px]  bg-white p-4">
                <p className=" mr-3 text-left text-black opacity-80 dark:text-navy-800">
                  Filter by category:
                </p>
                <div className="flex flex-wrap rounded-lg bg-white ">
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
                          "my-1  mr-2 py-2 hover:border-kindyorange " +
                          isActiveCategory(cat.toLowerCase())
                        }
                      />
                    );
                  })}
                </div>
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
