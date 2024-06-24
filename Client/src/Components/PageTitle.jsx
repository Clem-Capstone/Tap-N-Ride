import React from 'react';
import './css/pageTitle.css';
import useBreadcrumbs from './js/useBreadcrumbs'; // Adjust the import path as necessary

function PageTitle({page}) {
    const breadcrumbs = useBreadcrumbs();

    return (
        <div className="pagetitle">
            <h1>{page}</h1>
            <nav>
                <ol className="breadcrumb">
                    {breadcrumbs.map(({ title, url }, index) => (
                        <li key={index} className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}`}>
                            {index === breadcrumbs.length - 1 ? (
                                title
                            ) : (
                                <a href={url}>
                                    <i className="bi bi-chevron-right"></i> {title}
                                </a>
                            )}
                        </li>
                    ))}
                </ol>
            </nav> 
        </div>
    );
}

export default PageTitle;
