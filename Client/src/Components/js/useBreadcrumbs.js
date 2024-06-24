import { useLocation } from 'react-router-dom';

function useBreadcrumbs() {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    // Default mappings for the breadcrumb names
    const breadcrumbNames = {
        '': 'Dashboard', // Adding an entry for the root path
        'admins': 'Admin List',
        // Add more mappings as needed
    };

    // If there are no path snippets, assume root path which is Dashboard
    if (pathSnippets.length === 0) {
        return [{ url: '/', title: breadcrumbNames[''] }];
    }

    // Generate breadcrumbs for paths that have segments
    return pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const title = breadcrumbNames[snippet] || snippet;
        return { url, title };
    });
}

export default useBreadcrumbs;
