// This is about messages in the sense of sending little notes between
// different components in the frontend
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InterComponentMessageService {
    private subject = new Subject<any>();

    sendMessage(target: string, message: string) {
        this.subject.next({ target: target, text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    getMessageFor(target: string) {
        return this.getMessage().filter((mess: any) => mess.target == target)
    }
}