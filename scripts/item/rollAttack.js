import { MODULE_NAME } from "../const.js";
import { socket } from '../../setup.js';
import { prepareOptions } from "../utils.js";

export function patchRollAttack() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Item.documentClass.prototype.rollAttack', rollAttackPatch, "WRAPPER");
}

async function rollAttackPatch(wrapper, options, ...rest) {
  const result = await wrapper(options, ...rest);

  const itemUuid = this.uuid;
  const actorUuid = this.actor?.uuid;
  const cleanedOptions = prepareOptions(options);

  socket.executeForEveryone(rollAttack, itemUuid, result, cleanedOptions, actorUuid);

  return result;
}

/**
 * A hook event that fires after an Item rolls an Attack Roll
 * @param {Item5e} item       The Item that rolls the Attack Roll
 * @param {D20Roll} result           The Result of the Attack Roll
 * @param {object} [options]      Roll options which were provided to the d20Roll function
 * @param {Actor5e} [actor]       The Actor that owns the item
 */
export async function rollAttack(itemUuid, result, cleanedOptions, actorUuid) {
  const item = await fromUuid(itemUuid);

  const actorOrToken = await fromUuid(actorUuid);
  const actor = actorOrToken instanceof TokenDocument ? actorOrToken.actor : actorOrToken;

  const resultRoll = game.dnd5e.dice.D20Roll.fromData(result);

  Hooks.callAll('Item5e.rollAttack', item, resultRoll, cleanedOptions, actor);
}
