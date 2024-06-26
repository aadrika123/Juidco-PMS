import { FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function MasterTable({ tableRowHandler }) {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName='.Mui-focusVisible'
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },

        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <>
      {/* //search items */}
      <div className='flex justify-end mb-10'>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500 '
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <input
            type='text'
            id='table-search'
            className='block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Search...'
          />
        </div>
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-indigo-200 '>
            <tr className='font-semibold'>
              <th scope='col' className='px-6 py-3 '>
                Category Id
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Total SubCategory
              </th>
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            <tr
              className='bg-white border-b   hover:bg-gray-50 cursor-pointer'
              onClick={tableRowHandler && tableRowHandler}
            >
              <th
                scope='row'
                className='px-6 py-4 text-gray-900 whitespace-nowrap text-[14px]'
              >
                Apple MacBook Pro 17"
              </th>
              <td className='px-6 py-4 font-semibold text-[14px]'>Silver</td>
              <td className='px-6 py-4'>Laptop</td>
              <td className='px-6 py-4'>
                {" "}
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                />
              </td>
              <td className='px-6 py-4 text-right'>
                <a
                  href='#'
                  className='font-medium text-blue-600  hover:underline'
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr
              className='bg-white border-b   hover:bg-gray-50 '
              onClick={() => {}}
            >
              <th
                scope='row'
                className='px-6 py-4 text-gray-900 whitespace-nowrap text-[14px]'
              >
                Apple MacBook Pro 17"
              </th>
              <td className='px-6 py-4 font-semibold text-[14px]'>Silver</td>
              <td className='px-6 py-4'>Laptop</td>
              <td className='px-6 py-4'>
                {" "}
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                />
              </td>
              <td className='px-6 py-4 text-right'>
                <a
                  href='#'
                  className='font-medium text-blue-600  hover:underline'
                >
                  Edit
                </a>
              </td>
            </tr>
            <tr
              className='bg-white border-b   hover:bg-gray-50 '
              onClick={() => {}}
            >
              <th
                scope='row'
                className='px-6 py-4 text-gray-900 whitespace-nowrap text-[14px]'
              >
                Apple MacBook Pro 17"
              </th>
              <td className='px-6 py-4 font-semibold text-[14px]'>Silver</td>
              <td className='px-6 py-4'>Laptop</td>
              <td className='px-6 py-4'>
                {" "}
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                />
              </td>
              <td className='px-6 py-4 text-right'>
                <a
                  href='#'
                  className='font-medium text-blue-600  hover:underline'
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
