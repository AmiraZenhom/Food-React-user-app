import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../../Context/AuthContext";
import Header from "../../../SharedModule/Component/Header/Header";
import NoData from "../../../SharedModule/Component/NoData/NoData";
import header from "../../../assets/images/Group 48102127.png";
import Photo from "../../../assets/images/nodata.png";
import { toast } from "react-toastify";

export default function Recipes() {
  const { requestHeader, baseUrl } = useContext(AuthContext);

  const getNameValue = (input) => {
    setSearch(input.target.value);
    getRecipesList(1, input.target.value);
  };
  const [pagesArray, setPagesArray] = useState([]);

  // const [show, setShow] = useState(false);
  const handleClose = () => setModalState("close");
  // const handleShow = () => setShow(true);

  const [recipeList, setRecipeList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [tagList, setTagList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [search, setSearch] = useState("");
  const [itemId, setItemId] = useState(0);
  const [recipeDetails, setRecipeDetails] = useState([]);

  const showViewModal = (id) => {
    setItemId(id);
    setModalState("view-modal");
    getRecipeDetails(id);
  };

  const addToFavorite = () => {
    axios
      .post(
        `${baseUrl}/userRecipe/`,
        { recipeId: itemId },
        { headers: requestHeader }
      )
      .then((response) => {
        console.log(response);
        toast.success("Add Successfully");
      });
    handleClose().catch((error) => {
      console.log(error);
    });
  };

  const getAllTag = () => {
    axios
      .get(`${baseUrl}/tag/`, {
        headers: requestHeader,
      })
      .then((response) => {
        console.log({ tagList: response.data });

        setTagList(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getRecipesList = (pageNu, name) => {
    axios
      .get(`${baseUrl}/Recipe/`, {
        headers: requestHeader,
        params: {
          pageSize: 5,
          pageNumber: pageNu,
          name: name,
        },
      })
      .then((response) => {
        setPagesArray(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        console.log(response);
        setRecipeList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getRecipeDetails = (id) => {
    axios
      .get(`${baseUrl}/recipe/${id}`, {
        headers: requestHeader,
      })
      .then((response) => {
        console.log(response);
        setRecipeDetails(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategoriesList = () => {
    axios
      .get(`${baseUrl}/Category/?pageSize=10&pageNumber=1`, {
        headers: requestHeader,
      })
      .then((response) => {
        setCategoriesList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getRecipesList();
    getCategoriesList();
    getAllTag();
  }, []);

  return (
    <>
      <Modal show={modalState == "view-modal"} onHide={handleClose}>
        <Modal.Body className="mod text-center text-danger ">
          <h4>Recipe Details</h4>
          <div className=" text-center  ">
            {recipeDetails.imagePath ? (
              <img
                className="w-75 my-3 rounded-5"
                src={`https://upskilling-egypt.com/` + recipeDetails.imagePath}
                alt=""
              />
            ) : (
              <div>
                <img className="w-50" src={Photo} alt="image error" />
              </div>
            )}
          </div>
          <h4>Description: {recipeDetails?.description}</h4>
          {/* <h4>Category:{recipeDetails?.category[0]?.name}</h4> */}
          <h4>Tag: {recipeDetails?.tag?.name}</h4>
          <button
            onClick={addToFavorite}
            type="button"
            className="btn btn-danger my-4 rounded-5 "
          >
            {" "}
            <i className="fa-solid fa-star"></i> Add Favorite{" "}
          </button>
        </Modal.Body>
      </Modal>

    
       <Header>
        <div className="header-content  mx-2 text-white  ">
          <div className="row px-4 py-2 g-0 align-Items-center  ">
            <div className="col-sm-10 mt-4 ps-5  ">
              <div className="mx-3">
                <h3>Recipes Items</h3>
                <p>
                This is a welcoming screen for the entry of the application , <br />
                  you can now see the options
                </p>
              </div>
            </div>
            <div className="col-md-2">
            <img className="img-fluid headerImg" src={header} alt="" />
            </div>
          </div>
        </div>
      </Header>

      <div className=" mx-3 py-4  px-3 ">
        <div className=" row align-items-center  ">
          <div className="col-md-9 text-success">
            <h4>Recipe Table Details</h4>
            <p>You can check all details</p>
          </div>

          <input
            onChange={getNameValue}
            className="form-control my-4 border-success text-success "
            type="text"
            placeholder="search by recipe name"
          />
          {recipeList.length > 0 ? (
            <table className="table mx-3    text-center container-fluid table table-striped   ">
              <thead className="table-success">
                <tr className="text-success">
                  <th scope="col">#</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Tag</th>
                  <th scope="col">category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {recipeList.map((recipe, index) => (
                  <tr key={recipe.id}>
                    <th scope="row">{index + 1} </th>
                    <td> {recipe.name} </td>
                    <td>
                      <div className="image   m-auto ">
                        {recipe.imagePath ? (
                          <img
                            className="w-100 img-fluid"
                            src={
                              `https://upskilling-egypt.com/` + recipe.imagePath
                            }
                            alt=""
                          />
                        ) : (
                          <div>
                            <img
                              className="w-50"
                              src={Photo}
                              alt="image error"
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.tag.name}</td>
                    <td>{recipe?.category[0]?.name}</td>
                    <td>
                      <i
                        onClick={() => showViewModal(recipe.id)}
                        className="fa fa-eye fs-4 ms-2 text-success"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
          <div className="d-flex justify-content-center my-5">
            <nav aria-label="...">
              <ul className="pagination pagination-sm">
                {pagesArray.map((pageNu) => (
                  <li
                    key={pageNu}
                    onClick={() => getRecipesList(pageNu, search)}
                    className="page-item"
                  >
                    <a className="page-link" href="#">
                      {pageNu}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
