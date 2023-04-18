import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Enter new category</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default CategoryForm;