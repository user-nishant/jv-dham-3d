export const convertToNepaliNumber= (input) =>{
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

    const formatWithCommas = (numberStr) => {
        let [integerPart, decimalPart] = numberStr.split('.');

        // Format integer part with Indian/Nepali commas
        let lastThree = integerPart.slice(-3);
        let other = integerPart.slice(0, -3);
        let formatted = '';

        if (other !== '') {
            let groups = other.match(/.{1,2}(?=(.{2})*$)/g) || [];
            formatted = groups.join(',') + ',' + lastThree;
        } else {
            formatted = lastThree;
        }

        return decimalPart ? `${formatted}.${decimalPart}` : formatted;
    };

    // Format number with commas first
    const formatted = formatWithCommas(input.toString());

    // Convert to Nepali digits
    return formatted.split('').map(char => {
        return /\d/.test(char) ? nepaliDigits[char] : char;
    }).join('');
}


export const numberInputRule = [
    {
        pattern: new RegExp('^([0-9]\\d*(?:\\.\\d{1,7})?)$'),
        message: 'Only accepts digits',
    },
    { required: true, message: 'Please input your donation amount' },
];

export const numberInputProps = {
    onWheel: (e) => e.target.blur(),
    onKeyDown: (e) => symbolsArr.includes(e.key) && e.preventDefault(),
    onKeyUp: e => e.preventDefault()
}
export const numberInputPropsExcludeDecimal = {
    onWheel: (e) => e.target.blur(),
    onKeyDown: (e) => [...symbolsArr, "."].includes(e.key) && e.preventDefault(),
    onKeyUp: e => e.preventDefault()
}
