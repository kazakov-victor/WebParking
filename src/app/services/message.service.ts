import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
    console.log('Message from service - ', message);
  }

  clear(): void {
    this.messages = [];
  }
}
