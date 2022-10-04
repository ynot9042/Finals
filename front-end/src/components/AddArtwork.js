import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import '../styles/button.scss';
import Button from "./Button";
import Form from 'react-bootstrap/Form';
import { DataContext } from "../context/dataContext";

export default function AddArtwork({setMode, user}) {
  const dataState = useContext(DataContext);
  const [categories, setCategories] = useState([]);

  const VIEW = 'VIEW';

  useEffect(() => {
    if (dataState.categories) {
      setCategories(dataState.categories);
    }
  }, [dataState]);

  const submitArtwork = event => {
    event.preventDefault();

    // This part retrieves the file from the change-avatar form
    const form = event.currentTarget;
    const categoryID = form.querySelector("#category").value;
    const name = form.querySelector("#title").value;
    const priceCents = form.querySelector("#price").value * 100;
    const description = form.querySelector("#description").value;
    const fileUpload = form.querySelector("#add-artwork").files[0];
    
    // This part creates a FormData object, it includes 2 things: 1. text (the user.id), 2. the file
    const formData = new FormData();
    formData.append("userID", user.id);
    formData.append("categoryID", categoryID);
    formData.append("name", name);
    formData.append("priceCents", priceCents);
    formData.append("description", description);
    formData.append("artwork", fileUpload);

    // Makes put request with second arg., the form data with the above info
    axios.put("/api/profile/add", formData)
      .then((all) => {
        // Then once complete
        setMode(VIEW);
      });
  };


  return (
    <div className="add-artwork">
      <h1>Add New Artwork</h1>
      <div className="add-artwork-form">
        <Form onSubmit={submitArtwork}>
          <Form.Group className="mb-3" controlId="add-artwork">
            <Form.Label>Upload Image:</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select id="category">
              {categories.map((category) => 
                <option key={category.id} value={category.id}>{category.name}</option>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Artwork Title:</Form.Label>
            <Form.Control name="title" type="name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control name="price" type="number" min="0.00" max="10000.00" step="0.01" defaultValue="10.00" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Artwork Description</Form.Label>
            <Form.Control as="textarea" />
          </Form.Group>

          <Button message="Add Artwork to Gallery" variant="primary" type="submit" />
        </Form>
      </div>
    </div>
  )
}