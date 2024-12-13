export const calculateAge = (dob: string): number | 'unknown' => {
    if (!dob || isNaN(Date.parse(dob))) {
        return 'unknown'; // Return "unknown" if dob is empty or invalid
    }
    const today = new Date();
    const birthDate = new Date(dob);
    const ageInYears = (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.ceil(ageInYears * 10) / 10;
};
