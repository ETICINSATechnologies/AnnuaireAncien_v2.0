import Auth from "../../Components/Auth/Auth";
import { parse } from "json2csv";

// To-do : Needs more complex page handling. Right now, will only download first page
export const exportAllAlumni = async () => {
    let pageSize = 25;
    let totalPages = 1;

    let alumniList: any[] = [];

    for (let pageNumber = 0; pageNumber < totalPages; ++pageNumber) {
        try {
            const results = await fetchResults(pageSize, pageNumber);
            if (results && results.meta && results.content) {
                totalPages = results.meta.totalPages;
                alumniList = [...alumniList, ...results.content];
            }
        } catch (error) {
            alert(error);
            return;
        }
    }

    const flattenedAlumniList = alumniList.map((item: any) => flattenObject(item));
    try {
        const csv = 'data:text/csv;charset=utf-8,' + parse(flattenedAlumniList);
        const encodedUri = encodeURI(csv);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "alumni_etic.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
    } catch (error) {
        alert(error);
        return;
    }
}

const fetchResults = async (pageSize: number, pageNumber: Number) => {
    const url: string = `${process.env.REACT_APP_BACKEND_URL}/api/v1/core/member?isAlumni=true&pageSize=${pageSize}&pageNumber=${pageNumber}`;
    const response = await fetch(url, {
        headers: {
            Authorization: Auth.getToken()
        }
    });
    if (response.ok) {
        const results = await response.json();
        return results;
    } else {
        throw new Error("Error fetch members : " + response.statusText);
    }

}

const flattenObject = (obj: any, parent?: any, res = {} as any): Object => {
    for (let key in obj) {
        let propName = parent ? parent + '_' + key : key;
        if (typeof obj[key] == 'object') {
            flattenObject(obj[key], propName, res);
        } else if (Array.isArray(obj[key])) {
            res[propName] = flattenArray(obj[key]);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
};

const flattenArray = (arr: Array<any>): Array<any> => {
    let flattened = arr.flat(Infinity);
    return flattened.map((element) => {
        if (typeof element == 'object') {
            return flattenObject(element);
        } else {
            return element;
        }
    });
};