import { MODULE_NAME } from "../const.js";

export function patchRollFormula() {
  libWrapper.register(MODULE_NAME, "CONFIG.Item.documentClass.prototype.rollFormula", rollFormulaPatch, "WRAPPER");
}

async function rollFormulaPatch(wrapper, config, ...rest) {
  const result = await wrapper(config, ...rest);

  const item = this;
  const actor = this.actor;

  Hooks.callAll('Item5e.rollFormula', item, result, config, actor);

  return result;
}

/**
 * A hook event that fires after an Item's "Other Formula" is rolled
 * @param {Item5e} item       The Item being rolled
 * @param {Roll} result       The created ChatMessage or ChatMessageData depending on options.createMessage
 * @param {object} [options]
 * @param {boolean} [options.spellLevel]  Level at which a spell is cast.
 */
function rollFormula() {}