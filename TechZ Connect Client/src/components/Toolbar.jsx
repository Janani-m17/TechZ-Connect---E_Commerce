import React from 'react'

function Toolbar() {

    const handleInputChange = (event) =>{
        setSearchText(e.target.value);
    }

    const handleSearch = () => {
        dispatchEvent(searchProduct(searchText));
    }

  return (
    <div className='toolbar'>
        <div className='search-container'>
            <input value={searchText} onChange={handleInputChange}/>
            <button className='primary-btn inline' onClick={handleSearch}>Search</button>

        </div>

    </div>
  )
}

export default Toolbar