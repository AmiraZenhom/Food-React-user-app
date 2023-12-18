import { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/Component/Header/Header";
import header from "../../../assets/images/Group 48102127.png";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import NoData from "../../../SharedModule/Component/NoData/NoData";
import Photo from "../../../assets/images/nodata.png";
import Photo1 from "../../../assets/images/download.png";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export default function Favorites() {
  const [favoriteList, setFavoriteList] = useState([]);
  const { baseUrl, requestHeader } = useContext(AuthContext);
  const [modalState, setModalState] = useState("close");
  const handleClose = () => setModalState("close");
  const [itemId, setItemId] = useState(0);

  const deleteFaviourt = () => {
    // alert(itemId)

    axios
      .delete(`${baseUrl}/userRecipe/${itemId}`, {
        headers: requestHeader,
      })
      .then((response) => {
        getAllFavorite();
        handleClose();
        toast.success("Delete Successfully");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const getAllFavorite = () => {
    axios
      .get(`${baseUrl}/userRecipe/`, {
        headers: requestHeader,
      })
      .then((response) => {
        console.log(response?.data?.data);
        setFavoriteList(response?.data?.data);
       
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllFavorite();
  }, []);
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("modal-two");
  };
 

  return (
    <>
     
       <Header>
        <div className="header-content  mx-2 text-white  ">
          <div className="row px-4 py-2 g-0 align-Items-center  ">
            <div className="col-sm-10 mt-4 ps-5  ">
              <div className="mx-3">
                <h3>Recipes Items</h3>
                <p>
                You can now add your items that any user can order it from{" "}
                  <br /> the Application and you can edit
                </p>
              </div>
            </div>
            <div className="col-md-2">
            <img className="img-fluid headerImg" src={header} alt="" />
            </div>
          </div>
        </div>
      </Header>
      <Modal show={modalState == "modal-two"} onHide={handleClose}>
        <Modal.Body className="deleteitem text-danger">
          <div className="text-center noData mt-3 ">
            <img className="w-25" src={Photo1} alt="" />
            <h5 className="mt-3">Delete This Faviourt ?</h5>
            <p>
              are you sure you want to delete this item ? if you are sure just{" "}
              <br /> click on delete it
            </p>

            <div className="text-end mt-5">
              <button
                onClick={deleteFaviourt}
                className="btn btn-outline-danger text-end  "
              >
                Delete this item
                {/* {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Delete this item"} */}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {favoriteList.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 mt-4 gy-4 ms-4  ">
          {favoriteList.map((fav, index) => (
            <div className="col-md-4 rounded-5    " key={index}>
              <div className="card shadow  ">
                {fav?.recipe?.imagePath ? (
                  <div className="rounded-5 photo1    ">
                    <img
                      src={
                        `https://upskilling-egypt.com/` + fav.recipe.imagePath
                      }
                      className="card-img-top w-100 h-100  "
                      alt="foodImg"
                    />
                  </div>
                ) : (
                  <div>
                    <img className="w-50 photo1" src={Photo} />
                  </div>
                )}

                <div className="card-body bg-success text-white">
                  <h5 className="card-title">{fav.recipe.name}</h5>
                  <p className="card-text">
                  {fav.recipe.description}
                  </p>
                 
                  <div className="d-flex  justify-content-center ">
                    <button
                      type="button"
                      onClick={() => showDeleteModal(fav.id)}
                      className="btn btn-light text-danger rounded-5 "
                    >
                      <i className="fa-solid fa-heart-circle-minus"></i> Delete{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
