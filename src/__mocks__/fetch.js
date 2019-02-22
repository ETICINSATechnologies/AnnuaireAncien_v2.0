import member from "../Tools/member";
import members from "../Tools/members";
import board from "../Tools/board";

export default (url) => {
    let expectedResponse = null;

    if (/auth\/login$/.test(url))
        expectedResponse = {token: 'this is a test token'};
    else if (/core\/member\/(\d*|me)$/.test(url))
        expectedResponse = member;
    else if (/core\/member\/board\/latest$/.test(url))
        expectedResponse = board;
    else if (/core\/member.*/.test(url))
        expectedResponse = members;
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
