import member from "../data/member.json";
import members from "../data/members.json";
import board from "../data/board.json";
import positions from "../data/positions.json";

export function fetch(url: string, param?: any): Promise<any> {
    let expectedResponse: object;

    if (/login$/.test(url))
        expectedResponse = {token: 'this is a test token'};
    else if (/member\/(\d*|me)$/.test(url))
        expectedResponse = member;
    else if (/member\/board\/latest$/.test(url))
        expectedResponse = board;
    else if (/member$/.test(url))
        expectedResponse = members;
    else if (/position/.test(url))
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
