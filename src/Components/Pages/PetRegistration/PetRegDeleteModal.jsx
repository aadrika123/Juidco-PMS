import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { contextVar } from "@/Components/context/contextVar";
// import AxiosInterceptors from "../../Components/GlobalData/AxiosInterceptors";
// import PetRegAPIList from "../../Components/ApiList/PetRegAPIList";
// import { contextVar } from "../../Components/Context/Context";
// import AxiosInterceptors from "../../Components/ApiList/AxiosInterceptors";
import { useNavigate } from "react-router-dom";
// import ApiHeader from "../../Components/ApiList/ApiHeader";
import PetRegAPIList from "@/Components/api/PetRegAPIList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";



const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: "transparent",
        border: "none",
    },
};

function PetRegDeleteModal(props) {

    const { notify } = useContext(contextVar)
    const [deleting, setDeleting] = useState(false)
    // Modal.setAppElement('#yourAppElement');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const navigate = useNavigate()

    // const header = ApiHeader()

    const { api_PetRegDeleteApplication,header } = PetRegAPIList();

    const data = props.dataTobeDeleted;

    useEffect(() => {
        setIsOpen(true);
    }, []);

    function afterOpenModal() { }

    function closeModal() {
        setIsOpen(false);
        props.setOpenDeleteModal(false)
        navigate('/search-pet-registration')
    }

    function closeModalWithoutRefetch() {
        setIsOpen(false);
        props.setOpenDeleteModal(null)
    }

    const handleDeleteBtn = () => {
        setDeleting(true)

        AxiosInterceptors.post(api_PetRegDeleteApplication, { "applicationId": data.id }, header)
            .then((res) => {
                setDeleting(false)
                if (res.data.status) {
                    notify('Application Deleted', 'success')
                    console.log("Application Deleted Successfully", res)
                    closeModal()
                } else {
                    notify('Application Not Deleted', 'error')
                    console.log("Error while deleting application.")
                    closeModal()
                }
            })
            .catch((err) => {
                setDeleting(false)
                closeModal()
                notify('Error While deleting application', 'error')
                console.log("ERROR : Application Deletion", err)
            })
    }



    return (
        <div className="">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="bg-sky-200 shadow-2xl border border-sky-200 p-5 m-5 rounded-md">
                    <div className="flow-root">
                        <p className="float-left text-center text-xl font-semibold mx-5 text-gray-700">
                            Do you want to Delete Application ?
                        </p>
                        <p
                            onClick={closeModal}
                            className="absolute right-9 top-12 cursor-pointer rounded-full bg-sky-200 hover:bg-gray-200 mx-3"
                        >
                            <GrFormClose size={25} />{" "}
                        </p>
                    </div>
                    <p className="border-b py-1 mb-3"></p>
                    <div className="text-sm my-2">
                        <p>
                            Your Application No : <span className="font-semibold">{data?.application_no}</span> will be deleted permanently. <br />
                        </p>

                    </div>

                    {deleting ?
                        <p className="text-center">Please Wait Deleting...</p>
                        :
                        <div className="flex justify-center">
                            <button
                                onClick={handleDeleteBtn}
                                type="button"
                                className="border border-red-400 bg-red-600 hover:bg-red-500 text-white shadow-lg rounded-sm py-1 text-sm font-semibold px-3 m-3"
                            >
                                Yes! Delete
                            </button>
                            <button
                                onClick={closeModalWithoutRefetch}
                                type="button"
                                className="border border-sky-400 bg-sky-600 hover:bg-sky-500 text-white shadow-lg rounded-sm py-1 text-sm font-semibold px-3 m-3"
                            >
                                Cancel
                            </button>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, appElement);

export default PetRegDeleteModal;