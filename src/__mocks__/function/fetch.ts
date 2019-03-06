import member from "../data/member.json";
import members from "../data/members.json";
import board from "../data/board.json";
import departments from "../data/departments.json";
import positions from "../data/positions.json";

export function fetch(url: string, param?: any): Promise<any> {
    let expectedResponse: object;

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

    return Promise.resolve({
        status: 200,
        json: () => {
            return Promise.resolve(
                expectedResponse
            )
        }
    })
}
