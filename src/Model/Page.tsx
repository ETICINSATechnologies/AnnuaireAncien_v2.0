export class Page<T> {
    content: Array<T>;
    meta: Object;

    constructor(content: Array<T>, meta: Object) {
        this.content = content;
        this.meta = meta;
    }

    public toString(): string {
        return this.content[0].toString();
    }
}