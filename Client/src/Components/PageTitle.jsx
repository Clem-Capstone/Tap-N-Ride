import React from 'react'
import './css/pageTitle.css'

function PageTitle({page}) {
    return (
        <div className="pagetitle">
            <h1>{page}</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/dashboard">
                            <i className="bi bi-house-door"></i>
                        </a>
                    </li>
                    <li className="breadcrumb-item active">{page}</li>
                    <h1>HELO HELO HELO HELO</h1>
                </ol>
            </nav>
        </div>
    );
}

export default PageTitle;