import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io: Socket;

  constructor() {
    if (!this.io) {
      this.io = io(environment.ws_url, {
        withCredentials: true,
        autoConnect: true
      });
    }
  }



}
