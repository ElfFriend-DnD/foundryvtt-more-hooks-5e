import { MODULE_NAME } from "../const.js";
export function patchRollRecharge() {
  libWrapper.register(MODULE_NAME, "CONFIG.Item.documentClass.prototype.rollRecharge", rollRechargePatch, "WRAPPER");
}

async function rollRechargePatch(wrapped, ...args) {
  const result = await wrapped(...args);

  const item = this;
  const actor = this.actor;

  const success = result.total >= parseInt(this.data.data?.recharge?.value);

  Hooks.callAll('Item5e.rollRecharge', item, result, success, actor);

  return result;
}

/**
 * Occurs after an Item's Recharge attempt is rolled
 * @param {Item5e} item       The Item being recharged
 * @param {Roll} result       The result of the d6 roll
 * @param {boolean} success       Was the recharge a success?
 * @param {Actor5e} [actor]       The Actor that owns the item
 */
function rollRecharge() { }