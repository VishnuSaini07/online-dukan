import React from 'react';
import { useSearch } from '../../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate("/search")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form className="d-flex input-group" role="search" onSubmit={handleSubmit}>
                <input className="form-control w-50" type="search" placeholder="Search Product" aria-label="Search" value={values.keyword} onChange={(e) => setValues({
                    ...values, keyword: e.target.value
                })} />
                <button className="input-group-text bg-dark text-white" id="basic-addon2">
                    <BsSearch />
                </button>
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            </form>
        </div>
    );
};

export default SearchInput;