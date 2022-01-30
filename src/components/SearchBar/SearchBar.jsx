import { useState } from 'react';
import PropTypes from "prop-types";
import { FiSearch } from 'react-icons/fi';
import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => { 

    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.currentTarget.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim() === '') {
            return;
        }
        onSubmit(query);
        setQuery('');
    };

    return (
        <header className={s.searchbar}>
            <form className={s.form} onSubmit={handleSubmit}>
                <button type="submit" className={s.btn} area-label="Search" title="Search" disabled={(!query.length > 0)}>
                    <FiSearch size={16} />
                </button>
                <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="query"
                    value={query}
                    onChange={handleChange}
                />
            </form>
        </header>
        )
}

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};