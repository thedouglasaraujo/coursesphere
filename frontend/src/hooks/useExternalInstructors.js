import { useEffect, useState } from 'react';
import { fetchExternalInstructors } from '~/services/externalInstructorService';

export function useExternalInstructors(open) {
    const [loading, setLoading] = useState(false);
    const [externalInstructors, setExternalInstructors] = useState([]);

    useEffect(() => {
        if (!open) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const instructors = await fetchExternalInstructors();
                setExternalInstructors(instructors);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [open]);

    return { loading, externalInstructors };
}
