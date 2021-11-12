import {SocketService} from '../services/socket.service';
import {BehaviorSubject} from 'rxjs';
export class ReactiveModel<T> {
  private fillable: string[];
  private socket: SocketService;
  private readonly channelName: string;
  onModelChange: BehaviorSubject<T>;

  constructor(model: T, modelName) {
    this.socket = new SocketService();
    this.fillable = [];
    this.onModelChange = new BehaviorSubject<T>(model);
    Object.keys(model).forEach(item => {
      this[item] = item;
      if (item === 'id') {
        this.listenChanges(model['id']);
      }
      this.fillable.push(item);
    });
    this.channelName = modelName;
  }

  private listenChanges(id: number): void {
    this.socket.io.on(this.channelName + ':' + id.toString() + ':change', (args) => {
      console.log(args);
    });
  }

  test(): void {
    console.log(this.socket.io);
  }

  save(): void {
    const channel = this.channelName + ':save';
    const data = {};
    this.fillable.forEach(item => {
      data[item] = this[item];
    });
    this.socket.io.emit(channel, {data});
  }
}
