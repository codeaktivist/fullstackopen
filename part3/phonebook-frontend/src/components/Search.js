const Search = ({ search, onChangeSearchHandler }) => {
    return (
        <div>
            Search for: <input
            value={search}
            onChange={onChangeSearchHandler}/>
        </div>
    )
}

export default Search