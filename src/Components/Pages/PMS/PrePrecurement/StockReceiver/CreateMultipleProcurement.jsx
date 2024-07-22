import { useEffect, useState } from "react";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import BoqListTable from "@/Components/Common/ExportTable/BoqListTable";
import ShimmerEffectInline from "@/Components/Common/Loaders/ShimmerEffectInline";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import toast from "react-hot-toast";
import { MdArrowRightAlt } from "react-icons/md";
import ApiHeader from "@/Components/api/ApiHeader";

export default function CreateMultipleProcurement() {
  const { inputStyle, labelStyle } = ThemeStyle();

  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(false);
  const [proNos, setProNos] = useState([]);
  const [count, setCount] = useState(0);

  const { api_getActiveCategory, api_itemSubCategory } = ProjectApiList();

  const fetchCategory = () => {
    AxiosInterceptors.get(`${api_getActiveCategory}`, ApiHeader())
      .then(function (response) {
        setCategory(response?.data?.data);
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
      });
  };

  const fetchSubCategory = (catId) => {
    AxiosInterceptors.get(`${api_itemSubCategory}/${catId}`, ApiHeader())
      .then(function (response) {
        setSubCategory(response.data.data);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
        console.log("errorrr.... ", error);
      });
  };

  useEffect(() => {
    fetchCategory();
    // fetchOutboxBoq();
  }, []);

  return (
    <>
      <div className='container mx-auto bg-white'>
        <h1 className='text-[25px] flex justify-end pr-3 pt-2 font-bold'>
          Create multiple Procurement{" "}
        </h1>
        <div className='flex p-8 justify-between items-center'>
          <div className='flex'>
            <div className='form-group flex-shrink max-w-full px-4  mb-4'>
              <label className={`${labelStyle} inline-block mb-2`}>
                Items Category
                <span className='text-xl text-red-500 pl-1'>*</span>
              </label>
              <select
                // {...formik.getFieldProps("itemsubcategory")}
                className={`${inputStyle} inline-block w-full relative`}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  fetchSubCategory(e.target.value);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {category?.length &&
                  category?.map((items) => (
                    <option key={items?.id} value={items?.id}>
                      {items?.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className='form-group flex-shrink max-w-full px-4 w-80 mb-4'>
              <label className={`${labelStyle} inline-block mb-2`}>
                Items Sub Category
                <span className='text-xl text-red-500 pl-1'>*</span>
              </label>
              <select
                // {...formik.getFieldProps("itemsubcategory")}
                className={`${inputStyle} inline-block w-full relative`}
                onChange={(e) => {
                  //   setSubCategoryId(e.target.value);
                }}
              >
                <option defaultValue={"select"}>select</option>

                {subcategory?.length &&
                  subcategory?.map((items) => (
                    <option key={items?.id} value={items?.id}>
                      {items?.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className='pt-9'>
              <button
                className='bg-[#4338CA] hover:bg-[#5f54df] px-7 py-2 text-white font-semibold rounded shadow-lg'
                // onClick={boqListingFunc}
              >
                Search
              </button>
            </div>
          </div>

          <div className='pt-4 flex justify-center items-center'>
            <button
              className='bg-green-600 hover:bg-green-700 text-white p-2 rounded flex'
              //   onClick={prepareForBoq}
            >
              Create Multiple Procurement{" "}
              <MdArrowRightAlt className='text-2xl ml-2' />
            </button>
          </div>
        </div>

        <hr className='w-[76rem] mt-2 mb-10' />

        <div className='mt-4'>
          {loading ? (
            <ShimmerEffectInline />
          ) : (
            <>
              <div>
                <BoqListTable
                  // dataList={dataList}
                  setProNos={setProNos}
                  proNos={proNos}
                  page='inbox'
                  // setCount={setCount}
                  // count={count}
                  pagination={pagination}
                />
                {/* {dataList?.length > 0 ? (
                  <BoqListTable
                    // dataList={dataList}
                    setProNos={setProNos}
                    proNos={proNos}
                    page='inbox'
                    // setCount={setCount}
                    // count={count}
                    pagination={pagination}
                  />
                ) : (
                  <div className='bg-blue-100 border flex justify-center items-center border-blue-400 text-blue-700 rounded text-center m-3'>
                    <h1 className='p-3'>Select above options to get data</h1>
                  </div>
                )} */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
