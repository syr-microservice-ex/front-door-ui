import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FormArea from "./FormArea";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [showModal, setShowNodal] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [update, setUpdate] = useState(false);
    const [sortAge, setSortAge] = useState(false);
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/getAll');
            console.log(response);
            const data = response.data;
            setUserInfo(data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };
    useEffect(() => {
        fetchUserInfo();
    }, []);
    console.log(userInfo);
    if (!userInfo) {
        return <div>Loading...</div>;
    }

    const handleSortAge = () => {
        setSortAge(!sortAge);
        if (sortAge) {
            userInfo.sort((a, b) => {
                return a.age - b.age;
            });
        } else {
            userInfo.sort((a, b) => {
                return b.age - a.age;
            });
        }
    }

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete('http://localhost:8080/api/v1/user/delete/' + id);
            const data = response.data;
            if (data.message === "User not found.") {
                alert("User Not Found");
            }

            fetchUserInfo();
            return data;
            //setUserInfo(data);


        } catch (error) {
            console.error('Error fetching user info:', error.message);
            //  alert(error.message)
        }

    }

    const handleUpdate = async (id) => {
        const selectedValue = userInfo.find((item) => item.id === id);
        console.log(selectedValue);
        setUpdateId(selectedValue);
        setShowNodal(true);
        setUpdate(true);
    }


    const tableStyle = {
        borderCollapse: 'collapse',
        width: '90vw',
        maxWidth: '600px',
        zIndex: 0,
        //set screen center

        //left: '50%',
        //top: '50%',

        //transform: 'translate(-50%, -50%)'


    };

    const thStyle = {
        backgroundColor: '#4CAF50',
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };

    const tdStyle = {
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };
    return (
        // User UI Design
        // add fragment
        <>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Surname</th>
                    <th style={thStyle}>Age
                        <button className="sortBtn" onClick={handleSortAge}>{
                            sortAge ? <FaArrowDown/> :<FaArrowUp/>
                        }</button>
                    </th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}></th>
                    <th style={thStyle}></th>
                </tr>
                </thead>
                <tbody>
                {userInfo?.map((item) => (
                    <tr key={item.id}>
                        <td style={tdStyle}>{item.id}</td>
                        <td style={tdStyle}>{item.username}</td>
                        <td style={tdStyle}>{item.surname}</td>
                        <td style={tdStyle}>{item.age}</td>
                        <td style={tdStyle}>{item.email}</td>
                        {/* add update button*/}
                        <td style={tdStyle}>
                            <button className="btn" onClick={() => handleUpdate(item.id)}>Update</button>
                        </td>
                        {/* add delete button*/}
                        <td style={tdStyle}>
                            <button className="dltBtn" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="addUser">
                <button className="addBtn" onClick={() => {
                    setShowNodal(true)
                    setUpdate(false)
                }}>Add
                </button>
            </div>
            {showModal && <div className="modal">
                <div className="model-content">
                    <button className="close" onClick={() => setShowNodal(false)}>X</button>
                    <FormArea fetchUserInfo={fetchUserInfo} setShowModal={setShowNodal} updateId={updateId}
                              update={update} setUpdate={setUpdate}/>
                </div>
            </div>}

        </>
        // User UI Design
        // add fragment
    );
};

export default UserInfo;