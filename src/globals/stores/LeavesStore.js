import { observable } from "mobx";

class LeavesStore {
  @observable leaveData;

  addLeaveData = data => {
    this.leaveData = data;
  };

}

export default LeavesStore;
