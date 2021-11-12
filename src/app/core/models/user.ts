import {ReactiveModel} from '../engine/reactive-model';
import {UserType} from '../interfaces/user-type';

export class User {
  model: ReactiveModel<UserType>;
  constructor(model: UserType) {
    this.model = new ReactiveModel<UserType>(model, 'user');
  }
}
