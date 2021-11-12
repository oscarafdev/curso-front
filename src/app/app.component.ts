import {Component, OnDestroy} from '@angular/core';
import {SocketService} from './core/services/socket.service';
import {Subject} from 'rxjs';
import {ReactiveModel} from './core/engine/reactive-model';
import {UserType} from './core/interfaces/user-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'frontend';
  clientsOnline = 0;
  destroy$: Subject<any>;
  message = '';
  id: any;
  messages: { message: string; id: any }[] = [];
  constructor(private sockets: SocketService) {

    this.destroy$ = new Subject<any>();
    this.sockets.io.emit('connectToRoom', (args) => {
      console.log(args);
    });
    this.sockets.io.emit('getMyId', (args) => {
      this.id = args.id;
    });

    this.sockets.io.on('clients:online', (s) => {
      this.clientsOnline = s.online;
    });
    this.sockets.io.on('messages:new', (args) => {
      this.messages.push(args);
    });
    const user = new ReactiveModel<UserType>({name: 'Ale', age: 2, email: 'asd.com'}, 'user');
    user.save();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  sendMessage(): void {
    this.sockets.io.emit('message', this.message);
    this.message = '';
  }
}
