import { Component, OnInit } from '@angular/core';
import {MessageService} from "../Service/message.service";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: String[];

  constructor(private messageService: MessageService) { }

  add(message:string): void {
    this.messageService.add(message);
  }

  clear(): void {
    this.messageService.clear();
    this.messages = this.messageService.getMessages();
  }

  getMessages(): string[] {
    return this.messageService.getMessages();
  }

  ngOnInit() {
    this.messages = this.getMessages();
  }
}
