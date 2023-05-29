import {defaultStatusMessage} from "./defaultStatusMessage";

export default class ErrorHandler extends Error {
    at? : (string|undefined)[];
    status : number;
    external : boolean;
    constructor({message,status,at} : {message? : string, status : number, at? : (string|undefined)[]}){
        super(message ? message : defaultStatusMessage[status])
        this.status = status
        this.external = true
        this.at = at
    }
}