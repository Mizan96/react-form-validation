import { useState } from 'react';
import * as Yup from 'yup';

function FormWithYup() {

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthdate: "",
  });
  
  const  [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string().matches(/^\d{11}$/, "Phone number must be 11 digits").required(),
    password: Yup.string().required("Password is required").min(8, "Password must be 8 character long")
      .matches(/[!@#$^&(),.?":{}|<>]/, "Password msut contain at least on symbol")
      .matches(/[0-9]/, "Password must contain at least on number")
      .matches(/[A-Z]/, "Password must contain at least on uppercase letter")
      .matches(/[a-z]/, "Password must contain at leat one lowercase letter"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password must must match")
      .required("Confirmed password is required"),
    age: Yup.number().typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years old")
      .required("Age is required"),
    gender: Yup.string().required('Gender is required'),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Select at least one interet"),
    birthDate: Yup.date().required("Date of birth is required"),
  })
  
  const formHadler = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Submitted successfully", formData);
    } catch (error) {
      const newErrors = {}

      error.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      
      setErrors(newErrors);
    }

  };
  const checkboxChangeHandler = (event) => {
    const { name, checked } = event.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }
    setFormData({
      ...formData,
      interests: updatedInterests,
    })
  };
  const onChangehandler = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <form className="form" onSubmit={formHadler}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter your first name"
            onChange={onChangehandler}
          />
          {errors.firstName && <div style={{'color':'red'}}>{errors.firstName}</div>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Enter your last name"
            onChange={onChangehandler}
          />
          {errors.lastName && <div style={{'color':'red'}}>{errors.lastName}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={onChangehandler}
          />
          {errors.email && <div style={{'color':'red'}}>{errors.email}</div>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            placeholder="Enter your phonenumber"
            onChange={onChangehandler}
          />
          {errors.phoneNumber && <div style={{'color':'red'}}>{errors.phoneNumber}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={onChangehandler}
          />
          {errors.password && <div style={{'color':'red'}}>{errors.password}</div>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm password"
            onChange={onChangehandler}
          />
          {errors.confirmPassword && <div style={{'color':'red'}}>{errors.confirmPassword}</div>}
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            placeholder="Age"
            onChange={onChangehandler}
          />
          {errors.age && <div style={{'color':'red'}}>{errors.age}</div>}
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={onChangehandler}
          >
            
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {errors.gender && <div style={{'color':'red'}}>{errors.gender}</div>}
        <div>
          <label>Interests:</label>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={formData.interests.includes("coding")}
              onChange={checkboxChangeHandler}
            ></input>
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              checked={formData.interests.includes("sports")}
              onChange={checkboxChangeHandler}
            ></input>
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              checked={formData.interests.includes("reading")}
              onChange={checkboxChangeHandler}
            ></input>
            Reading
          </label>
        </div>
        {errors.interests && <div style={{'color':'red'}}>{errors.interests}</div>}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthDate}
            placeholder="Enter your date of birth"
            onChange={onChangehandler}
          />
        </div>
        {errors.birthDate && <div style={{'color':'red'}}>{errors.birthDate}</div>}
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default FormWithYup