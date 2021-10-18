import { MODULE_NAME } from "../const.js";
import { socket } from '../../setup.js';
import { getCommonArguments } from "../utils.js";

export function patchRollRecharge() {
  libWrapper.register(MODULE_NAME, "CONFIG.Item.documentClass.prototype.rollRecharge", rollRechargePatch, "WRAPPER");
}

async function rollRechargePatch(wrapped, ...args) {
  const result = await wrapped(...args);

  const itemUuid = this.uuid;
  const actorUuid = this.actor?.uuid;

  const success = result.total >= parseInt(this.data.data?.recharge?.value);

  socket.executeForEveryone(rollRecharge, itemUuid, result, success, actorUuid, getCommonArguments());

  return result;
}

/**
 * Occurs after an Item's Recharge attempt is rolled
 * @param {Item5e} item       The Item being recharged
 * @param {Roll} result       The result of the d6 roll
 * @param {boolean} success       Was the recharge a success?
 * @param {Actor5e} [actor]       The Actor that owns the item
 * @param {CommonArguments} commonArgs   A set of common arguments for utility
 */
export async function rollRecharge(itemUuid, result, success, actorUuid, commonArgs) {
  const item = await fromUuid(itemUuid);

  const actorOrToken = await fromUuid(actorUuid);
  const actor = actorOrToken instanceof TokenDocument ? actorOrToken.actor : actorOrToken;

  const resultRoll = game.dnd5e.dice.D20Roll.fromData(result);
  Hooks.callAll('Item5e.rollRecharge', item, resultRoll, success, actor, commonArgs);
}