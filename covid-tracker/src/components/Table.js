import React from 'react'
import './Table.css'

const Table = ({ countries }) => {

    countries.sort((a, b) => parseInt(b.cases) - parseInt(a.cases))
    return (
        <div className="table">
            {countries.map(({ country, cases }) => (
                <tr>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table;