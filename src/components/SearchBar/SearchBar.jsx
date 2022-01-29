import React from 'react';
import PropTypes from "prop-types";
import { FiSearch } from 'react-icons/fi';
import s from './SearchBar.module.css';

class SearchBar extends React.Component { 

    state = {
        query: ''
    }

    handleChange = (e) => {
        this.setState({ query: e.currentTarget.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            return;
        }
        this.props.onSubmit(this.state.query);
        this.resetForm();
    };

    resetForm = () => {
        this.setState({
            query: ''
        });
    };

    render() { 
        return (
            <header className={s.searchbar}>
                <form className={s.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={s.btn} area-label="Search" title="Search" disabled={(!this.state.query.length > 0)}>
                        <FiSearch size={16} />
                    </button>
                    <input
                        className={s.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
            )
        }
}

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};