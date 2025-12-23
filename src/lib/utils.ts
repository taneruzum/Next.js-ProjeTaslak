import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function toCamelCase(str: string): string {
    return str.replace(/^[A-Z]/, (c) => c.toLowerCase());
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keysToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map((v) => keysToCamelCase(v));
    } else if (obj !== null && typeof obj === 'object') {
        const newObj: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[toCamelCase(key)] = keysToCamelCase(obj[key]);
            }
        }
        return newObj;
    }
    return obj;
}

export function toPascalCase(str: string): string {
    return str.replace(/^[a-z]/, (c) => c.toUpperCase());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keysToPascalCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map((v) => keysToPascalCase(v));
    } else if (obj !== null && typeof obj === "object") {
        const newObj: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[toPascalCase(key)] = keysToPascalCase(obj[key]);
            }
        }
        return newObj;
    }
    return obj;
}
