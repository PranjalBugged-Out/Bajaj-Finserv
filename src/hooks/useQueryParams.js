import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQueryParams = (filters, setFilters, searchTerm, setSearchTerm) => {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        if (Object.keys(params).length > 0) {
            setFilters({
                consultType: params.consultType || '',
                specialties: params.specialties ? params.specialties.split(',') : [],
                sortBy: params.sortBy || ''
            });
            setSearchTerm(params.search || '');
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        if (filters.consultType) params.set('consultType', filters.consultType);
        if (filters.specialties.length) params.set('specialties', filters.specialties.join(','));
        if (filters.sortBy) params.set('sortBy', filters.sortBy);
        if (searchTerm) params.set('search', searchTerm);
        setSearchParams(params);
    }, [filters, searchTerm, setSearchParams]);
};
