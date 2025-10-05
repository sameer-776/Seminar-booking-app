export const formatDateDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    const normalized = dateString.includes('T')
        ? dateString.split('T')[0]
        : dateString;
    const [year, month, day] = normalized.split('-');
    if (!year || !month || !day) return dateString;
    return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
};

export const formatDateYYYYMMDD = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    if (!year || !month || !day) return dateString; 
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};
