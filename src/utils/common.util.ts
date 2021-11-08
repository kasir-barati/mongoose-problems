export async function flatObjectAndSeparateThemByDot(
    object: any,
): Promise<any> {
    const res: any = {};
    (function recurse(obj: any, current?: string) {
        for (const key in obj) {
            const value = obj[key];
            // joined keys with dot
            const newKey = current ? current + '.' + key : key;
            if (value && typeof value === 'object') {
                // it's a nested object, so do it again
                recurse(value, newKey);
            } else {
                // it's not an object, so set the property
                res[newKey] = value;
            }
        }
    })(object);

    return res;
}
