import { Injectable }     from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ng2-webstorage';

@Injectable()
export class LocalDataService {

  @LocalStorage()
  public twitchUsername:String;

  constructor (public storage:LocalStorageService)
  {
  }

  getTwitchUsername()
  {
    return this.twitchUsername;
  }

  setTwitchUsername(twitchUsername)
  {
    this.twitchUsername = twitchUsername;
    this.storage.store('twitchUsername', this.twitchUsername);
  }

}
