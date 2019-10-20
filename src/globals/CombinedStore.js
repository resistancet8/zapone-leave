import GlobalStore from "./stores/GlobalStore";
import DashboardStore from "./stores/DashboardStore";
import LeavesStore from "./stores/LeavesStore";
const globals = new GlobalStore();

export default {
  globals,
  dashboard: new DashboardStore(globals),
  leaves: new LeavesStore(globals)
};
