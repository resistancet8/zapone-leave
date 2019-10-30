import { observable } from "mobx";

class LeavesStore {
  @observable leaveTypes;
  @observable leaveApplications;
  @observable leaveBalances;

  addLeaveTypes = data => {
    this.leaveTypes = data;
  };

  addLeaveApplications = data => {
    this.leaveApplications = data;
  };

  addLeaveBalances = data => {
    this.leaveBalances = data;
  };

}

export default LeavesStore;
