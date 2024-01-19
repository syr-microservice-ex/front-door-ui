import {useState} from "react";
import axios from "axios";

const FormArea = ({fetchUserInfo, setShowModal,updateId,update,setUpdate}) => {
    const [formValue, setFormValue] = useState({
        id: update ? `${updateId.id}` : Number(0),
        username:  update ? `${updateId.username}` : '',
        surname: update ? `${updateId.surname}` : '',
        age: update ? `${updateId.age}` : Number(),
        email: update ? `${updateId.email}` : '',
    });

    console.log(updateId,update);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValue);

        if (!formValue.username || !formValue.age || !formValue.email || !formValue.surname) {
            alert("Please fill all the fields")
            return;
        } else {
            if(update){
              //  formValue.id = updateId.id;
                await axios.put(`http://localhost:8080/api/v1/user/update`, formValue);
                setUpdate(false);
            }else{
                await axios.post('http://localhost:8080/api/v1/user/create', formValue);
            }
            fetchUserInfo();
            setFormValue({
                id: 0,
                username: '',
                surname: '',
                age: Number(),
                email: '',
            })
        }
        setShowModal(false);
    };
    return (
        <div className="form-area">

            <form onSubmit={handleSubmit}>
                {
                    update && <div>
                        <label htmlFor="id">ID </label>
                        <input id='id' name='id' value={updateId.id} type="number" onChange={handleChange}
                               readOnly="true"/>
                    </div>
                }
                <div>
                    <label htmlFor="username">Username </label>
                    <input id='username' name='username' value={formValue.username} type="text" onChange={handleChange}
                           placeholder="Enter your name"/>
                </div>
                <div>
                    <label htmlFor="surname">Surname</label>
                    <input id='surname' name='surname' value={formValue.surname} type="text" onChange={handleChange}
                           placeholder="Enter your surname"/>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input id='age' name='age' value={formValue.age} type="number" min="0" onChange={handleChange}
                           placeholder="Enter your age"/>
                </div>
                <div>

                    <label htmlFor="email">Email</label>
                    <input id='email' name='email' value={formValue.email} type="email" onChange={handleChange}
                           placeholder="Enter your email"/>
                </div>
                <button className="submit-btn" type='submit'>{update ? "Update" : "Add"}</button>
            </form>
        </div>
    )
}

export default FormArea