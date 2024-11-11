// Flatten function that respects the accessors
export function flattenAndFilterData(data, columns) {
    // Extract accessors for filtering
    const accessors = columns.map(column => column.accessor);

    return data.map(obj => {
        const result = {};
        flattenObjectWithFilter(obj, result, accessors);
        return result;
    });
}

// Recursive function to flatten based on accessors
function flattenObjectWithFilter(obj, result, accessors, parentKey = '') {
    for (const key in obj) {
        if (key === 'id') continue;
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        // Check if the full path or the parent path matches an accessor
        const matchAccessor = accessors.find(accessor => newKey === accessor || accessor === key);

        if (matchAccessor) {
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                // If it's an object, drill down to the last-level value for the accessor
                for (const nestedKey in obj[key]) {
                    const finalValue = obj[key][nestedKey];
                    result[key] = finalValue;  // Store the last-level value directly
                }
            } else {
                result[matchAccessor] = obj[key]; // Directly store if it's a value
            }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Continue flattening if no direct match but still a nested object
            flattenObjectWithFilter(obj[key], result, accessors, newKey);
        }
    }
}











// // Flatten function that respects the accessors
// export function flattenAndFilterData(data, columns) {
//     // Extract accessors for filtering
//     const accessors = columns.map(column => column.accessor);

//     return data.map(obj => {
//         const result = {};
//         flattenObjectWithFilter(obj, result, accessors);
//         return result;
//     });
// }

// // Recursive function to flatten based on accessors
// function flattenObjectWithFilter(obj, result, accessors, parentKey = '') {
//     for (const key in obj) {
//         const newKey = parentKey ? `${parentKey}.${key}` : key;

//         // Check if key matches any accessor at any level
//         const matchAccessor = accessors.find(accessor => newKey.includes(accessor));

//         if (matchAccessor) {
//             // Flatten only if the key or its path matches an accessor
//             if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
//                 flattenObjectWithFilter(obj[key], result, accessors, newKey);
//             } else {
//                 result[matchAccessor] = obj[key];
//             }
//         }
//     }
// }














// // Function to check if the object has any relevant keys
// function hasRelevantKeys(obj, accessors) {
//     return Object.keys(obj).some(key =>
//         accessors.some(accessor => key.includes(accessor))
//     );
// }

// // Function to flatten the object
// function flattenObject(obj, result) {
//     if (Array.isArray(obj)) {
//         obj.forEach(item => flattenObject(item, result));
//     } else if (typeof obj === 'object' && obj !== null) {
//         for (const key in obj) {
//             if (typeof obj[key] === 'object' && obj[key] !== null) {
//                 flattenObject(obj[key], result);
//             } else {
//                 result[key] = obj[key];
//             }
//         }
//     }
// }

// // Main function to flatten and filter based on accessors
// export function processAndFilterData(arr, columns) {
//     console.log(arr, columns, 'ababab')
//     // Extract accessors from COLUMNS_POR
//     const accessors = columns.map(column => column.accessor);

//     // Filter and flatten each object in the array
//     const filteredFlattenedData = arr
//         .filter(obj => hasRelevantKeys(obj, accessors)) // Filter before flattening
//         .map(obj => {
//             const result = {};
//             flattenObject(obj, result);
//             return Object.keys(result).reduce((acc, key) => {
//                 // Check if the key matches any accessor
//                 if (accessors.some(accessor => key.includes(accessor))) {
//                     acc[key] = result[key];
//                 }
//                 // Include values of parent level keys matching accessors
//                 accessors.forEach(accessor => {
//                     if (obj.hasOwnProperty(accessor)) {
//                         acc[accessor] = obj[accessor];
//                     }
//                 });
//                 return acc;
//             }, {});
//         });

//     return filteredFlattenedData;
// }

