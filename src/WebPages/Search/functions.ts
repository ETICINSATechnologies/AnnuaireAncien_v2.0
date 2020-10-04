import Auth from "../../Components/Auth/Auth";
import { parse } from "json2csv";

export const exportAllAlumni = () => {
    const pageSize = 1000;
    const pageNumber = 0;
    let url: string = `${process.env.REACT_APP_BACKEND_URL}/api/v1/core/member?isAlumni=true&pageSize=${pageSize}&pageNumber=${pageNumber}`;

    fetch(url, {
        headers: {
            Authorization: Auth.getToken()
        }
    }).then(res => {
        if (res.status === 200)
            res.json().then(result => {
                if (result && result.content.length > 0) {
                    const flattenedResults = result.content.map((item: any) => flattenObject(item));
                    try {
                        const csv = 'data:text/csv;charset=utf-8,' + parse(flattenedResults);
                        console.log(csv)
                        const encodedUri = encodeURI(csv);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "alumni_etic.csv");
                        document.body.appendChild(link); // Required for FF
                        link.click(); // This will download the data file named "my_data.csv".
                    } catch (err) {
                        console.error(err);
                    }
                }
            });
        else {
            window.alert("Il y a eu une erreur lors de la requête");
        }
    });
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