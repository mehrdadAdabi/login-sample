"use client";
import BaseInput from "@/app/components/base/input/input";
import BaseMenu from "../../components/Menu/menu.component";
import { useEffect, useState } from "react";
import { InputAdornment, Pagination } from "@mui/material";
import { Search } from "@mui/icons-material";
import useAxios from "@/app/service/axiosInstance";
import { auth_routes } from "@/app/routes/route";
import SkeletonComponent from "@/app/components/base/Skeleton/skeleton";
import CardComponent from "../../components/Card/card.component";
import { FilteredJobs } from "../../types/dashboard.type";

function Dashboard() {
  const [openMenu, setOpenMenu] = useState(false);
  const { get } = useAxios();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const mockArray = Array.from({ length: 12 }, (_, index) => index + 1);

  const [filteredJobs, setFilteredJobs] = useState<Partial<FilteredJobs>>({
    title: "",
    page: 1,
    nextPage: true,
    limit: 9,
    order: "DESC",
    orderBy: "datePosted",
    expired: "false",
    prevPage: false,
    total: 0,
    totalPages: 0,
  });

  const mergePagination = (
    prevJobs: any,
    pagination: Partial<FilteredJobs>
  ): FilteredJobs => {
    return {
      ...prevJobs,
      title: pagination.title ?? prevJobs.title,
      page: pagination.page ?? prevJobs.page,
      limit: pagination.limit ?? prevJobs.limit,
      order: pagination.order ?? prevJobs.order,
      orderBy: pagination.orderBy ?? prevJobs.orderBy,
      total: pagination.total ?? prevJobs.total,
      totalPages: pagination.totalPages ?? prevJobs.totalPages,
      nextPage: pagination.nextPage ?? prevJobs.nextPage,
      prevPage: pagination.prevPage ?? prevJobs.prevPage,
      expired: pagination.expired ?? prevJobs.expired,
    };
  };

  const fetchData = async () => {
    setLoading(true);
    const searchParams = `title=${filteredJobs.title}&page=${filteredJobs.page}&limit=${filteredJobs.limit}&order=${filteredJobs.order}&orderBy=${filteredJobs.orderBy}&companyNames[]=&expired=${filteredJobs.expired}`;
    const [err, data] = await get(`${auth_routes.jobs}?${searchParams}`);
    if (err) {
      console.error(err);
      return;
    }
    setJobs(data.data);
    setLoading(false);
    setFilteredJobs((prevJobs) => mergePagination(prevJobs, data?.pagination));
  };

  useEffect(() => {
    fetchData();
  }, [filteredJobs.page, filteredJobs.title]);

  const paginationHandler = async (_, page: number) => {
    setFilteredJobs((prevJobs) => ({
      ...prevJobs,
      page: page,
    }));
  };

  const searchHandler = (val: string) => {
    setFilteredJobs((prevJobs) => ({
      ...prevJobs,
      title: val,
      page: 1,
    }));
  };

  return (
    <>
      <div>
        <div className="searchBox ">
          <BaseInput
            placeholder="جستجو برای شغل، کلمه کلیدی و ..."
            onChange={(e) => searchHandler(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="filterBox flex justify-between flex-row-reverse mt-3">
          <div className="searchResult flex flex-row-reverse gap-2">
            <span>{filteredJobs.total}</span>
            نتیجه یافت شد
          </div>
          <div className="filter flex  flex-row-reverse gap-2">
            <span>فیلتر</span>
            <div className="menu relative">
              <div
                className="flex flex-row-reverse gap-2"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <span>مرتب سازی بر اساس</span>
                <span>جدیدترین</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {loading && (
          <div className="content grid grid-cols-3 gap-8">
            {mockArray.map((_, index: number) => {
              return <SkeletonComponent key={index} isShow={true} />;
            })}
          </div>
        )}

        {!loading && (
          <div className="content grid grid-cols-2 gap-8">
            {jobs.map((item, index) => {
              return <CardComponent item={item} key={index} />;
            })}
          </div>
        )}

        <div className="flex justify-center mt-8 rtl">
          <Pagination
            count={filteredJobs.totalPages}
            color="primary"
            onChange={paginationHandler}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
