import member from "../Tools/member";
import members from "../Tools/members";
import board from "../Tools/board";
import departments from "../Tools/departments";
import positions from "../Tools/positions";

export default (url) => {
    let expectedResponse = null;

    if (/auth\/login$/.test(url))
        expectedResponse = {token: 'this is a test token'};
    else if (/core\/member\/(\d*|me)$/.test(url))
        expectedResponse = member;
    else if (/core\/member\/board\/latest$/.test(url))
        expectedResponse = board;
    else if (/core\/member$/.test(url))
        expectedResponse = members;
    else if (/core\/department$/.test(url))
        expectedResponse = departments;
    else if (/core\/position/.test(url))
        expectedResponse = positions;
    else
        return null;

    return Promise.resolve({
        status: 200,
        json: () => {
            return Promise.resolve(
                expectedResponse
            )
        }
    })
};
