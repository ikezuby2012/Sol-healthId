interface FilterOptions<T> {
    data: T[];
    key: keyof T;
    query: string;
}

export default function filterDataUsingSearchQuery<T>(
    options: FilterOptions<T>
): T[] {
    const { data, key, query } = options;

    return data.filter((item) => {
        const itemKeyValue = item[key];
        if (typeof itemKeyValue === "string") {
            return itemKeyValue.toLowerCase().includes(query.toLowerCase());
        } else {
            return null;
        }
    });
}
