import React, { useState } from 'react';
import {
    SearchBar,
    SearchForm,
    SearchFormBtn,
    SearchFormBtnLabel,
    SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = evt => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const queryResult = form.elements.query.value;
        console.log('queryResult is: ', queryResult);
        if (!queryResult) {
            return alert('please enter a query');
        }
        onSubmit(queryResult);
    };
    const handleChange = evt => {
        setQuery(evt.target.value);
    };

    return (
        <SearchBar>
            <SearchForm
                onSubmit={handleSubmit}
                className="search-form header"
                id="search-form"
            >
                {/* <div className="input-group"> */}
                <SearchFormInput
                    onChange={handleChange}
                    value={query}
                    id="searchQuery"
                    className="search-field"
                    type="text"
                    name="query"
                    // autoComplete="off"
                    placeholder="Search images and photos..."
                />
                <SearchFormBtn type="submit">
                    <SearchFormBtnLabel>
                        "Search"
                    </SearchFormBtnLabel>
                </SearchFormBtn>
                {/* </div> */}
            </SearchForm>
        </SearchBar>
    );
};

export default Searchbar;
