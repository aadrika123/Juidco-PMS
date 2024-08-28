import { Modal, Box, Typography, Divider } from "@mui/material";
import ThemeStyle from "@/Components/Common/ThemeStyle";

export default function CreateModalCommon({
  handleClose,
  heading,
  open,
  label,
  name,
  value,
  onChange,
  placeholder,
  createNewHandler,
  updateHandler,
  page,
  onClose,
  loadingState,
}) {
  const { inputStyle, labelStyle, addButtonColor, cancelButtonColor, loading } =
    ThemeStyle();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "10px",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {heading}
          </Typography>
          <hr className='w-full h-2 mb-4' />
          <div className='px-2 space-y-4 mb-10'>
            <div className=''>
              <label className={`${labelStyle} font-semibold font-sans`}>
                {label}
              </label>
              <input
                type='text'
                name={name}
                className={`${inputStyle} inline-block w-full relative mt-2`}
                value={value}
                required
                placeholder={placeholder}
                onChange={onChange}
              />
            </div>
          </div>

          <div className='flex justify-between gap-2 mt-6 px-2'>
            <button className={`${cancelButtonColor}`} onClick={onClose}>
              Cancel
            </button>

            {page === "add" && (
              <>
                {loadingState ? (
                  <button className={`${addButtonColor}`}>
                    <div className={`${loading}`}></div>
                  </button>
                ) : (
                  <button
                    className={`${addButtonColor}`}
                    onClick={createNewHandler && createNewHandler}
                  >
                    Save
                  </button>
                )}
              </>
            )}

            {page === "edit" && (
              <>
                {loadingState ? (
                  <button className={`${addButtonColor}`}>
                    <div className={`${loading}`}></div>
                  </button>
                ) : (
                  <button
                    className={`${addButtonColor}`}
                    onClick={updateHandler && updateHandler}
                  >
                    Update
                  </button>
                )}
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
