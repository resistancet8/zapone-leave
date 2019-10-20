import { observable } from "mobx";

class LeavesStore {
  @observable roles;
  @observable departments;
  @observable branches;
  @observable designations;
  @observable users = [];

  addRoles = list => {
    this.roles = list;
  };

  addDesignations = list => {
    this.designations = list;
  };

  addDepartments = list => {
    this.departments = list;
  };

  addBranches = list => {
    this.branches = list;
  };

  addUsers = list => {
    this.users = list;
  };

  updateUser = (userInfo, index) => {
    this.users[index] = userInfo;
  };
}

export default LeavesStore;
