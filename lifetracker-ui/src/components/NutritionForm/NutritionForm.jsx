import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../../services/apiClient";



export default function NutritionForm() {
    

    const navigate = useNavigate()

    const [errors, setError] = useState({});

    const [form, setForm] = useState({
        name: "",
        category: "",
        quantity: "1",
        calories: "1",
        imageUrl: ""
    });
    

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
      };
    
    const handleOnSubmit = async () => {
        setError((e) => ({ ...e, form: null }));
        if (form.name === "") {
            setError((e) => ({ ...e, form: "Invalid name" }));
            return;
          } else {
            setError((e) => ({ ...e, form: null }));
        }
        
        if (form.category === "") {
            setError((e) => ({ ...e, form: "Invalid category" }));
            console.log(errors.body)
            return;
          } else {
            setError((e) => ({ ...e, form: null }));
        }

        if (form.imageUrl === "") {
            setError((e) => ({ ...e, form: "Invalid image URL" }));
            console.log(errors.body)
            return;
          } else {
            setError((e) => ({ ...e, form: null }));
        }
        
    
        const { data, error } = await apiClient.createNutrition({
          name: form.name,
          category: form.category,
          quantity: Number(form.quantity),
          calories: Number(form.calories),
          image_url: form.imageUrl,
        });
        if (error) setError((e) => ({ ...e, form: error }));
        if (data) {
          navigate("/nutrition");
        }
    };

    //console.log(form)
    //-------------------------------------------------------------------------
    return (
        <div className="nutrition-new">
        <h2>Record Nutrition</h2>
        {errors ?
    <p className="error"> { errors.form} </p>
    : ""
  }
        <div className="form-input">
            <div className="InputField">
                <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nutrition name"
                        value={form.name}
                        onChange={handleOnInputChange}
                    />
            </div>
            <div className="InputField">
                <label >Category</label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Nutrition category"
                        value={form.category}
                        onChange={handleOnInputChange} />
            </div>
            <div className="split-input-field">
                <div className="InputField">
                    <label >Quantity</label>
                        <input type="number"
                            name="quantity"
                            min="1"
                            max="100000000"
                            value={form.quantity}
                            onChange={handleOnInputChange} />
                </div>
                <div className="InputField">
                    <label >Calories</label>
                        <input
                            type="number"
                            name="calories"
                            min="0"
                            max="10000000000"
                            step="10"
                            value={form.calories}
                            onChange={handleOnInputChange} />
                </div>
            </div>
            <div className="InputField">
                <label >Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="http://www.food-image.com/1"
                        value={form.imageUrl}
                        onChange={handleOnInputChange} />
            </div>
                <button className="submit-nutrition Button primary large  aqua"
                    onClick={handleOnSubmit}>
                    Save
                </button>
        </div>
    </div>    )
}