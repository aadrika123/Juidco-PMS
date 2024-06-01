import toast from "react-hot-toast";

export default function FileButton({
  btnLabel,
  bg,
  textColor,
  imgRef,
  hoverBg,
  setImageDoc,
  setPreview,
  paddingY,
}) {
  console.log(paddingY, "paddingY----------------");
  //image validation with file type and size limit
  const imageHandler = (e) => {
    const validExtensions = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes

    const file = e.target.files[0];
    if (!file) {
      return toast.error("No File Selected");
    }
    console.log(file.type, "file======");
    // Check the file type
    if (!validExtensions.includes(file.type)) {
      toast.error(
        "Invalid file type. Please select a JPG, JPEG, PNG or PDF file."
      );
      setImageDoc("");
      e.target.value = ""; // Clear the input
      return;
    }

    // Check the file size
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 2MB. Please select a smaller file.");
      setImageDoc("");
      e.target.value = ""; // Clear the input
      return;
    }

    if (file) {
      setImageDoc(file);
      console.log(file, "==========file");
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <input
        type='file'
        accept='.jpg, .jpeg, .pdf .png'
        ref={imgRef}
        className='hidden'
        onChange={(e) => imageHandler(e)}
      />
      <button
        type='button'
        // className={`bg-[#4338ca] text-white mt-1 mr-5 rounded absolute`}
        className={`text-${textColor} end-6 bg-${bg} hover:${hoverBg} rounded text-[12px] px-5 py-[5px]`}
        onClick={() => {
          imgRef?.current.click();
        }}
      >
        {btnLabel}
      </button>
    </>
  );
}
