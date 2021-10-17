import { MODULE_NAME } from "../const.js";
import { socket } from '../../setup.js';
import { prepareOptions } from "../utils.js";

export function patchRollFormula() {
  libWrapper.register(MODULE_NAME, "CONFIG.Item.documentClass.prototype.rollFormula", rollFormulaPatch, "WRAPPER");
}

async function rollFormulaPatch(wrapper, config, ...rest) {
  const result = await wrapper(config, ...rest);

  const itemUuid = this.uuid;
  const actorUuid = this.actor?.uuid;
  const cleanedConfig = prepareOptions(config);

  socket.executeForEveryone(rollFormula, itemUuid, result, cleanedConfig, actorUuid);

  return result;
}

/**
 * A hook event that fires after an Item's "Other Formula" is rolled
 * @param {Item5e} item       The Item being rolled
 * @param {Roll} result       The created ChatMessage or ChatMessageData depending on options.createMessage
 * @param {object} [options]
 * @param {boolean} [options.spellLevel]  Level at which a spell is cast.
 */
export async function rollFormula(itemUuid, result, cleanedConfig, actorUuid) {
  const item = await fromUuid(itemUuid);

  const actorOrToken = await fromUuid(actorUuid);
  const actor = actorOrToken instanceof TokenDocument ? actorOrToken.actor : actorOrToken;

  const resultRoll = game.dnd5e.dice.D20Roll.fromData(result);

  Hooks.callAll('Item5e.rollFormula', item, resultRoll, cleanedConfig, actor);
}